<?php

namespace App\Models;

use App\Traits\HasReferenceNumber;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class DispatchOrder extends Model
{
    use HasFactory, SoftDeletes, HasReferenceNumber;

    public string $prefix = 'DSP';
    /**
     * @var mixed|string
     */

    protected $fillable = [
        'order_no',
        'truck_id',
        'total',
        'qty',
        'date_time',
        'return_time',
        'employee_id',
        'user_id'
    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(DispatchOrderItem::class);
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function truck(): BelongsTo
    {
        return $this->belongsTo(Truck::class);
    }

    public function cashUps(): HasMany
    {
        return $this->hasMany(CashUp::class);
    }
}
