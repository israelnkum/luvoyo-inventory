@extends('print-layout.print')
@section('headers')
    <th>DISPATCH ORDER NO.</th>
    <th>ITEMS COUNT</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $item)
        <tr>
            <td>{{$i}}</td>
            <td>{{$item->dispatch_id}}</td>
            <td>{{$item->order_items ? count($item->order_items) : 0}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
