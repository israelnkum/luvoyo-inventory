<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class HelperFunctions
{
    static function saveImage($model, $file, $directory): void
    {
        $image_name = uniqid() . '.' . $file->getClientOriginalExtension();
        $file->storeAs(env('APP_PHOTO_PATH') . '/' . $directory . '/', $image_name);
        $model->photo()->updateOrCreate(['photoable_id' => $model->id], [
            'file_name' => $image_name
        ]);
    }

    static function createUserName($firstName, $lastName): string
    {
        $username = str_replace(' ', '', $firstName) . '.' . str_replace(' ', '', $lastName);
        $checkUsername = User::query()->where('username', $username)->count();

        if ($checkUsername > 0) {
            $username = $username . '_' . mt_rand(10, 150);
        }
        return strtolower($username);
    }

    static function createUserAccount($model, $data, $userName = null): void
    {

//        $actual = $userName == null
//            ? self::createUserName($data['first_name'], $data['last_name'])
//            : $userName;
        $password = strtoupper(Str::random(10));
        $model::find($data['id'])->user()->updateOrCreate(
            ['username' => $data['email']],
            [
                'username' => $data['email'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make($password),
                'default_password' => $password,
            ]
        );
    }


}
