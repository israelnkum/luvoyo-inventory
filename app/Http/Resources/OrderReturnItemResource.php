<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderReturnItemResource extends JsonResource
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
            'product_id' => $this->product_id,
            'item' => $this->product->name,
            'qty' => $this->qty,
            'sub_total' => $this->sub_total,
            'damaged' => $this->damaged,
            'damaged_qty' => $this->damaged_qty,
            'damaged_sub_total' => $this->damaged_sub_total,
        ];
    }
}
