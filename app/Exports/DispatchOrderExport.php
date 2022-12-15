<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DispatchOrderExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
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
            'Order #',
            'Truck',
            'Total',
            'Qty',
            'Date',
            'Return Time',
            'Staff',
        ];
    }

    public function map($row): array
    {
        return [
            $row->order_no,
            $row->truck->truck_code,
            $row->total,
            $row->qty,
            $row->date_time,
            $row->return_time,
            $row->employee->name,
        ];
    }
}
