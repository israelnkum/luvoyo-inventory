<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Requests\StoreDispatchOrderRequest;
use App\Http\Requests\UpdateDispatchOrderRequest;
use App\Http\Resources\DispatchOrderResource;
use App\Models\DispatchOrder;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DispatchOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return DispatchOrderResource::collection(DispatchOrder::paginate(10));
    }

    public function show(DispatchOrder $dispatchOrder): DispatchOrderResource
    {
        return new DispatchOrderResource($dispatchOrder);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param StoreDispatchOrderRequest $request
     * @return JsonResponse|DispatchOrderResource
     */
    public function store(StoreDispatchOrderRequest $request): JsonResponse|DispatchOrderResource
    {

        DB::beginTransaction();
        try {

            $dateTime =  Carbon::parse($request->dispatch_date)->format('Y-m-d'). ' '.Carbon::now()->format('h:m');
            $order = new DispatchOrder();
            $order->order_no = $order->generateReferenceNumber('order_no');
            $order->truck_id = $request->truck_id;
            $order->total = 0;
            $order->qty = 0;
            $order->date_time = $dateTime;
            $order->employee_id = $request->employee_id;
            $order->user_id = Auth::user()->id;
            $order->save();

            $total = 0;
            $qty = 0;
            foreach ($request['products'] as $product){
                $findProduct = Product::find($product['id']);
                $findProduct->update([
                    'quantity' => $findProduct->quantity - $product['qty']
                ]);

                $subTotal = $product['qty'] * $product['selling_price'];
                $total += $subTotal;
                $qty += $product['qty'];
                $order->orderItems()->create([
                   'product_id' => $findProduct->id,
                   'selling_price' => $product['selling_price'],
                   'qty' => $product['qty'],
                   'sub_total' => $subTotal,
                ]);
            }
            $order->update([
                'total' => $total,
                'qty' => $qty,
            ]);
            DB::commit();
            return new DispatchOrderResource($order);
        }catch (\Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateDispatchOrderRequest $request
     * @param DispatchOrder $supplier
     * @return DispatchOrderResource|JsonResponse|Response
     */
    public function update(UpdateDispatchOrderRequest $request, DispatchOrder $supplier): Response|DispatchOrderResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $supplier->update($request->all());

            if ($request->has('file') && $request->file != "null"){
                HelperFunctions::saveImage($supplier, $request->file('file'), 'suppliers');
            }

            DB::commit();
            return new DispatchOrderResource($supplier);
        }catch (\Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param DispatchOrder $dispatchOrder
     * @return JsonResponse|Response
     */
    public function destroy(DispatchOrder $dispatchOrder): Response|JsonResponse
    {
        DB::beginTransaction();
        try {
            $dispatchOrder->delete();
            DB::commit();
            return \response()->json('Dispatch Order Deleted');
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }

    public function searchDispatchOrders($query): AnonymousResourceCollection
    {
        $products = DispatchOrder::query()
            ->where('order_no', 'like', '%' . $query . '%')->get();
        return DispatchOrderResource::collection($products);
    }
}
