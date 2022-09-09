<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSuppliersRequest;
use App\Http\Requests\UpdateSuppliersRequest;
use App\Models\Supplier;

class SuppliersController extends Controller
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
     * @param  \App\Http\Requests\StoreSuppliersRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSuppliersRequest $request)
    {
        //
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
    public function update(UpdateSuppliersRequest $request, Supplier $suppliers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Supplier  $suppliers
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $suppliers)
    {
        //
    }
}
