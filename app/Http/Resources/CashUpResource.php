<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CashUpResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'ref_id' => $this->ref_id,
            'truck_id' => $this->truck_id,
            'truck' => new TrucksResource($this->truck),
            'employee_id' => $this->employee_id,
            'employee' => new EmployeeResource($this->employee),
            'dispatch_order_id' => $this->dispatch_order_id,
            'dispatch_order' => new DispatchOrderResource($this->dispatchOrder),
            'expected_amount' => $this->expected_amount,
            'received_amount' => $this->received_amount,
            'balance' => $this->balance,
            'date_time' => $this->date_time,
            'user_id' => $this->user_id,
        ];
    }
}
