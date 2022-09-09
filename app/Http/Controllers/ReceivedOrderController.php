<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceivedOrderRequest;
use App\Http\Requests\UpdateReceivedOrderRequest;
use App\Models\ReceivedOrder;

class ReceivedOrderController extends Controller
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
     * @param  \App\Http\Requests\StoreReceivedOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReceivedOrderRequest $request)
    {
        //
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
    public function update(UpdateReceivedOrderRequest $request, ReceivedOrder $receivedOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReceivedOrder  $receivedOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReceivedOrder $receivedOrder)
    {
        //
    }
}
