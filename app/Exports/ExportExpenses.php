<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ExportExpenses implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize
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

    /**
     * @return string[]
     */
    public function headings(): array
    {
        return [
            'Transaction #',
            'Category',
            'Date & Time',
            'Amount',
            'Description'
        ];
    }

    /**
     * @param $row
     * @return array
     */
    public function map($row): array
    {
        return [
            $row->transaction_no,
            $row->category,
            $row->date_time,
            $row->amount,
            $row->description,
        ];
    }
}
