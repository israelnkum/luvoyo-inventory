<?php

namespace App\Http\Controllers;

use App\Exports\ExportExpenses;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpensesResource;
use App\Models\Expense;
use App\Traits\UsePrint;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExpenseController extends Controller
{
    use UsePrint;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection|Response|BinaryFileResponse
     */
    public function index(Request $request)
    {

        $date = explode(',', $request->date);
        $expensesQuery = Expense::query();
        $expensesQuery->when($request->has('category') && $request->category !== 'all', function ($q) use ($request) {
            return $q->where('category', $request->category);
        });
        $expensesQuery->when($request->has('date') && count($date) !== 1, function ($q) use($date){
            $formatDate = [Carbon::parse($date[0]), Carbon::parse($date[1])];
            return $q->whereBetween('date_time', $formatDate);
        });

        if ($request->has('export') && $request->export === 'true'){
            return  Excel::download(new ExportExpenses(ExpensesResource::collection($expensesQuery->get())), 'Expenses.xlsx');
        }

        if ($request->has('print') && $request->print === 'true'){
            return $this->pdf('print.expenses', ExpensesResource::collection($expensesQuery->get()),'Expenses');
        }

        return ExpensesResource::collection($expensesQuery->paginate(10));
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
            $expenses->date_time = Carbon::now()->format('Y-m-d h:m:s');
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

    public function getChartData(Request $request){
        if ($request->has('range')){
            $from = \Carbon\Carbon::parse($request->range[0]);
            $to = Carbon::parse($request->range[1]);
        }else{
            $from = Carbon::parse()->startOfMonth();
            $to = Carbon::parse()->endOfMonth();
        }

        $expenses = Expense::query()->whereBetween('created_at',[$from, $to])
            ->get()->groupBy('category')
            ->map(function ($row) {
                return $row->sum('amount');
            });

        return [
            'labels' => $expenses->keys(),
            'series' => $expenses->values()
        ];
    }
}
