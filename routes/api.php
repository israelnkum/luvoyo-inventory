<?php

use App\Http\Controllers\CashUpController;
use App\Http\Controllers\DispatchOrderController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderReturnController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReceivedOrderController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\TruckController;
use App\Http\Controllers\UserController;
use App\Models\Truck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('dashboard', [HomeController::class, 'getDashboardData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
        Route::post('/change-password',[UserController::class, 'changePassword']);
    });

    Route::apiResource('/users', UserController::class);

    Route::prefix('employees')->group(function () {
        Route::get('/search/{query}', [EmployeeController::class, 'searchEmployees']);
    });
    Route::apiResource('/employees', EmployeeController::class);

    Route::post('/expenses/chart', [ExpenseController::class, 'getChartData']);
    Route::apiResource('/expenses', ExpenseController::class);

    Route::prefix('trucks')->group(function () {
        Route::get('/print', [TruckController::class, 'downloadPdf']);
        Route::get('/search/{query}', [TruckController::class, 'searchTrucks']);
    });
    Route::apiResource('/trucks', TruckController::class);

    Route::apiResource('/suppliers', SuppliersController::class);

    Route::post('/cash-ups/chart', [CashUpController::class, 'getChartData']);
    Route::apiResource('/cash-ups', CashUpController::class);

    Route::get('business/detail', [HomeController::class, 'getBusinessDetail']);

    Route::prefix('dispatch-orders')->group(function () {
        Route::get('/search/{query}', [DispatchOrderController::class, 'searchDispatchOrders']);
    });

    Route::apiResource('/dispatch-orders', DispatchOrderController::class);

    Route::apiResource('/received-orders', ReceivedOrderController::class);


    Route::apiResource('/order-returns', OrderReturnController::class);


    Route::prefix('products')->group(function () {
        Route::get('/search/{query}', [ProductController::class, 'searchProducts']);
    });

    Route::apiResource('/products', ProductController::class);

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
