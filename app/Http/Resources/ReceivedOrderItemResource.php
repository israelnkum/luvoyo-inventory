<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReceivedOrderItemResource extends JsonResource
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
            'product_id' => $this->product_id,
            'qty' => $this->qty,
            'price' => $this->price,
            'sub_total' => $this->sub_total,
            'damaged' => $this->damaged,
            'qty_damaged' => $this->qty_damaged,
            'damaged_sub_total' => $this->damaged_sub_total,
            'item' => $this->product->name,
        ];
    }
}
