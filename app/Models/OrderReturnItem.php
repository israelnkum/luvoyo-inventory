<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderReturnItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'qty',
        'sub_total',
        'damaged',
        'damaged_qty',
        'damaged_sub_total',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
