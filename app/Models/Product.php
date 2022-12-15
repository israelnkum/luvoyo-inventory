<?php

namespace App\Models;

use App\Traits\HasReferenceNumber;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes, HasReferenceNumber;

    public string $prefix = 'PRO';

    protected $fillable = [
        'name',
        'code',
        'cost_price',
        'selling_price',
        'supplier_id',
        'profit',
        'brand',
        'quantity',
        'user_id',
    ];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class)->withDefault([
            'name' => 'Self'
        ]);
    }

}
