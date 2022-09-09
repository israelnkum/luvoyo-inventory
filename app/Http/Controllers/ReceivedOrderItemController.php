<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceivedOrderItemRequest;
use App\Http\Requests\UpdateReceivedOrderItemRequest;
use App\Models\ReceivedOrderItem;

class ReceivedOrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
