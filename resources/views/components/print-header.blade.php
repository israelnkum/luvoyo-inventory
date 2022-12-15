<div>
    <table>
        <tbody>
        <tr >
            <td style="background: #fff">
                <img height="auto" width="150" src="{{public_path('/images/logo.jpeg')}}" alt="Logo">
            </td>
            <td style="background: #fff; width: 30%"></td>
            <td  style="text-align: right; background: #fff; line-height: 0.2;">
                <div style="text-align: left">
                    <h3>{{$business->name}}</h3>
                    <p><b>Phone:</b> {{$business->phone_number}}</p>
                    <p style="margin-bottom: 4px;"><b>Email:</b> {{$business->email}}</p>
                    <p style="line-height: 1; margin-top: 0;"><b>Address:</b> {{$business->address}}</p>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
    <div style=" display: flex !important; justify-content: space-between !important;">
    </div>
</div>

