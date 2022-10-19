<?php

namespace App\Http\Controllers;

use App\Exports\ProductExport;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ExpensesResource;
use App\Http\Resources\ProductsResource;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Traits\UsePrint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Exception;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProductController extends Controller
{
    use UsePrint;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection|Response|BinaryFileResponse
     */
    public function index(Request $request)
    {
        $product = Product::query();

        if ($request->has('export') && $request->export === 'true'){
            return  Excel::download(new ProductExport(ProductsResource::collection($product->get())), 'Products.xlsx');
        }

        if ($request->has('print') && $request->print === 'true'){
            return $this->pdf('print.products', ProductsResource::collection($product->get()),'Products');
        }

        return ProductsResource::collection($product->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductRequest $request
     * @return JsonResponse|ProductsResource
     */
    public function store(StoreProductRequest $request): JsonResponse|ProductsResource
    {
        DB::beginTransaction();
        try {
            $product = new Product();
            $product->name = $request->name;
            $product->code = $product->generateReferenceNumber('code');
            $product->cost_price = $request->cost_price;
            $product->selling_price = $request->selling_price;
            $product->profit = $request->selling_price - $request->cost_price;
            $product->brand = $request->brand;
            $product->quantity = $request->quantity;
            $product->supplier_id = $request->supplier_id;
            $product->user_id = Auth::user()->id;
            $product->save();
            DB::commit();
            return new ProductsResource($product);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductRequest $request
     * @param Product $product
     * @return JsonResponse|ProductsResource
     */
    public function update(UpdateProductRequest $request, Product $product): JsonResponse|ProductsResource
    {
        DB::beginTransaction();
        try {
            $request['profit'] = $request->selling_price - $request->cost_price;
            $product->update($request->all());
            DB::commit();
            return new ProductsResource($product);
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
     * @param Product $product
     * @return JsonResponse
     */
    public function destroy(Product $product): JsonResponse
    {
        DB::beginTransaction();
        try {
            $product->delete();
            DB::commit();
            return \response()->json('Product Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }

    public function searchProducts($query): AnonymousResourceCollection
    {
        $products = Product::query()->where('name', 'like', '%' . $query . '%')->get();
        return ProductsResource::collection($products);
    }
}
