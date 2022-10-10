<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ProductExport implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize
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
            'Name',
            'Code',
            'Cost Price',
            'Selling Price',
            'Profit',
            'Qty',
            'Supplier',
            'Brand',
        ];
    }

    public function map($row): array
    {
        return [
            $row->name,
            $row->code,
            $row->cost_price,
            $row->selling_price,
            $row->profit,
            $row->quantity,
            $row->supplier->name,
            $row->brand,
        ];
    }
}
