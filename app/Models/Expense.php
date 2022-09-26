<?php

namespace App\Models;

use App\Traits\HasReferenceNumber;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense extends Model
{
    use HasFactory, SoftDeletes, HasReferenceNumber;

    public string $prefix = 'EXP';
    protected $fillable = [
        'transaction_no',
        'category',
        'date_time',
        'amount',
        'description',
        'user_id'
    ];
}
