<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductsResource extends JsonResource
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
            'name' => $this->name,
            'code' => $this->code,
            'cost_price' => $this->cost_price,
            'selling_price' => $this->selling_price,
            'supplier' => $this->supplier->name,
            'supplier_id' => $this->supplier_id,
            'profit' => $this->profit,
            'brand' => $this->brand,
            'quantity' => $this->quantity,
            'user_id' => $this->user_id,
        ];
    }
}
