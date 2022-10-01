<?php

namespace App\Http\Controllers;

use App\Models\CashUp;
use App\Models\Company;
use App\Models\DispatchOrder;
use App\Models\Employee;
use App\Models\Expense;
use App\Models\Product;
use App\Models\ReceivedOrder;
use App\Models\Supplier;
use App\Models\Truck;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): Factory|View|Application
    {
        return view('home');
    }

    public function getCount($model): int
    {
        return $model->query()->count();
    }

    public function getDashboardData(): JsonResponse
    {
        $staff = Employee::query()->count();
        $suppliers = Supplier::query()->count();
        $expenses = Expense::query()->count();
        $dispatchOrders = DispatchOrder::query()->count();
        $receivedOrders = ReceivedOrder::query()->count();
        $trucks = Truck::query()->count();
        $cashUps = CashUp::query()->count();
        $products = Product::query()->count();
        return response()->json([
            'staff' => $staff,
            'suppliers' => $suppliers,
            'expenses' => 'R'.number_format($expenses,'2'),
            'dispatch_orders' => $dispatchOrders,
            'received_orders' => $receivedOrders,
            'trucks' => $trucks,
            'cash_ups' => $cashUps,
            'products' => $products,
        ]);
    }

    public function getBusinessDetail()
    {
        return Company::first();
    }
}
