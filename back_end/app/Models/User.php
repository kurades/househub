<?php

namespace App\Models;

use App\Http\Controllers\ImageController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\RentItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth as FacadesJWTAuth;
use Illuminate\Support\Facades\Http;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Support\Str;

class User extends Model implements AuthenticatableContract, JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, Authenticatable;

    protected $collection = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'imageAddress',
        'phone',
        'zalo',
        'fb',
        'address',
        'type'
    ];

    protected $hidden = [
        'password'
    ];

    public function getUserRentItems() {
        return $this->hasMany(RentItem::class, 'userID');
    }

    public function getUserBlogs() {
        return $this->hasMany(Blog::class, 'userId');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function login(Request $request) {
        $input = $request->only('email', 'password');
        $myTTL = 60; //minutes

        FacadesJWTAuth::factory()->setTTL($myTTL);
        if (!$token = FacadesJWTAuth::attempt($input)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        }

        return response()->json([
            'status' => true,
            'token' => $token,
            'user' => Auth::user()
        ]);
    }

    public static function register(Request $request) {
        $validator = User::validateUser($request);     
        if ($validator->fails()) {
            return response([$validator->getMessageBag()], Response::HTTP_BAD_REQUEST);   
        } else {
            $email = $request->input('email');
            $name = $request->input('name');
            $password = $request->input('password');
            $user = User::where('email', '=', $email)->first();    
            if ($user != null){
                return response(['message' => 'Email already exists'], Response::HTTP_CONFLICT);   
            }  
            else {
                User::createNewUser($name, $email, $password, null);
                return response(['message' => 'Success'], Response::HTTP_OK); 
            }
        }
    }

    public static function validateUser(Request $request) {
        return Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
            'repassword' => ['required', 'same:password']
        ]);
    }

    public static function createNewUser($name, $email, $password, $image) {
        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'imageAddress' => $image,
            'phoneNumber' => null,
            'type' => "user"
        ]);  
    }

    public static function loginWithGG(Request $request) { 
        $idToken = $request->input('id_token');
        $res = Http::get('https://oauth2.googleapis.com/tokeninfo?id_token='.$idToken);

        $email = $res->json()['email'];
        $name = $res->json()['name'];
        $image = $res->json()['picture'];

        $user = User::where('email', '=', $email)->first();
        if (!$user){
            User::createNewUser($name, $email, env('SECRET_PASS_FOR_GGLOGIN'), $image);
        }
        $myTTL = 60; //minutes
        FacadesJWTAuth::factory()->setTTL($myTTL);
        $token = FacadesJWTAuth::attempt(['email' => $email,'password' => env('SECRET_PASS_FOR_GGLOGIN')]);

        return response()->json([
            'status' => true,
            'token' => $token,
            'user' => Auth::user()
        ]);
    }

    public static function updateProfile(Request $request) {
        $user = Auth::user();
        $document = json_decode($request->document);
        $image = $request->image;    
        if ($image) {
            $path = ImageController::saveFile($image);
            $user->imageAddress = $path;
        }
        
        $name = $document->name;
        $phone = $document->phone;
        $zalo = $document->zalo;
        $fb = $document->fb;
        
        $user->name = $name;
        $user->phone = $phone;
        $user->zalo = $zalo;
        $user->fb = $fb;
        $user->save();
    }

    public static function deleteUser($request) {
        $id = $request->input("id");
        RentItem::where("userID", $id)->delete();
        Blog::where("userId", $id)->delete();
        $user = User::find($id);
        $user->delete();
    }

    public static function changePassword($request) {
        $email = $request->input("email");
        $id = $request->input("id");
        $oldPassword = $request->input("oldPassword");
        $newPassword = $request->input("newPassword");
        $user = User::find($id);
        if (strlen($newPassword) < 8) return response(['message' => 'Successfully'], Response::HTTP_BAD_REQUEST);
        if (FacadesJWTAuth::attempt(['email' => $email,'password' => $oldPassword])) {
            $user->password = Hash::make($newPassword);
            $user->save();
            return response(['message' => 'Successfully'], Response::HTTP_OK);
        } else {
            return response(['message' => 'Error'], Response::HTTP_NOT_FOUND);
        }
    }

    public static function generateUUID($length) {
        $random = '';
        for ($i = 0; $i < $length; $i++) {
          $random .= rand(0, 1) ? rand(0, 9) : chr(rand(ord('a'), ord('z')));
        }
        return $random;
    }

    public static function resetPassword($request) {
        require base_path("vendor/autoload.php");
        $email = $request->input("email");
        $user = User::where("email", $email)->first();
        if (!$user) {
            return response(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }
        
        $mail = new PHPMailer(true);  
        $newPass = User::generateUUID(10);
        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';         
            $mail->SMTPAuth = true;
            $mail->Username = 'househub2504@gmail.com'; 
            $mail->Password = '01254995675';   
            $mail->SMTPSecure = 'tls';               
            $mail->Port = 587;    
            $mail->setFrom('househub2504@gmail.com', 'HouseHub');
            $mail->addAddress($email);
            $mail->isHTML(true);                            
            $mail->Subject = 'Reset password';
            $mail->Body    = 'Mật khẩu mới của bạn là: '.$newPass;
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            if(!$mail->send() ) {
                return response(['message' => 'Error'], Response::HTTP_BAD_REQUEST);
            }      
            else {
                $user->password = Hash::make($newPass);
                $user->save();
                return response(['message' => 'Successfully'], Response::HTTP_OK);
            }
        } catch (Exception $e) {
            return response(['message' => 'Error'], Response::HTTP_BAD_REQUEST);
        }
    }
}
