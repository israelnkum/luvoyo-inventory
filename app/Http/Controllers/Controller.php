<?php

namespace App\Http\Controllers;

use App\Helpers\HelperFunctions;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\StaffResource;
use App\Models\Employee;
use App\Models\Staff;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use function response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function newUserAccount(Request $request): Response|Application|ResponseFactory
    {
        DB::beginTransaction();
        try {
            $staff = Employee::find($request['employee_id']);
            $request['id'] = $request['employee_id'];
            HelperFunctions::createUserAccount($staff,$request);
            DB::commit();
            return response(new EmployeeResource($staff));
        }catch (Exception $exception){
            DB::rollBack();
            return response($exception,400);
        }
    }
}
