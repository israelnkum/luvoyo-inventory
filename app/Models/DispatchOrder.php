<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DispatchOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'dispatch_id',
        'truck_id',
        'total',
        'qty',
        'date_time',
        'return_time',
        'employee_id',
        'user_id'
    ];
}
