<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function addContract(Request $request) {
        return Contract::addContract($request);
    }

    public function getAllContracts() {
        return Contract::getAllContracts(); 
    }

    public function getUserContracts() {
        return Contract::getUserContracts();
    }
}
