@extends('print-layout.print')
@section('headers')
    <th>Name</th>
    <th>Location</th>
    <th>Contact Person</th>
    <th>Phone</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->name}}</td>
            <td>{{$truck->location}}</td>
            <td>{{$truck->contact_person}}</td>
            <td>{{$truck->phone}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
