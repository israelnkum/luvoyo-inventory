@extends('print-layout.print')
@section('headers')
    <th>Order #</th>
    <th>Truck</th>
    <th>Total</th>
    <th>Qty</th>
    <th>Date</th>
    <th>Return Time</th>
    <th>Staff</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->order_no}}</td>
            <td>{{$truck->truck->truck_code}}</td>
            <td>{{$truck->total}}</td>
            <td>{{$truck->qty}}</td>
            <td>{{$truck->date_time}}</td>
            <td>{{$truck->return_time}}</td>
            <td>{{$truck->employee->name}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
