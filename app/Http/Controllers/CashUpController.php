<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCashUpRequest;
use App\Http\Requests\UpdateCashUpRequest;
use App\Http\Resources\CashUpResource;
use App\Models\CashUp;
use App\Models\DispatchOrder;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CashUpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection|Response
     */
    public function index(): Response|AnonymousResourceCollection
    {
        return CashUpResource::collection(CashUp::paginate(10));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCashUpRequest $request
     * @return CashUpResource|JsonResponse
     */
    public function store(StoreCashUpRequest $request): JsonResponse|CashUpResource
    {
        DB::beginTransaction();
        try {

            $dispatchOrder = DispatchOrder::find($request->dispatch_order_id);
            $cashUp = new CashUp();
            $cashUp->ref_id = $cashUp->generateReferenceNumber('ref_id');
            $cashUp->truck_id = $request->truck_id;
            $cashUp->employee_id = $request->employee_id;
            $cashUp->dispatch_order_id = $request->dispatch_order_id;
            $cashUp->expected_amount = $dispatchOrder->total;
            $cashUp->received_amount = $request->received_amount;
            $cashUp->balance = $dispatchOrder->total - $request->received_amount;
            $cashUp->date_time = Carbon::parse($request->date_time)->format('Y-m-d h:m');
            $cashUp->user_id = Auth::user()->id;

            $cashUp->save();
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
     * Update the specified resource in storage.
     *
     * @param UpdateCashUpRequest $request
     * @param CashUp $cashUp
     * @return CashUpResource|JsonResponse
     */
    public function update(UpdateCashUpRequest $request, CashUp $cashUp): JsonResponse|CashUpResource
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
     * @param CashUp $cashUp
     * @return JsonResponse
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
