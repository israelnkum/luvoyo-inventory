@extends('print-layout.print')
@section('headers')
    <th>Ref ID</th>
    <th>Dispatch Order</th>
    <th>Expected Amount</th>
    <th>Received Amount</th>
    <th>Balance</th>
    <th>Date Time</th>

@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->ref_id}}</td>
            <td>{{$truck->dispatchOrder->order_no}}</td>
            <td>{{$truck->expected_amount}}</td>
            <td>{{$truck->received_amount}}</td>
            <td>{{$truck->balance}}</td>
            <td>{{$truck->date_time}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
