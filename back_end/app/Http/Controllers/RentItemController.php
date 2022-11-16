<?php

namespace App\Http\Controllers;

use App\Models\RentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RentItemController extends Controller
{
    public function getAllRentItems() {
        return RentItem::getAllRentItems();
    }

    public function getUserRentItems() {
        return RentItem::getUserRentItems();
    }

    public function addRentItem(Request $request) {
        RentItem::addRentItem($request);
    }

    public function updateRentItem(Request $request) {
        RentItem::updateRentItem($request);
    }

    public function deleteRentItem(Request $request) {
        RentItem::deleteRentItem($request);
    }

    public function getById($id) {
       return RentItem::getById($id);
    }

    public function getByLimit($limit) {
        return RentItem::getByLimit($limit);
    }

    public function getByProvince($province) {
        return RentItem::getByProvince($province);
    }

    public function search() {
        $province = request('province');
        $type = request('type');
        $amount = request('amount');
        return RentItem::search($province, $type, $amount);
    }

    public function addComment(Request $request) {
        return RentItem::addComment($request);
    }
}
