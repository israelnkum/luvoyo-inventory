<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends =[
        'name'
    ];

    protected $fillable = [
        'surname',
        'other_names',
        'dob',
        'gender',
        'telephone',
        'home_address',
        'id_type',
        'id_number',
        'remarks',
        'user_id'
    ];

    public function getNameAttribute(): string
    {
        return  $this->other_names." ".$this->surname;
    }

    public function photo(): MorphOne
    {
        return $this->morphOne(Photo::class,'photoable')->withDefault([
            'file_name' => null
        ]);
    }

    public function user(): MorphOne
    {
        return $this->morphOne(User::class,'userable');
    }
}
