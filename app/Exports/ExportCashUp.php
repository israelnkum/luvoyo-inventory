<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ExportCashUp implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize
{

    private AnonymousResourceCollection $data;

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
        return [
            'Ref Id',
            'Dispatch Order',
            'Expected Amount',
            'Received Amount',
            'Balance',
            'Date Time',
        ];
    }

    public function map($row): array
    {
        return [
            $row->ref_id,
            $row->dispatchOrder->order_no,
            $row->expected_amount,
            $row->received_amount,
            $row->balance,
            $row->date_time,
        ];
    }
}
