<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Contract;
use App\Models\RentItem;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getAllUsers() {
        return PaginationController::paginate(array(User::all()), 10);
    }

    public function deleteUser(Request $request) {
        return User::deleteUser($request);
    }

    public function getReport() {
        $numOfUsers = User::all()->count();
        $numOfContracts = Contract::all()->count();
        $numOfRentItems = RentItem::all()->count();
        $numOfBlogs = Blog::all()->count();
        $countByMonth = ['m01' => 0, 'm02' => 0, 'm03' => 0,'m04' => 0,'m05' => 0,'m06' => 0,'m07' => 0,'m08' => 0,'m09' => 0,'m10' => 0,'m11' => 0,'m12' => 0];
        $rentItems = RentItem::all();
        foreach ($rentItems as $rentItem) {
            $date = $rentItem['created_at'];
            $year = substr($date, 0, 4);
            if (date("Y") == $year) {
                $month = substr($date, 5, 2);
                $countByMonth["m$month"] += 1;
            }
        }
        $blogs = BLog::all();
        foreach ($blogs as $blog) {
            $date = $blog['created_at'];
            $year = substr($date, 0, 4);
            if (date("Y") == $year) {
                $month = substr($date, 5, 2);
                $countByMonth["m$month"] += 1;
            }
        }
        return response()->json([
            'status' => true,
            'report' => [
                'numOfUsers' => $numOfUsers,
                'numOfContracts' => $numOfContracts,
                'numOfBlogs' => $numOfBlogs,
                'numOfRentItems' => $numOfRentItems,
                'countByMonth' => $countByMonth
            ]
        ]);
    }
}
