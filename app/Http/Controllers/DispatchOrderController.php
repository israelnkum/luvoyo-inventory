<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDispatchOrderRequest;
use App\Http\Requests\UpdateDispatchOrderRequest;
use App\Http\Resources\DispatchOrderResource;
use App\Models\DispatchOrder;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class DispatchOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): AnonymousResourceCollection
    {
        return DispatchOrderResource::collection(DispatchOrder::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(StoreDispatchOrderRequest $request)
    {
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDispatchOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDispatchOrderRequest $request): DispatchOrderResource|JsonResponse
    {
        DB::beginTransaction();
        try{
            $request['user_id'] = 1; //Auth::user()->id 
            $dispatchOrder = DispatchOrder::create($request->all());
            DB::commit();
            return new DispatchOrderResource($dispatchOrder);
        }
        catch(Exception $exception){
            DB::rollback();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DispatchOrder  $dispatchOrder
     * @return \Illuminate\Http\Response
     */
    public function show(DispatchOrder $dispatchOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DispatchOrder  $dispatchOrder
     * @return \Illuminate\Http\Response
     */
    public function edit(DispatchOrder $dispatchOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDispatchOrderRequest  $request
     * @param  \App\Models\DispatchOrder  $dispatchOrder
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDispatchOrderRequest $request, DispatchOrder $dispatchOrder): DispatchOrderResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $dispatchOrder->update($request->all());
            DB::commit();
            return new DispatchOrderResource($dispatchOrder);
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
     * @param  \App\Models\DispatchOrder  $dispatchOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(DispatchOrder $dispatchOrder): JsonResponse
    {
        DB::beginTransaction();
        try {
            $dispatchOrder->delete();
            DB::commit();
            return \response()->json('Dispatch order Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
