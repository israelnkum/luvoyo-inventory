<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCashUpRequest;
use App\Http\Requests\UpdateCashUpRequest;
use App\Http\Resources\CashUpResource;
use App\Models\CashUp;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class CashUpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() : AnonymousResourceCollection
    {
        return CashUpResource::collection(CashUp::paginate(10));
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
     * @param  \App\Http\Requests\StoreCashUpRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCashUpRequest $request) : CashUpResource|JsonResponse
    {
        DB::beginTransaction();
        try{
            $request['user_id'] = 1; //Auth::user()->id
            $cashUp = CashUp::create($request->all());
            DB::commit();
            return new CashUpResource($cashUp);
        }
        catch(Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function show(CashUp $cashUp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function edit(CashUp $cashUp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCashUpRequest  $request
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCashUpRequest $request, CashUp $cashUp): CashUpResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $cashUp->update($request->all());
            DB::commit();
            return new CashUpResource($cashUp);
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
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function destroy(CashUp $cashUp): JsonResponse
    {
        DB::beginTransaction();
        try {
            $cashUp->delete();
            DB::commit();
            return \response()->json('Cash Up Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
