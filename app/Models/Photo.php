<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Photo extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    public function photoable(){
        return $this->morphTo();
    }

    protected $fillable = [
        'photoable',
        'photoUrl',
        'fileName',
    ];

}
