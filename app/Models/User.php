<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;
    protected $appends =[
      'name'
    ];

    public function getNameAttribute(): string
    {
        return  $this->first_name." ".$this->last_name;
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'phone_number',
        'default_password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class,'role_user', 'user_id','role_id')
            ->withPivot('deleted_at')
            ->withoutGlobalScope( SoftDeletingScope::class);
    }


    public function activeRoles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class,'role_user','user_id','role_id')
           ->wherePivot('deleted_at',null);
    }

    public function userable(): MorphTo
    {
        return $this->morphTo()->withDefault([
            'email' => $this->email,
            'username' => $this->username,
        ]);
    }

}
