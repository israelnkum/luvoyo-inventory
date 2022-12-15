<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReceivedOrderResource extends JsonResource
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
            'invoice_no' => $this->invoice_no,
            'date' => $this->date,
            'total' => $this->total,
            'user_id' => $this->user_id,
            'supplier_id' => $this->supplier_id,
            'damaged_total' => $this->orderItems->where('damaged', true)->sum('damaged_sub_total'),
            'supplier' => new SupplierResource($this->supplier),
            'order_items' => ReceivedOrderItemResource::collection($this->orderItems),
        ];
    }
}
