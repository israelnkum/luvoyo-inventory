@extends('print-layout.print')
@section('headers')
    <th>Name</th>
    <th>Code</th>
    <th>Cost Price</th>
    <th>Selling Price</th>
    <th>Profit</th>
    <th>Qty</th>
    <th>Supplier</th>
    <th>Brand</th>

@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->name}}</td>
            <td>{{$truck->code}}</td>
            <td>{{$truck->cost_price}}</td>
            <td>{{$truck->selling_price}}</td>
            <td>{{$truck->profit}}</td>
            <td>{{$truck->quantity}}</td>
            <td>{{$truck->supplier->name}}</td>
            <td>{{$truck->brand}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
