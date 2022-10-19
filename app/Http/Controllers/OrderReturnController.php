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
}
