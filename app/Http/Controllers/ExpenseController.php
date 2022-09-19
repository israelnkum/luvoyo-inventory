<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpensesResource;
use App\Http\Resources\SupplierResource;
use App\Models\Expense;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return ExpensesResource::collection(Expense::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreExpenseRequest $request
     * @return ExpensesResource|JsonResponse
     */
    public function store(StoreExpenseRequest $request): ExpensesResource|JsonResponse
    {
        DB::beginTransaction();
        try {

            $request['user_id'] = Auth::user()->id;
            $expenses = new Expense();
            $expenses->transaction_no = $expenses->generateReferenceNumber('transaction_no');
            $expenses->category = $request->category;
            $expenses->date_time = $request->date_time;
            $expenses->amount = $request->amount;
            $expenses->description = $request->description;
            $expenses->user_id = $request->user_id;
            $expenses->save();
            DB::commit();
            return new ExpensesResource($expenses);
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
     * @param UpdateExpenseRequest $request
     * @param Expense $expense
     * @return ExpensesResource|JsonResponse|Response
     */
    public function update(UpdateExpenseRequest $request, Expense $expense): Response|ExpensesResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $expense->update($request->all());
            DB::commit();
            return new ExpensesResource($expense);
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
     * @param Expense $expense
     * @return JsonResponse
     */
    public function destroy(Expense $expense): JsonResponse
    {
        DB::beginTransaction();
        try {
            $expense->delete();
            DB::commit();
            return \response()->json('Expenses Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }
}
