<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSuppliersRequest;
use App\Http\Requests\UpdateSuppliersRequest;
use App\Http\Resources\SuppliersResource;
use App\Models\Supplier;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): AnonymousResourceCollection
    {
        return SuppliersResource::collection(Supplier::paginate(10));
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
     * @param  \App\Http\Requests\StoreSuppliersRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSuppliersRequest $request): SuppliersResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = 1; //Auth::user()->id
            $suppliers = Supplier::create($request->all());
            DB::commit();
            return new SuppliersResource($suppliers);
        }catch (Exception $exception){
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Supplier  $suppliers
     * @return \Illuminate\Http\Response
     */
    public function show(Supplier $suppliers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Supplier  $suppliers
     * @return \Illuminate\Http\Response
     */
    public function edit(Supplier $suppliers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSuppliersRequest  $request
     * @param  \App\Models\Supplier  $suppliers
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSuppliersRequest $request, Supplier $suppliers): SuppliersResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $suppliers->update($request->all());
            DB::commit();
            return new SuppliersResource($suppliers);
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
     * @param  \App\Models\Supplier  $suppliers
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $suppliers): JsonResponse
    {
        DB::beginTransaction();
        try {
            $suppliers->delete();
            DB::commit();
            return \response()->json('Suppliers Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
