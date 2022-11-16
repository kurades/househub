<?php

namespace App\Models;

use App\Http\Controllers\PaginationController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $collection = 'contracts';
    protected $fillable = [
        "userId1",
        "userId2",
        "rentItemId",
        "rent",
        "period",
        "terms"
    ];

    public function user1() {
        return $this->belongsTo(User::class, 'userId1');
    }

    public function user2() {
        return $this->belongsTo(User::class, 'userId2');
    }

    public static function addContract($request) {
        $user = Auth::user();
        $userId1 = $user['id'];
        $userId2 = $request->input("userId2");
        $rent = $request->input("rent");
        $rentItemId = $request->input("rentItemId");
        $period = $request->input("period");

        Contract::create([
            "userId1" => $userId1,
            "userId2" => $userId2,
            "rent" => $rent,
            "rentItemId" => $rentItemId,
            "period" => $period,
            "terms" => true
        ]);
    }

    public static function getAllContracts() {
        $contracts = Contract::all();
        foreach($contracts as $contract) {
            $contract->user1;
            $contract->user2;
        }
        return PaginationController::paginate(array($contracts),5);
    }

    public static function getUserContracts() {
        $user = Auth::user();
        $userID = $user['id'];
        $contracts = Contract::where('userId1', $userID)->orWhere('userId2', $userID)->get();
        foreach($contracts as $contract) {
            $contract->user1;
            $contract->user2;
        }
        return PaginationController::paginate(array($contracts),5);
    }
}
