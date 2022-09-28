<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDispatchOrderReturnItemRequest;
use App\Http\Requests\UpdateDispatchOrderReturnItemRequest;
use App\Models\OrderReturnItem;

class DispatchOrderReturnItemController extends Controller
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
     * @param  \App\Http\Requests\StoreDispatchOrderReturnItemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDispatchOrderReturnItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OrderReturnItem  $dispatchOrderReturnItem
     * @return \Illuminate\Http\Response
     */
    public function show(OrderReturnItem $dispatchOrderReturnItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OrderReturnItem  $dispatchOrderReturnItem
     * @return \Illuminate\Http\Response
     */
    public function edit(OrderReturnItem $dispatchOrderReturnItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDispatchOrderReturnItemRequest  $request
     * @param  \App\Models\OrderReturnItem  $dispatchOrderReturnItem
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDispatchOrderReturnItemRequest $request, OrderReturnItem $dispatchOrderReturnItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrderReturnItem  $dispatchOrderReturnItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderReturnItem $dispatchOrderReturnItem)
    {
        //
    }
}
