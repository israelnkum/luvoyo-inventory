<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DispatchOrderItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'dispatch_order_id',
        'qty',
        'sub_total',
    ];
}
