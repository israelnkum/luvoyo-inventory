@extends('print-layout.print')
@section('headers')
    <th>Surname</th>
    <th>Email</th>
    <th>Other Names</th>
    <th>Dob</th>
    <th>Gender</th>
    <th>Telephone</th>
    <th>Home Address</th>
    <th>ID Type</th>
    <th>ID #</th>

@endsection
@section('print-content')
    @php($i = 1)
    @foreach($data as $truck)
        <tr>
            <td>{{$i}}</td>
            <td>{{$truck->surname}}</td>
            <td>{{$truck->email}}</td>
            <td>{{$truck->other_names}}</td>
            <td>{{$truck->dob}}</td>
            <td>{{$truck->gender}}</td>
            <td>{{$truck->telephone}}</td>
            <td>{{$truck->home_address}}</td>
            <td>{{$truck->id_type}}</td>
            <td>{{$truck->id_number}}</td>
        </tr>
        @php(++$i)
    @endforeach
@endsection
