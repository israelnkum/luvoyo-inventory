<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreTruckRequest;
use App\Http\Requests\UpdateTruckRequest;
use App\Http\Requests\UpdateTrucksRequest;
use App\Http\Resources\TrucksResource;
use App\Models\Truck;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TruckController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return TrucksResource::collection(Truck::paginate(10));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTruckRequest $request
     * @return JsonResponse|TrucksResource
     */
    public function store(StoreTruckRequest $request): TrucksResource|JsonResponse
    {
        DB::beginTransaction();
        try {

            $request['user_id'] = Auth::user()->id;
            $truck = Truck::create($request->all());
            DB::commit();
            return new TrucksResource($truck);
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
     * @param UpdateTruckRequest $request
     * @param Truck $truck
     * @return TrucksResource|JsonResponse|Response
     */
    public function update(UpdateTruckRequest $request, Truck $truck): Response|TrucksResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $truck->update($request->all());
            DB::commit();
            return new TrucksResource($truck);
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
     * @param Truck $trucks
     * @return JsonResponse|Response
     */
    public function destroy(Truck $trucks): Response|JsonResponse
    {
        DB::beginTransaction();
        try {
            $trucks->delete();
            DB::commit();
            return \response()->json('Truck Deleted');
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
