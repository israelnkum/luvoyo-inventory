<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EmployeeExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    private AnonymousResourceCollection $collection;

    public function __construct($collection)
    {
        $this->collection = $collection;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function collection(): AnonymousResourceCollection
    {
        return $this->collection;
    }

    public function headings(): array
    {
        return [
            'Surname',
            'Email',
            'Other Names',
            'Dob',
            'Gender',
            'Telephone',
            'Home Address',
            'ID Type',
            'ID Number',
        ];
    }

    public function map($row): array
    {
        return [
            $row->surname,
            $row->email,
            $row->other_names,
            $row->dob,
            $row->gender,
            $row->telephone,
            $row->home_address,
            $row->id_type,
            $row->id_number
        ];
    }
}
