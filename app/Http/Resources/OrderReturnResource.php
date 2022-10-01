<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderReturnResource extends JsonResource
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
            'dispatch_id' => $this->dispatch_id,
            'user_id' => $this->user_id,
            'dispatch_order' => $this->dispatchOrder,
            'order_items' => OrderReturnItemResource::collection($this->orderReturnItems),
        ];
    }
}
