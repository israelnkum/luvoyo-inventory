<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceivedOrderRequest;
use App\Http\Requests\UpdateReceivedOrderRequest;
use App\Http\Resources\ReceivedOrderResource;
use App\Models\ReceivedOrder;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ReceivedOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index():AnonymousResourceCollection
    {
        return ReceivedOrderResource::collection(ReceivedOrder::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReceivedOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReceivedOrderRequest $request): ReceivedOrderResource|JsonResponse
    {
        DB::beginTransaction();
        try{
            $request['user_id'] = 1; //Auth::user()->id
            $receivedOrder = ReceivedOrder::create($request->all());
            DB::commit();
            return new ReceivedOrderResource($receivedOrder);
        }
        catch(Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReceivedOrder  $receivedOrder
     * @return \Illuminate\Http\Response
     */
    public function show(ReceivedOrder $receivedOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ReceivedOrder  $receivedOrder
     * @return \Illuminate\Http\Response
     */
    public function edit(ReceivedOrder $receivedOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReceivedOrderRequest  $request
     * @param  \App\Models\ReceivedOrder  $receivedOrder
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReceivedOrderRequest $request, ReceivedOrder $receivedOrder): ReceivedOrderResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $receivedOrder->update($request->all());
            DB::commit();
            return new ReceivedOrderResource($receivedOrder);
        }catch (Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReceivedOrder  $receivedOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReceivedOrder $receivedOrder): JsonResponse
    {
        DB::beginTransaction();
        try {
            $receivedOrder->delete();
            DB::commit();
            return \response()->json('Received Order Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
