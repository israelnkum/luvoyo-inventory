<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'location',
        'contact_person',
        'phone',
        'logo',
        'user_id'
    ];

    public function photo(): MorphOne
    {
        return $this->morphOne(Photo::class,'photoable')->withDefault([
            'file_name' => null
        ]);
    }

}
