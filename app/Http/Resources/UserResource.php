<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'username' => $this->username,
            'phoneNumber' => $this->phoneNumber,
            'roles' => $this->roles
        ];
    }
}
