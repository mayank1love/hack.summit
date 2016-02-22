<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class RegistrationController extends Controller
{
    public function index()
    {
        echo("Welcome to API");
    }
    
    public function create()
    {
        $conn = mysqli_connect("localhost","root","asdf","webapp") or die(json_encode(array('error' => 'db')));
        $cc = Request::input('cc');
        $mobile = Request::input('mobile');
        $mpassword = Request::input('mpassword');
        $fname = Request::input('fname');
        $lname = Request::input('lname');
        $dob = Request::input('dob');
        $sex = Request::input('sex');
        $email = Request::input('email');
        $address = Request::input('address');
        $twitter = Request::input('twitter');
        $facebook = Request::input('facebook');
        $gplus = Request::input('gplus');
        $linkedin = Request::input('linkedin');
        $instagram = Request::input('instagram');
        $youtube = Request::input('youtube');
        $pin1 = Request::input('pin1');
        $pin2 = Request::input('pin2');
        $pin3 = Request::input('pin3');
        $m = $cc.$mobile;
        
        $result=mysqli_query($conn, "SELECT * FROM users where mnumber='$m'");
        $found=mysqli_num_rows($result);

                 if($found > 0)
                 {
                 echo(json_encode(array('error' => 'exists')));
                 }
                 else
                 {
                    $sql = "INSERT INTO users VALUES ('$m','$fname','$lname','$dob','$sex','$email','$address','$mpassword','$twitter','$facebook','$gplus','$linkedin','$instagram','$youtube','$pin1','$pin2','$pin3')";
                    mysqli_query($conn, $sql);
                    echo(json_encode(array('success' => 'registered')));
                 }
        
    }
    
}
