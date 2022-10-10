@extends('print-layout.print')
@section('headers')
    <th>Invoice #</th>
    <th>Date</th>
    <th>Total</th>
    <th>Damaged Total</th>
    <th>Supplier</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->invoice_no}}</td>
            <td>{{$truck->date}}</td>
            <td>{{$truck->total}}</td>
            <td>{{$truck->damaged_total}}</td>
            <td>{{$truck->supplier->name}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
