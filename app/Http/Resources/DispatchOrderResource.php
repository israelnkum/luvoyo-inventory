<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class DispatchOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request): array|JsonSerializable|Arrayable
    {
        return  [
            'id' => $this->id,
            'order_no' =>$this->order_no,
            'truck_id' =>$this->truck_id,
            'truck' => new TrucksResource($this->truck),
            'total' =>'R'.$this->total,
            'qty' =>$this->qty,
            'date_time' =>$this->date_time,
            'order_items' =>DispatchOrderItemResource::collection($this->orderItems),
            'return_time' =>$this->return_time,
            'employee_id' =>$this->employee_id,
            'cash_up' => $this->cashUp ?: null,
            'employee' => new EmployeeResource($this->employee),
        ];
    }
}
