<?php

namespace App\Models;

use App\Http\Controllers\ImageController;
use App\Http\Controllers\PaginationController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Blog extends Model
{
    use HasFactory;
    protected $collection = 'blogs';
    protected $fillable = [
        "userId",
        "views",
        "title",
        "description",
        "imageAddress",
        "content"
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userId');
    }

    public static function getAllBlogs() {
        $projections = ['id', 'imageAddress', 'description', 'title', 'created_at', 'views', 'userId'];
        $allBlogs = Blog::all($projections);
        $allBlogsWithUser = array();
        foreach($allBlogs as $blog) {
            $blog->user;
            array_push($allBlogsWithUser, $blog);
        }
        $allBlogsWithUser = array_reverse($allBlogsWithUser, true);
        $data = PaginationController::paginate($allBlogsWithUser, 6);
        return $data;
    }

    public static function addBlog(Request $request) {
       
        $document = json_decode($request->document);
        $image = $request->image;    
        $path = ImageController::saveFile($image);
        $user = Auth::user();
        $userId = $user['id'];
        $title = $document->title;
        

        $description = $document->description;
        $content = $document->content;    

        Blog::create([
            'userId' => $userId,
            'title' => $title,
            'content' => $content,
            'description' => $description,
            'imageAddress' => $path,
            'views' => 0
        ]);
    }

    public static function updateBlog(Request $request) {
        $id = $request->input('id'); 
        $title = $request->input('title');
        $content = $request->input('content');
        $description = $request->input('description');
        $blog = Blog::find($id);
        $blog->title = $title;
        $blog->description = $description;
        $blog->content = $content;
        $blog->save();
    }

    public static function deleteBlog(Request $request) {
        $id = $request->input('id');
        $blog = BLog::find($id);
        $blog->delete();
    }

    public static function getById($id) {
        $blog = Blog::find($id);
        $blog->views = $blog->views + 1;
        $blog->save();
        $blog->user;
        return $blog;
    }

    public static function getByLimit($limit) {
        $newBlogs= Blog::latest()->take(intval($limit))->get();
        $newBlogsUsers= array();
        foreach($newBlogs as $blog){
            $blog->user;
            array_push($newBlogsUsers, $blog);
        }
        return $newBlogsUsers;
    }

    public static function getUserBlogs() {
        $user = Auth::user();
        return PaginationController::paginate(array($user->getUserBlogs()->get()), 5) ;
    }
}
