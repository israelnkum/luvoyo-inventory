<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Imports\VoterImport;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return
     */
    public function index()
    {
        return UserResource::collection(User::withTrashed()->whereHas('activeRoles', function ($q){
            $q->where('name', 'Admin')->orWhere('name', 'EC')->orWhere('name', 'Agent');
        })->get());
    }

    public function getActiveRoles($id): array
    {
        $loggedInUser = Auth::user();
        $activeRoles = [];

        return [$loggedInUser->only(['id', 'name', 'username', 'default_password']), $activeRoles];

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $username = $request->firstName.'.'.$request->lastName;
        $checkUsername = User::where('username',$username)->count();

        if ($checkUsername >= 1){
            $username = $username.'_'.mt_rand(10,150);
        }
        DB::beginTransaction();
        $request['username'] = strtolower($username);
        $request['password'] = Hash::make(strtolower($username));
        try {
            $user = User::create($request->all());
            $role = Role::where('name', 'Admin')->first();
            DB::commit();
            return \response(new UserResource($user));
        }catch (Exception $exception){
            DB::rollBack();
            return \response('Something went wrong', 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  $id
     * @return JsonResponse|Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try
        {
            User::find($id)->update($request->all());
            DB::commit();

            $user = User::find($id);
            return \response($request->has('voter') ? new VoterResource($user) : new UserResource($user));

        }catch (Exception $exception){
            DB::rollBack();
            return response('Something went wrong', 422);
        }
    }

    public function getUserRoles($id){
        $userRoles = User::find($id)->roles;
        $otherRoles = Role::whereNotIn('id', $userRoles->pluck('pivot.roleId'))->get();

        return [ $userRoles, $otherRoles ];
    }
    public function changePassword(Request $request)
    {
        $this->validate($request,[
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        DB::beginTransaction();
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 400);
        }
        try {
            if (!Hash::check($request['currentPassword'], $user->password)) {
                return response()->json([
                    'message' => 'Current Password is incorrect'
                ], 400);
            }

            if (Hash::check($request['password'], $user->password)) {
                return response()->json([
                    'message' => 'New Password is the same as current'
                ], 400);

            }

            $user->update([
                'password' => Hash::make($request->password),
                'default_password' => NULL,
            ]);
            DB::commit();
            return [$user->only(['id', 'name', 'username', 'default_password']), []];
//            return \response(new UserResource($user));
        }catch (Exception $exception){
            DB::rollBack();
            return \response('Something went wrong!', 400);
        }
    }
}
