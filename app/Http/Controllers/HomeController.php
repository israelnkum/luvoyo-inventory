<?php

namespace App\Http\Controllers;

use App\Models\Company;
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

    public function index()
    {
        return view('home');
    }

    public function getDashboardData(){
        return response()->json([
            'employees' => [],
            'groups' => [],
            'portfolios' => [],
            'businesses' => [],
        ]);
    }

    public function getBusinessDetail()
    {
        return Company::first();
    }
}
