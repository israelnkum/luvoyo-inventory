<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DispatchOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return  [
            'id' => $this->id,
            'order_no' =>$this->order_no,
            'truck_id' =>$this->truck_id,
            'truck' => new TrucksResource($this->truck),
            'total' =>$this->total,
            'qty' =>$this->qty,
            'date_time' =>$this->date_time,
            'order_items' =>DispatchOrderItemResource::collection($this->orderItems),
            'return_time' =>$this->return_time,
            'employee_id' =>$this->employee_id,
            'cash_up' =>$this->cashUp,
            'employee' => new EmployeeResource($this->employee),
        ];
    }
}
