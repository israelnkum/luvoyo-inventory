<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/{path?}', function () {
    return view('home');
})->where('path','.*')->middleware('auth');*/
Route::get('/js/react-router.js.map', [App\Http\Controllers\HomeController::class, 'index']);

Route::get('/{path?}', [App\Http\Controllers\HomeController::class, 'index'])
    ->where('path','.*');

