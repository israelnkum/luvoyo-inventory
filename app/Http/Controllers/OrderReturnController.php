<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDispatchOrderReturnRequest;
use App\Http\Requests\UpdateDispatchOrderReturnRequest;
use App\Http\Resources\OrderReturnResource;
use App\Models\DispatchOrder;
use App\Models\OrderReturn;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderReturnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return OrderReturnResource::collection(OrderReturn::paginate(10));
    }


    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function show($orderNumber)
    {
        $dispatchOrder = DispatchOrder::where('order_no', $orderNumber)->first();

        if ($dispatchOrder) {
            $returns = OrderReturn::where('dispatch_order_id', $dispatchOrder->id)->paginate(10);
            return OrderReturnResource::collection($returns);
        }

        return response()->json([
            'message' => 'No Data Found'
        ], 400);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param StoreDispatchOrderReturnRequest $request
     * @return JsonResponse|OrderReturnResource
     */
    public function store(StoreDispatchOrderReturnRequest $request): JsonResponse|OrderReturnResource
    {
        DB::beginTransaction();
        try {
            $products = $request->products;

            /** @var DispatchOrder $dispatchOrder */
            $dispatchOrder = DispatchOrder::find($products[0]['dispatch_order_id']);

            /** @var OrderReturn $orderReturn */
            $orderReturn = OrderReturn::create([
                'dispatch_order_id' => $dispatchOrder->id,
                'user_id' => Auth::user()->id,
            ]);

            /** @var $totalAmount */
           $totalAmount = 0;

            foreach ($products as $product){
                if ($product['qty_returned'] > 0) {
                    $subTotal = $product['qty_returned'] * $product['selling_price'];
                    $orderReturn->orderReturnItems()->create([
                        'product_id' => $product['product_id'],
                        'qty'=> $product['qty_returned'],
                        'sub_total' => $subTotal,
                        'damaged' => $product['qty_damaged'] > 0,
                        'damaged_qty' => $product['qty_damaged'],
                        'damaged_sub_total' => $product['qty_damaged'] * $product['selling_price'],
                    ]);

                    $totalAmount += $subTotal;
                }
            }

            // Reduce Dispatch Order total
            $dispatchOrder->update([
                'total' => $dispatchOrder->total - $totalAmount
            ]);

            DB::commit();
            return new OrderReturnResource($orderReturn);
        }catch (Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
