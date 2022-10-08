@extends('print-layout.print')
@section('headers')
    <th>TRANSACTION NO.</th>
    <th>CATEGORY</th>
    <th>DATE TIME</th>
    <th>AMOUNT</th>
    <th>DESCRIPTION</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->transaction_no}}</td>
            <td>{{$truck->category}}</td>
            <td>{{$truck->date_time}}</td>
            <td>{{$truck->amount}}</td>
            <td>{{$truck->description}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
