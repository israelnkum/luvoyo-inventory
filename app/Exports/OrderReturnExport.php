<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class OrderReturnExport implements  FromCollection, WithMapping, WithHeadings, ShouldAutoSize
{
    /**
     * @var AnonymousResourceCollection
     */
    private AnonymousResourceCollection $data;

    /**
     * @param $expensesResource
     */
    public function __construct($expensesResource){
        $this->data = $expensesResource;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function collection(): AnonymousResourceCollection
    {
        return $this->data;
    }

    public function headings(): array
    {
        return [];
    }

    public function map($row): array
    {
        return [];
    }
}
