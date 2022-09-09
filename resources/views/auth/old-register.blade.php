@extends('layouts.login')
@section('content')
    <div class="container">
        <div class="row justify-content-center align-items-center ">
            <div class="col-md-4">
                <div class="card login-body shadow-sm border-0 d-flex justify-content-center"  style="height: 100vh">
                    <div>
                        <div class="card-body">
                            <div class="text-center">
                                <h1 class="title">Electronic</h1>
                                <h1 class="subTitle">Voting</h1>
                                <h6 class="text-uppercase">Fill this form to begin</h6>
                            </div>
                            <form method="POST" action="{{ route('register') }}">
                                @csrf
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                           <span class="input-group-text" id="basic-addon1">
                                               <i class="fa fa-user-circle"></i>
                                           </span>
                                            </div>
                                            <input id="firstName" placeholder="First Name" type="text" class="form-control @error('name') is-invalid @enderror" name="firstName" value="{{ old('firstName') }}" required autocomplete="firstName" autofocus>
                                        </div>
                                        @error('firstName')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                           <span class="input-group-text" id="basic-addon1">
                                               <i class="fa fa-user-circle"></i>
                                           </span>
                                            </div>
                                            <input id="lastName" placeholder="Last Name" type="text" class="form-control @error('lastName') is-invalid @enderror" name="lastName" value="{{ old('lastName') }}" required autocomplete="lastName" autofocus>
                                        </div>
                                        @error('lastName')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>

                                    <div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                           <span class="input-group-text" id="basic-addon1">
                                               <i class="fa fa-envelope"></i>
                                           </span>
                                            </div>
                                            <input id="username" placeholder="Index Number" type="text" class="form-control @error('email') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username">
                                        </div>
                                        @error('email')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>

                                    <div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                           <span class="input-group-text" id="basic-addon1">
                                               <i class="fa fa-lock"></i>
                                           </span>
                                            </div>
                                            <input id="password" placeholder="Password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
                                        </div>
                                        @error('password')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                           <span class="input-group-text" id="basic-addon1">
                                               <i class="fa fa-lock"></i>
                                           </span>
                                            </div>
                                            <input id="password-confirm" placeholder="Confirm Password" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row mb-0">
                                    <div class="col-md-6 offset-md-3">
                                        <button type="submit" class="btn btn-primary btn-block">
                                            {{ __('Register') }}
                                        </button>
                                    </div>
                                    @if (Route::has('login'))
                                        <div class="col-md-12 mt-2 text-center d-flex align-items-center justify-content-center">
                                            Already have an account?&nbsp;
                                            <a class="btn btn-primary btn-sm btn-login" href="{{ route('login') }}">{{ __('Login') }}</a>
                                        </div>
                                    @endif
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
