@extends('print-layout.print')
@section('headers')
    <th>Truck Code</th>
    <th>Vehicle Type</th>
    <th>Vin Number</th>
    <th>License Plate</th>
    <th>Description</th>
@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->truck_code}}</td>
            <td>{{$truck->vehicle_type}}</td>
            <td>{{$truck->vin_number}}</td>
            <td>{{$truck->license_plate}}</td>
            <td>{{$truck->description}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
