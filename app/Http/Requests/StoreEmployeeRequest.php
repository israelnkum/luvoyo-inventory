<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'surname' => 'required',
            'email' => 'required|unique:users',
            'other_names' => 'required',
            'dob' => 'required',
            'gender' => 'required',
            'telephone' => 'required',
            'home_address',
            'id_type' => 'required',
            'id_number' => 'required',
        ];
    }
}
