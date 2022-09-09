<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCashUpRequest;
use App\Http\Requests\UpdateCashUpRequest;
use App\Models\CashUp;

class CashUpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreCashUpRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCashUpRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function show(CashUp $cashUp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function edit(CashUp $cashUp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCashUpRequest  $request
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCashUpRequest $request, CashUp $cashUp)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CashUp  $cashUp
     * @return \Illuminate\Http\Response
     */
    public function destroy(CashUp $cashUp)
    {
        //
    }
}
