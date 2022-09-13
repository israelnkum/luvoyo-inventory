<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCashUpRequest;
use App\Http\Requests\UpdateCashUpRequest;
use App\Http\Resources\CashUpResource;
use App\Models\CashUp;
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

            $request['user_id'] = Auth::user()->id;
            $cashUp = CashUp::create($request->all());
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
