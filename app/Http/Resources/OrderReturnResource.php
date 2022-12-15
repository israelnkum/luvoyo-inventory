<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class OrderReturnResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request): array|JsonSerializable|Arrayable
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
