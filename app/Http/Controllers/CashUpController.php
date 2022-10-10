<?php

namespace App\Http\Controllers;

use App\Exports\ExportCashUp;
use App\Http\Requests\StoreCashUpRequest;
use App\Http\Requests\UpdateCashUpRequest;
use App\Http\Resources\CashUpResource;
use App\Models\CashUp;
use App\Models\DispatchOrder;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class CashUpController extends Controller
{
    use UsePrint;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection|Response|\Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(Request $request)
    {
        $cashUpQuery = CashUp::query();
        $cashUpQuery->when($request->has('truck_code') && $request->truck_code !== null, static function (Builder $q) use ($request){
             $q->whereRelation('dispatchOrder.truck', 'truck_code', $request->truck_code);
        });

        if ($request->has('export') && $request->export === 'true'){
            return  Excel::download(new ExportCashUp(CashUpResource::collection($cashUpQuery->get())), 'Cashups.xlsx');
        }

        if ($request->has('print') && $request->print === 'true'){
            return $this->pdf('print.cash-up', CashUpResource::collection($cashUpQuery->get()),'CashUp');
        }

        return CashUpResource::collection($cashUpQuery->paginate(10));
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
            $dispatchOrder->update([
                'return_time' => Carbon::now()->format('h:m:s')
            ]);

            $cashUp = new CashUp();
            $cashUp->ref_id = $cashUp->generateReferenceNumber('ref_id');
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
            $dispatchOrder = DispatchOrder::find($request->dispatch_order_id);
            $cashUp['expected_amount'] = $dispatchOrder->total;
            $cashUp['balance'] = $dispatchOrder->total - $request->received_amount;
            $request['date_time'] = Carbon::parse($request->date_time)->format('Y-m-d h:m');
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
