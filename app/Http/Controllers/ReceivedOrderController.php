<?php

namespace App\Http\Controllers;

use App\Exports\ReceivedOrderExport;
use App\Http\Requests\StoreReceivedOrderRequest;
use App\Http\Requests\UpdateReceivedOrderRequest;
use App\Http\Resources\ReceivedOrderResource;
use App\Models\Product;
use App\Models\ReceivedOrder;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ReceivedOrderController extends Controller
{
    use UsePrint;

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection|Response|\Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(Request $request)
    {

        $orders = ReceivedOrder::query();
        if ($request->has('export') && $request->export === 'true') {
            return Excel::download(new ReceivedOrderExport(ReceivedOrderResource::collection($orders->get())),
                'Suppliers.xlsx');
        }

        if ($request->has('print') && $request->print === 'true') {
            return $this->pdf('print.received-orders', ReceivedOrderResource::collection($orders->get()), 'Suppliers');
        }
        return ReceivedOrderResource::collection($orders->paginate(10));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param StoreReceivedOrderRequest $request
     * @return JsonResponse|ReceivedOrderResource
     */
    public function store(StoreReceivedOrderRequest $request): JsonResponse|ReceivedOrderResource
    {
        DB::beginTransaction();
        try {


            $order = ReceivedOrder::create([
                'invoice_no' => $request->invoice_no,
                'date' => Carbon::parse($request->date)->format('Y-m-d h:i'),
                'total' => 0,
                'user_id' => Auth::user()->id,
                'supplier_id' => $request->supplier_id
            ]);

            $total = 0;
            foreach ($request['products'] as $product) {
                $findProduct = Product::find($product['id']);

                // deduct or add up to qty
                $findProduct->update([
                    'quantity' => $product['qty_damaged'] > 0 ? ($findProduct->quantity - $product['qty']) : ($findProduct->quantity + $product['qty'])
                ]);

                $subTotal = $product['qty'] * $findProduct->selling_price;
                $total = $total + $subTotal;

                $order->orderItems()->create([
                    'product_id' => $findProduct->id,
                    'price' => $findProduct->selling_price, // todo confirm which price (cost or selling)
                    'qty' => $product['qty'],
                    'damaged' => $product['qty_damaged'] > 0,
                    'qty_damaged' => $product['qty_damaged'],
                    'damaged_sub_total' => $findProduct->selling_price * $product['qty_damaged'],
                    'sub_total' => $subTotal,
                ]);
            }
            $order->update(['total' => $total]);
            DB::commit();
            return new ReceivedOrderResource($order);
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
