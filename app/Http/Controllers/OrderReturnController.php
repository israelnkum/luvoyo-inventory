<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDispatchOrderReturnRequest;
use App\Http\Requests\UpdateDispatchOrderReturnRequest;
use App\Http\Resources\OrderReturnResource;
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
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
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
            $orderReturn = OrderReturn::create([
                'dispatch_order_id' => $products[0]['dispatch_order_id'],
                'user_id' => Auth::user()->id,
            ]);
            foreach ($products as $product){
                $orderReturn->orderReturnItems()->create([
                    'product_id' => $product['product_id'],
                    'qty'=> $product['qty'],
                    'sub_total' => $product['qty'] * $product['selling_price'],
                    'damaged' => $product['qty_damaged'] > 0,
                    'damaged_qty' => $product['qty_damaged'],
                    'damaged_sub_total' => $product['qty_damaged'] * $product['selling_price'],
                ]);
            }
            DB::commit();
            return new OrderReturnResource($orderReturn);
        }catch (Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param OrderReturn $dispatchOrderReturn
     * @return Response
     */
    public function show(OrderReturn $dispatchOrderReturn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param OrderReturn $dispatchOrderReturn
     * @return Response
     */
    public function edit(OrderReturn $dispatchOrderReturn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateDispatchOrderReturnRequest $request
     * @param OrderReturn $dispatchOrderReturn
     * @return Response
     */
    public function update(UpdateDispatchOrderReturnRequest $request, OrderReturn $dispatchOrderReturn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param OrderReturn $dispatchOrderReturn
     * @return Response
     */
    public function destroy(OrderReturn $dispatchOrderReturn)
    {
        //
    }
}
