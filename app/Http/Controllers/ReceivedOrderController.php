<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceivedOrderRequest;
use App\Http\Requests\UpdateReceivedOrderRequest;
use App\Http\Resources\ReceivedOrderResource;
use App\Models\Product;
use App\Models\ReceivedOrder;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReceivedOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return ReceivedOrderResource::collection(ReceivedOrder::paginate(10));
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
            foreach ($request['products'] as $product){
                $findProduct = Product::find($product['id']);

                // deduct or add up to qty
                $findProduct->update([
                    'quantity' => $product['qty_damaged'] > 0 ? ($findProduct->quantity - $product['qty']) : ($findProduct->quantity + $product['qty'])
                ]);

                $subTotal = $product['qty'] * $findProduct->selling_price;
                $total += $subTotal;

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
        }catch (Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }



    /**
     * Update the specified resource in storage.
     *
     * @param UpdateReceivedOrderRequest $request
     * @param ReceivedOrder $receivedOrder
     * @return Response
     */
    public function update(UpdateReceivedOrderRequest $request, ReceivedOrder $receivedOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ReceivedOrder $receivedOrder
     * @return Response
     */
    public function destroy(ReceivedOrder $receivedOrder)
    {
        //
    }
}
