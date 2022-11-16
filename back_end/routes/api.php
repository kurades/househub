<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\RentItemController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContractController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//authentication
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/loginWithGG',[AuthController::class, 'loginWithGG']);

Route::post('/user/resetPassword', [AuthController::class, 'resetPassword']);

Route::get('/rentItem', [RentItemController::class, 'getAllRentItems']);

Route::get('/rentItem/{id}', [RentItemController::class, 'getById']);

Route::get('/rentItem/province/{province}', [RentItemController::class, 'getByProvince']);

Route::get('/blog', [BlogController::class, 'getAllBlogs']);

Route::get('/blog/{id}', [BlogController::class, 'getById']);

Route::get('/blog/limit/{limit}', [BlogController::class, 'getByLimit']);

Route::get('/rentItem/limit/{limit}', [RentItemController::class, 'getByLimit']);

Route::get('/search', [RentItemController::class, 'search']);

Route::middleware('auth.jwt')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/contract',[ContractController::class, 'addContract']);

    Route::get('/user/contract',[ContractController::class, 'getUserContracts']);

    Route::post('/updateProfile', [AuthController::class, 'updateProfile']);

    Route::get('/userRentItems', [RentItemController::class, 'getAllUserRentItems']);

    Route::get('/userBlogItems', [BlogController::class, 'getAllUserBlogs']);

    Route::post('/rentItem', [RentItemController::class, 'addRentItem']);

    Route::delete('/rentItem' , [RentItemController::class, 'deleteRentItem']);

    Route::patch('/rentItem', [RentItemController::class, 'updateRentItem']);

    Route::get('/user/rentItem' , [RentItemController::class, 'getUserRentItems']);

    Route::post('/blog', [BlogController::class, 'addBlog']);

    Route::delete('/blog', [BlogController::class, 'deleteBlog']);

    Route::patch('/blog', [BlogController::class, 'updateBlog']);

    Route::get('/user/blog' , [BlogController::class, 'getUserBlogs']);

    Route::patch('/user/password', [AuthController::class, 'changePassword']);

    Route::post('rentItem/addComment', [RentItemController::class, 'addComment']);

    Route::middleware('admin')->group(function () {
        Route::prefix('admin')->group(function () {
            Route::get('/user', [AdminController::class, 'getAllUsers']);
            Route::get('/contract', [ContractController::class, 'getAllContracts']);
            Route::delete('/user', [AdminController::class, 'deleteUser']);
            Route::get('/report', [AdminController::class, 'getReport']);
        });  
    });
});




