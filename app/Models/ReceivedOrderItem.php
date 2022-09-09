<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceivedOrderItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'qty',
        'price',
        'sub_total',
        'damaged',
        'qty_damaged',
        'damaged_sub_total',
    ];
}
