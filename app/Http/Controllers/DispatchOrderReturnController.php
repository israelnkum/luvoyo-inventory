<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDispatchOrderReturnRequest;
use App\Http\Requests\UpdateDispatchOrderReturnRequest;
use App\Http\Resources\DispatchOrderReturnResource;
use App\Models\DispatchOrderReturn;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DispatchOrderReturnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() : AnonymousResourceCollection
    {
        return DispatchOrderReturnResource::collection(DispatchOrderReturn::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(StoreDispatchOrderReturnRequest $request): DispatchOrderReturnResource|JsonResponse
    {
        DB::beginTransaction();
        try{
            DB::commit();
            $request['user_id'] = 1; //Auth::user()->id
            $dispatchOrderReturn = DispatchOrderReturn::create($request->all());
            return new DispatchOrderReturnResource($dispatchOrderReturn);
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
     * @param  \App\Http\Requests\StoreDispatchOrderReturnRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDispatchOrderReturnRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DispatchOrderReturn  $dispatchOrderReturn
     * @return \Illuminate\Http\Response
     */
    public function show(DispatchOrderReturn $dispatchOrderReturn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DispatchOrderReturn  $dispatchOrderReturn
     * @return \Illuminate\Http\Response
     */
    public function edit(DispatchOrderReturn $dispatchOrderReturn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDispatchOrderReturnRequest  $request
     * @param  \App\Models\DispatchOrderReturn  $dispatchOrderReturn
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDispatchOrderReturnRequest $request, DispatchOrderReturn $dispatchOrderReturn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DispatchOrderReturn  $dispatchOrderReturn
     * @return \Illuminate\Http\Response
     */
    public function destroy(DispatchOrderReturn $dispatchOrderReturn)
    {
        //
    }
}
