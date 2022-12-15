<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TruckExport implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize
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
            'Truck Code',
            'Vehicle Type',
            'Vin Number',
            'License Plate',
            'Description',
        ];
    }

    public function map($row): array
    {
        return [
            $row->truck_code,
            $row->vehicle_type,
            $row->vin_number,
            $row->license_plate,
            $row->description,
        ];
    }
}
