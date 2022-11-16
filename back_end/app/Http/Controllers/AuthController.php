<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function user() {
        return Auth::user();
    }

    public function login(Request $request) {
        return User::login($request);
    }

    public function register(Request $request) {
        return User::register(($request));
    }

    public function loginWithGG(Request $request) { 
        return User::loginWithGG(($request));
    }

    public function updateProfile(Request $request) {
        return User::updateProfile($request);
    }

    public function changePassword(Request $request) {
        return User::changePassword($request);
    }

    public function resetPassword(Request $request) {
        return User::resetPassword($request);
    }
}
