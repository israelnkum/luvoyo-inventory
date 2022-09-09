<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceivedOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'invoice_no',
        'date',
        'total',
        'user_id',
        'supplier_id'
    ];
}
