<?php

namespace App\Models;

use App\Traits\HasReferenceNumber;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CashUp extends Model
{
    use HasFactory, SoftDeletes, HasReferenceNumber;

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

    public function truck(): BelongsTo
    {
       return $this->belongsTo(Truck::class);
    }

    public function employee(): BelongsTo
    {
     return   $this->belongsTo(Employee::class);
    }

    public function dispatchOrder(): BelongsTo
    {
       return $this->belongsTo(DispatchOrder::class);
    }
}
