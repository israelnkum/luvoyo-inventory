<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CashUp extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ref_id',
        'truck_id',
        'employee_id',
        'dispatch_order_id',
        'expected_amount',
        'received_amount',
        'balance',
        'date_time',
        'user_id',
    ];
}
