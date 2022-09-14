<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceivedOrderItemRequest;
use App\Http\Requests\UpdateReceivedOrderItemRequest;
use App\Http\Resources\ReceivedOrderItemResource;
use App\Models\ReceivedOrderItem;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ReceivedOrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index():AnonymousResourceCollection
    {
        return ReceivedOrderItemResource::collection(ReceivedOrderItem::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(StoreReceivedOrderItemRequest $request): ReceivedOrderItemResource|JsonResponse
    {
        DB::beginTransaction();
        try{
            DB::commit();
            $request['user_id'] = 1; //Auth::user()->id
            $receivedOrderItem = ReceivedOrderItem::create($request->all());
            return new ReceivedOrderItemResource($receivedOrderItem);
        }
        catch(Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReceivedOrderItemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReceivedOrderItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReceivedOrderItem  $receivedOrderItem
     * @return \Illuminate\Http\Response
     */
    public function show(ReceivedOrderItem $receivedOrderItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ReceivedOrderItem  $receivedOrderItem
     * @return \Illuminate\Http\Response
     */
    public function edit(ReceivedOrderItem $receivedOrderItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReceivedOrderItemRequest  $request
     * @param  \App\Models\ReceivedOrderItem  $receivedOrderItem
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReceivedOrderItemRequest $request, ReceivedOrderItem $receivedOrderItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReceivedOrderItem  $receivedOrderItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReceivedOrderItem $receivedOrderItem)
    {
        //
    }
}
