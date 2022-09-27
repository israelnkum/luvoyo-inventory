<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDispatchOrderReturnRequest;
use App\Http\Requests\UpdateDispatchOrderReturnRequest;
use App\Http\Resources\OrderReturnResource;
use App\Models\OrderReturn;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

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
     * @return Response
     */
    public function store(StoreDispatchOrderReturnRequest $request)
    {
        //
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
