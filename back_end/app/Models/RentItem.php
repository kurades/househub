<?php

namespace App\Models;

use App\Http\Controllers\ImageController;
use App\Http\Controllers\PaginationController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RentItem extends Model
{
    use HasFactory;
    protected $collection = 'rentItems';
    protected $fillable = [
        'userID',
        'amount',
        'type',
        'title',
        'imagesAddress',
        'address',
        'description',
        'people',
        'area',
        'views'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userID');
    }

    public static function addRentItem(Request $request) {
        $image1 = $request->image1;
        $image2 = $request->image2;
        $image3 = $request->image3;
        $document = json_decode($request->document);
        $path1 = ImageController::saveFile($image1);
        $path2 = ImageController::saveFile($image2);
        $path3 = ImageController::saveFile($image3);
        $user = Auth::user();
        $userID = $user['id'];
        $title = $document->title;
        $description = $document->description;
        $province = $document->province;
        $type = $document->type;
        $amount = $document->amount;
        $people = $document->people;
        $area = $document->area;
        $detailLocation = $document->detailLocation;

        RentItem::create([
            'userID' => $userID,
            'amount'=> $amount,
            'type' => $type,
            'title' => $title,
            'imagesAddress' => [
                'path1' => $path1,
                'path2' => $path2,
                'path3' => $path3
            ],
            'address' => [
                'detailLocation' => $detailLocation,
                'province' => $province,
            ],  
            'description' => $description,
            'people' => $people,
            'area' => $area,
            'views' => 0
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Successfully'
        ]);
    }

    public static function updateRentItem(Request $request) {
        $amount = $request->input('amount');
        $type = $request->input('type');
        $title = $request->input('title');
        $detailLocation = $request->input('detailLocation');
        $province = $request->input('province');
        $description = $request->input('description');
        $people = $request->input('people');
        $area = $request->input('area');
        $id = $request->input('id');
        $rentItem = RentItem::find($id);

        $rentItem->title = $title;
        $rentItem->type = $type;
        $rentItem->amount = $amount;
        $rentItem->description = $description;
        $rentItem->people = $people;
        $rentItem->area = $area;
        $rentItem->address = [
            'detailLocation' => $detailLocation,
            'province' => $province,
        ];
        $rentItem->save();
    }

    public static function deleteRentItem(Request $request) {
        $id = $request->input('id');
        $rentItem = RentItem::find($id);
        $rentItem->delete();
    }

    public static function getAllRentItems() {
        $allRentItems = RentItem::all();
        $allRentItemsWithUser = array();
        foreach($allRentItems as $rentItem) {
            $rentItem->user;
            array_push($allRentItemsWithUser, $rentItem);
        }
        $allRentItemsWithUser = array_reverse($allRentItemsWithUser, true);
        $data = PaginationController::paginate($allRentItemsWithUser, 6);
        return $data;
    }

    public static function getById($id) {
        $rentItem = RentItem::find($id);
        $rentItem->views = $rentItem->views + 1;
        $rentItem->save();
        $rentItem->user;
        return $rentItem;
    }

    public static function getByLimit($limit) {
        $newRentItems = RentItem::latest()->take(intval($limit))->get();
        $newRentItemsUsers = array();
        foreach($newRentItems as $rentItem){
            $rentItem->user;
            array_push($newRentItemsUsers, $rentItem);
        }
        return $newRentItemsUsers;
    }

    public static function getByProvince($province) {
        return RentItem::where("address.province", "like", "%".$province."%")->take(4)->get();
    }

    public static function getUserRentItems() {
        $user = Auth::user();
        return PaginationController::paginate(array($user->getUserRentItems()->get()),5);
    }

    public static function search($province, $type, $amount) {
        $allRentItems = RentItem::where('address.province', 'LIKE', "%$province%")
            ->where('type', $type)
            ->where('amount', "<=", $amount)->get();
        $allRentItemsWithUser = array();
        foreach($allRentItems as $rentItem) {
            $rentItem->user;
            array_push($allRentItemsWithUser, $rentItem);
        }
        $data = PaginationController::paginate($allRentItemsWithUser, 6);
        return $data;
    }

    public static function addComment($request) {
        $id = $request->input('id');
        $user = Auth::user();
        $message = $request->input('message');
        $rentItem = RentItem::find($id);
        $rentItem->push('comments', [
            'user'=> [
                "userID" => $user['id'],
                "name" => $user['name'],
                "imageAddress" => $user['imageAddress']
            ],
            'message' => $message,
            'created_at' => Carbon::now()->toDateTimeString()
        ]);
    }
}
