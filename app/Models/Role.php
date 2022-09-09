<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $fillable =[
        'name'
    ];

    public function users(){
        return $this->belongsToMany(User::class,'role_user','user_id');
    }

    public function pivot(){
        return $this->hasOne(RoleUser::class,'role_id');
    }
}
