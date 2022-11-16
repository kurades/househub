<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    public function getAllBlogs() {
        return Blog::getAllBlogs();
    }

    public function getAllUserBlogs() {
        $user = Auth::user();
        return $user->getAllUserBlogs()->get();
    }

    public function addBlog(Request $request) {
        return Blog::addBlog($request);
    }

    public function updateBlog(Request $request) {
        Blog::updateBlog($request);
    }

    public function deleteBlog(Request $request) {
        Blog::deleteBlog($request);
    }

    public function getById($id) {
        return Blog::getById($id);
    }

    public function getByLimit($limit) {
        return Blog::getByLimit($limit);
    }

    public function getUserBlogs() {
        return Blog::getUserBlogs();
    }
}
