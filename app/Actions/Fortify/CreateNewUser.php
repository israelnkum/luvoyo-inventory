<?php

namespace App\Actions\Fortify;

use App\Libs\TTU;
use App\Models\AccessToken;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;
    private array $info;
    /**
     * Validate and create a newly registered user.
     *
     * @param array $data
     * @return User|\Illuminate\Http\JsonResponse|RedirectResponse
     * @throws ValidationException
     * @throws \Exception
     */
    public function create(array $data)
    {
        try {
            $ttuApi = new TTU();
            $res= $ttuApi->info($data['username'])->json()['data'];
            if (count($res)){
                $this->info = $res;
            }else{
                throw ValidationException::withMessages(['username' =>'Index Number is no valid!']);

            }
        }catch (\Exception $exception){
//            Session::put('registerError', 'Oops! Something went wrong');
            throw ValidationException::withMessages(['username' =>'Oops! Something went wrong']);
        }

        Validator::make($data, [
            'username' => ['required', 'string', 'max:255', Rule::unique(User::class),],
        ])->validate();

        $password = Str::random(10);

        $names =  $this::formatName($this->info['name']);
        DB::beginTransaction();
        try {
            $user = User::create([
                'firstName' => $names[1],
                'lastName' => $names[0],
                'username' => $data['username'],
                'email' => $this->info['email'],
                'password' => Hash::make($password)
            ]);

            AccessToken::firstOrCreate([
                'token' => $password,
                'indexNumber' => $data['username'],
                'userId' => $user->id
            ]);

            $role = Role::where('name', 'Candidate')->first();

            $user->roles()->attach($role->id,["id" => Str::uuid()]);

            DB::commit();
            return $user;
        }catch (\Exception $exception){
            DB::rollBack();
            Log::error('Registration error', [$exception->getMessage(), $exception->getLine()]);
            throw ValidationException::withMessages(['username' =>'Something went wrong']);
        }
    }

    static function formatName ($name): array
    {
        $nameArray = explode(' ',$name);
        $otherNames  =  implode(' ', array_slice($nameArray, 1));
        return [
            $nameArray[0], $otherNames
        ];
    }
}
