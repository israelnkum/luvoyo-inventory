<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|Arrayable|\JsonSerializable
     */
    public function toArray($request): array|\JsonSerializable|Arrayable
    {
        return [
            'id' => $this->id,
            'surname' => $this->surname,
            'other_names' => $this->other_names,
            'name' => $this->name,
            'dob' => $this->dob,
            'gender' => $this->gender,
            'telephone' => $this->telephone,
            'photo' => '/storage/images/employees/' . $this->photo->file_name,
            'home_address' => $this->home_address,
            'id_type' => $this->id_type,
            'id_number' => $this->id_number,
            'remarks' => $this->remarks,
            'user_id' => $this->user_id
        ];
    }
}
