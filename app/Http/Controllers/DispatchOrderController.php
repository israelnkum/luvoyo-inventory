<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Requests\StoreDispatchOrderRequest;
use App\Http\Requests\UpdateDispatchOrderRequest;
use App\Http\Resources\DispatchOrderResource;
use App\Models\DispatchOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DispatchOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return DispatchOrderResource::collection(DispatchOrder::paginate(10));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param StoreDispatchOrderRequest $request
     * @return JsonResponse|DispatchOrderResource
     */
    public function store(StoreDispatchOrderRequest $request): DispatchOrderResource|JsonResponse
    {
        DB::beginTransaction();
        try {

            $request['user_id'] = Auth::user()->id;
            $supplier = DispatchOrder::create($request->all());

            if ($request->has('file') && $request->file != "null"){
                HelperFunctions::saveImage($supplier, $request->file('file'), 'suppliers');
            }
            DB::commit();
            return new DispatchOrderResource($supplier);
        }catch (\Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateDispatchOrderRequest $request
     * @param DispatchOrder $supplier
     * @return DispatchOrderResource|JsonResponse|Response
     */
    public function update(UpdateDispatchOrderRequest $request, DispatchOrder $supplier): Response|DispatchOrderResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $supplier->update($request->all());

            if ($request->has('file') && $request->file != "null"){
                HelperFunctions::saveImage($supplier, $request->file('file'), 'suppliers');
            }

            DB::commit();
            return new DispatchOrderResource($supplier);
        }catch (\Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param DispatchOrder $suppliers
     * @return JsonResponse|Response
     */
    public function destroy(DispatchOrder $suppliers): Response|JsonResponse
    {
        DB::beginTransaction();
        try {
            $suppliers->delete();
            DB::commit();
            return \response()->json('Dispatch Order Deleted');
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
