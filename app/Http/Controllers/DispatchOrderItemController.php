<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDispatchOrderItemRequest;
use App\Http\Requests\UpdateDispatchOrderItemRequest;
use App\Models\DispatchOrderItem;

class DispatchOrderItemController extends Controller
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
     * @param  \App\Http\Requests\StoreDispatchOrderItemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDispatchOrderItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DispatchOrderItem  $dispatchOrderItem
     * @return \Illuminate\Http\Response
     */
    public function show(DispatchOrderItem $dispatchOrderItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DispatchOrderItem  $dispatchOrderItem
     * @return \Illuminate\Http\Response
     */
    public function edit(DispatchOrderItem $dispatchOrderItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDispatchOrderItemRequest  $request
     * @param  \App\Models\DispatchOrderItem  $dispatchOrderItem
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDispatchOrderItemRequest $request, DispatchOrderItem $dispatchOrderItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DispatchOrderItem  $dispatchOrderItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(DispatchOrderItem $dispatchOrderItem)
    {
        //
    }
}
