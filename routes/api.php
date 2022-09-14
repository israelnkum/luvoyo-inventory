<?php

use App\Http\Controllers\CashUpController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DispatchOrderController;
use App\Http\Controllers\DispatchOrderReturnController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReceivedOrderController;
use App\Http\Controllers\ReceivedOrderItemController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\TruckController;
use App\Http\Controllers\UserController;
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

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('dashboard', [HomeController::class, 'getDashboardData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
    });

    Route::apiResource('/users', UserController::class);

    Route::apiResource('/employees', EmployeeController::class);

    Route::apiResource('/expenses', ExpenseController::class);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/suppliers', SuppliersController::class);

Route::apiResource('/products', ProductController::class);

Route::apiResource('/company', CompanyController::class);

Route::apiResource('/dispatchorder', DispatchOrderController::class);

Route::apiResponse('/dispatchorderreturn',DispatchOrderReturnController::class);

Route::apiResponse('/cashup',CashUpController::class);

Route::apiResponse('/truck', TruckController::class);

Route::apiResource('/recievedorder',ReceivedOrderController::class);

Route::apiResponse('/recievedorderitem', ReceivedOrderItemController::class);
