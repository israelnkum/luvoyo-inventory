<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DispatchOrderItemResource extends JsonResource
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
            'selling_price' => 'R'.$this->selling_price,
            'dispatch_order_id' => $this->dispatch_order_id,
            'qty' => $this->qty,
            'sub_total' => 'R'.$this->sub_total,
        ];
    }
}
