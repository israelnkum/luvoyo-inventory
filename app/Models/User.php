<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
/**
 * @method static updateOrcreate(array $array, array $array1)
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;
    protected $appends =[
      'name'
    ];

    public function getNameAttribute(): string
    {
        return  $this->firstName." ".$this->lastName;
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'username',
        'email',
        'password',
        'phoneNumber',
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

}
