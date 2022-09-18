<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Requests\StoreSuppliersRequest;
use App\Http\Requests\UpdateSuppliersRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        if ($request->query('page') == 0){
            $suppliers = Supplier::all();
        }else{
            $suppliers = Supplier::paginate(10);
        }
        return SupplierResource::collection($suppliers);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param StoreSuppliersRequest $request
     * @return JsonResponse|SupplierResource
     */
    public function store(StoreSuppliersRequest $request): SupplierResource|JsonResponse
    {
        DB::beginTransaction();
        try {

            $request['user_id'] = Auth::user()->id;
            $supplier = Supplier::create($request->all());

            if ($request->has('file') && $request->file != "null"){
                HelperFunctions::saveImage($supplier, $request->file('file'), 'suppliers');
            }
            DB::commit();
            return new SupplierResource($supplier);
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
     * @param UpdateSuppliersRequest $request
     * @param Supplier $supplier
     * @return SupplierResource|JsonResponse|Response
     */
    public function update(UpdateSuppliersRequest $request, Supplier $supplier): Response|SupplierResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $supplier->update($request->all());

            if ($request->has('file') && $request->file != "null"){
                HelperFunctions::saveImage($supplier, $request->file('file'), 'suppliers');
            }

            DB::commit();
            return new SupplierResource($supplier);
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
     * @param Supplier $suppliers
     * @return JsonResponse|Response
     */
    public function destroy(Supplier $suppliers): Response|JsonResponse
    {
        DB::beginTransaction();
        try {
            $suppliers->delete();
            DB::commit();
            return \response()->json('Supplier Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
