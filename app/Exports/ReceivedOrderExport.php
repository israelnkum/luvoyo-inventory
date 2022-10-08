<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ReceivedOrderExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
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
           'Invoice #',
           'Date',
           'Total',
           'Damaged Total',
           'Supplier',
//           'Items count',
       ];
    }

    public function map($row): array
    {

        return [
            $row->invoice_no,
            $row->date,
            $row->total,
            $row->damaged_total,
            $row->supplier->name,
        ];
    }
}
