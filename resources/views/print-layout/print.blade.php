<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Inventory') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <style>
        table {
            font-family: 'Arial', sans-serif;
            width: 100%;
            margin-bottom: 1rem;
            color: #000;
            vertical-align: top;
            border-color: green;
        }
        th{
            background: #262626;
            color: #fff;
            font-size: 12px;
            font-weight: lighter;
            padding: 10px;
        }
        td {
            padding: 10px;
            font-size: 13px;
            font-weight: lighter;
        }
        table > tbody > tr:nth-of-type(odd) > * {
            background: rgba(26, 26, 26, 0.09);
            color: #000000;
        }
    </style>
</head>
<body>
<div>
    <x-print-header/>
</div>
<table>
    <thead align="left">
    <tr align="left">
        <th>#</th>
        @yield('headers')
    </tr>
    </thead>
    <tbody>
    @yield('print-content')
    </tbody>
</table>
</body>
</html>
