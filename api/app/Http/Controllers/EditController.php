<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class EditController extends Controller
{
    
    
    public function editmaster()
    {
        
        $mobile = Request::input('mobile');
        $fname = Request::input('fname');
        $lname = Request::input('lname');
        $dob = Request::input('dob');
        $sex = Request::input('sex');
        $email = Request::input('email');
        $address = Request::input('address');
        $mpassword = Request::input('mpassword');
        $twitter = Request::input('twitter');
        $facebook = Request::input('facebook');
        $gplus = Request::input('gplus');
        $linkedin = Request::input('linkedin');
        $instagram = Request::input('instagram');
        $youtube = Request::input('youtube');
        $pin1 = Request::input('pin1');
        $pin2 = Request::input('pin2');
        $pin3 = Request::input('pin3');
        
        $conn = mysqli_connect("localhost","root","asdf","webapp") or die(json_encode(array('error' => 'db')));
        $result=mysqli_query($conn, "SELECT mpassword FROM users where mnumber='$mobile'");
        $found=mysqli_num_rows($result);

                 if($found==1)
                 {
                 $row=mysqli_fetch_assoc($result);
                
                 $mp = $row['mpassword'];
                 }
                 
        if(isset($mp))
        {
            if($mpassword == $mp)
            {
                $sql = "UPDATE users SET fname='$fname',lname='$lname',dob='$dob',sex='$sex',email='$email',address='$address',twitter='$twitter',facebook='$facebook',gplus='$gplus',linkedin='$linkedin',instagram='$instagram',youtube='$youtube',phrase1='$pin1',phrase2='$pin2',phrase3='$pin3' WHERE mnumber='$mobile'";
                //$sql = "INSERT INTO users VALUES ('$mobile','$fname','$lname','$dob','$sex','$email','$address','$mpassword','$twitter','$facebook','$gplus','$linkedin','$instagram','$pin1','$pin2','$pin3')";
                mysqli_query($conn, $sql);
                echo(json_encode(array('success' => 'edited')));
            }
            else
                echo(json_encode(array('error' => 'mpassword')));
        }
        else
            echo(json_encode(array('error' => 'mobile')));
            
        
    }


    public function deletemaster()
    {
        
        $mobile = Request::input('mobile');
        $mpassword = Request::input('mpassword');
        
        $conn = mysqli_connect("localhost","root","asdf","webapp") or die(json_encode(array('error' => 'db')));
        $result=mysqli_query($conn, "SELECT mpassword FROM users where mnumber='$mobile'");
        $found=mysqli_num_rows($result);

                 if($found==1)
                 {
                 $row=mysqli_fetch_assoc($result);
                
                 $mp = $row['mpassword'];
                 }
                 
        if(isset($mp))
        {
            if($mpassword == $mp)
            {
                $sql = "DELETE FROM users WHERE mnumber='$mobile'";
                mysqli_query($conn, $sql);
                echo(json_encode(array('success' => 'deleted')));
            }
            else
                echo(json_encode(array('error' => 'mpassword')));
        }
        else
            echo(json_encode(array('error' => 'true')));
        
        
        
    }

    
    
}
