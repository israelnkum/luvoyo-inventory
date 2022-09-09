<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Imports\VoterImport;
use App\Models\Role;
use App\Models\User;
use Exception;
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

        return [$loggedInUser->only(['id', 'name', 'username']), $activeRoles];

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



    public function importVoters(Request $request)
    {
        ini_set('memory_limit', '-1');
        ini_set('MAX_EXECUTION_TIME', '-1');
        set_time_limit(0);

        $valid_exts = array('csv','xls','xlsx'); // valid extensions
        $file = $request->file('file');
        if (!empty($file)) {
            $ext = strtolower($file->getClientOriginalExtension());
            if (in_array($ext, $valid_exts)) {
                $voterList= Excel::toCollection(new VoterImport(),$file);
                $voters = $voterList[0];
                DB::beginTransaction();
                try {

                    $uploaded = [];
                    for ($i = 0; $i < count($voters); $i++) {
                        $user = User::updateOrcreate([
                            'username' => $voters[$i]['username']
                        ],[
                            'firstName' => $voters[$i]['first_name'] ?? $voters[$i]['last_name'],
                            'lastName'  => $voters[$i]['last_name'] ?? $voters[$i]['first_name'],
                            'username'  => $voters[$i]['username'],
                            'email'  => $voters[$i]['email'],
                            'phoneNumber'  => $voters[$i]['phone_number'],
                            'password'  => Hash::make($voters[$i]['password']),
                        ]);


                        $uploaded[] = $user->id;
                    }
                    DB::commit();
                    return response()->json([
                        'message' => count($uploaded) . '  Voters uploaded successful'
                    ]);
//                    return \response(VoterResource::collection($allVoters->get()));
                }catch (Exception $exception){
                    DB::rollBack();
                    return response($exception->getMessage(), 422);
                }
            }else {
                return response('Only excel file is accepted!', 422);
            }
        } else {
            return \response('Please upload an excel file!', 422);
        }
    }

    public function downloadUploadFormat(): BinaryFileResponse
    {
        $pathToFile = public_path('assets/voterUploadFormat.xlsx');
        return response()->download($pathToFile);
    }
}
