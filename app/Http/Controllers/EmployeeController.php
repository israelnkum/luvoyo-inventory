<?php

namespace App\Http\Controllers;

use App\Exports\EmployeeExport;
use App\Helpers\HelperFunctions;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Traits\UsePrint;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class EmployeeController extends Controller
{
    use UsePrint;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection|\Illuminate\Http\Response|BinaryFileResponse
     */
    public function index(Request $request)
    {
        $employees = Employee::query();
        if ($request->has('export') && $request->export === 'true'){
            return  Excel::download(new EmployeeExport(EmployeeResource::collection($employees->get())), 'Suppliers.xlsx');
        }

        if ($request->has('print') && $request->print === 'true'){
            return $this->pdf('print.employees', EmployeeResource::collection($employees->get()),'Employees', 'landscape');
        }

        return EmployeeResource::collection($employees->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreEmployeeRequest $request
     * @return EmployeeResource|JsonResponse
     */
    public function store(StoreEmployeeRequest $request): EmployeeResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::user()->id;
            $request['dob'] = Carbon::parse($request->dob)->format('Y-m-d');
            $employee = Employee::create($request->all());
            if ($request->has('create_account') && $request->create_account === 'true'){
                $data = [
                    'id' => $employee->id,
                    'first_name' => $request->other_names,
                    'last_name' => $request->surname,
                    'email' => $request->email
                ];
                HelperFunctions::createUserAccount($employee, $data);
            }

            // upload picture if picture is part of request
            if ($request->has('file') && $request->file !== "null"){
               HelperFunctions::saveImage($employee, $request->file('file'), 'employees');
            }

            DB::commit();
            return new EmployeeResource($employee);
        }catch (Exception $exception){
            DB::rollBack();
            Log::info($exception);
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param UpdateEmployeeRequest $request
     * @param Employee $employee
     * @return EmployeeResource|JsonResponse
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee): EmployeeResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['dob'] = Carbon::parse($request->dob)->format('Y-m-d');
            $employee->update($request->all());
            // upload picture if picture is part of request
            if ($request->has('file') && $request->file != "null"){
                HelperFunctions::saveImage($employee, $request->file('file'), 'employees');
            }
            DB::commit();
            return new EmployeeResource($employee);
        }catch (Exception $exception){
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Employee $employee
     * @return JsonResponse
     */
    public function destroy(Employee $employee): JsonResponse
    {
        DB::beginTransaction();
        try {
            $employee->delete();
            DB::commit();
            return \response()->json('Employee Deleted');
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json('Something went wrong', 422);
        }
    }

    public function searchEmployees($query): AnonymousResourceCollection
    {
        $products = Employee::query()
            ->where('surname', 'like', '%' . $query . '%')
            ->orWhere('other_names', 'like', '%' . $query . '%')
            ->orWhere('email', 'like', '%' . $query . '%')->get();
        return EmployeeResource::collection($products);
    }

    public function me (){
        try {
            $fields = $request->only('project_id', 'user_device', 'user_os', 'user_location', 'user_view', 'user_browser');
            $rules = [
                'project_id' => 'required',
                'user_device' => 'required',
                'user_os' => 'required',
                'user_location' => 'required',
                'user_view' => 'required',
                'user_browser' => 'required',
            ];

            $validator = Validator::make($fields, $rules);
            if($validator->fails()) {
                return response()->json(['success'=> false, 'error'=> $validator->messages()]);
            }
            $stat = new Stat();
            $stat->project_id = $request->project_id;
            $stat->user_device = $request->user_device;
            $stat->user_os = $request->user_os;
            $stat->user_location = $request->user_location;
            $stat->user_view = $request->user_view;
            $stat->user_browser = $request->user_browser;
            if($stat->save()){
                return response()->json(['success'=> true, 'message'=> 'Stat saved successfully']);
            }
        }catch(\Exception $e){
            \Log::info($e);
        }
    }
}
