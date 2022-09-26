<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReceivedOrderRequest extends FormRequest
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
            'invoice_no' => 'required|unique:received_orders',
            'date' => 'required',
            'supplier_id' => 'required',
        ];
    }


    public function messages(): array
    {
        return [
            'invoice.required' => 'Enter Invoice number',
            'date' => 'Date is required',
            'supplier_id' => 'Select a supplier',
        ];
    }
}
