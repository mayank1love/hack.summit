<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ViewController extends Controller
{
    public function viewuser()
    {
        $cc = Request::input('cc');
        $mobile = Request::input('mobile');
        $m = $cc.$mobile;
        $pin = Request::input('passphrase');
        
        $conn = mysqli_connect("localhost","root","asdf","webapp") or die(json_encode(array('error' => 'db')));
        
        $result=mysqli_query($conn, "SELECT * FROM users where mnumber='$m'");
        $found=mysqli_num_rows($result);

                 if($found==1)
                 {
                 $row=mysqli_fetch_assoc($result);
                
                 $pin1 = $row['phrase1'];
                 $pin2 = $row['phrase2'];
                 $pin3 = $row['phrase3'];
                 }
                 
        if(isset($pin1))
        {
            if($pin == $pin1)
                echo(json_encode(array('mobile' => $row['mnumber'], 'fname' => $row['fname'], 'lname' => $row['lname'], 'dob' => $row['dob'], 'sex' => $row['sex'], 'email' => $row['email'], 'address' => $row['address'])));
            elseif ($pin == $pin2) 
                echo(json_encode(array('mobile'=> $row['mnumber'], 'twitter' => $row['twitter'], 'facebook' => $row['facebook'], 'gplus' => $row['gplus'], 'linkedin' => $row['linkedin'], 'instagram' => $row['instagram'], 'youtube' => $row['youtube'])));
            elseif ($pin == $pin3)
                echo(json_encode(array('mobile' => $row['mnumber'], 'fname' => $row['fname'], 'lname' => $row['lname'], 'dob' => $row['dob'], 'sex' => $row['sex'], 'email' => $row['email'], 'address' => $row['address'], 'twitter' => $row['twitter'], 'facebook' => $row['facebook'], 'gplus' => $row['gplus'], 'linkedin' => $row['linkedin'], 'instagram' => $row['instagram'], 'youtube' => $row['youtube'])));
            else
                echo(json_encode(array('error' => 'pin')));
        }
        else
            echo(json_encode(array('error' => 'mobile')));
            
            
    }
    
    
    public function viewmaster()
    {
        $cc = Request::input('cc');
        $mobile = Request::input('mobile');
        $m = $cc.$mobile;
        $mpassword = Request::input('mp');
        
        $conn = mysqli_connect("localhost","root","asdf","webapp") or die(json_encode(array('error' => 'db')));
        
        $result=mysqli_query($conn, "SELECT * FROM users where mnumber='$m'");
        $found=mysqli_num_rows($result);

                 if($found==1)
                 {
                 $row=mysqli_fetch_assoc($result);
                
                 $mp = $row['mpassword'];
                 }
                 
        if(isset($mp))
        {
            if($mpassword == $mp)
                echo(json_encode(array('mobile' => $row['mnumber'], 'fname' => $row['fname'], 'lname' => $row['lname'], 'dob' => $row['dob'], 'sex' => $row['sex'], 'email' => $row['email'], 'address' => $row['address'], 'twitter' => $row['twitter'], 'facebook' => $row['facebook'], 'gplus' => $row['gplus'], 'linkedin' => $row['linkedin'], 'instagram' => $row['instagram'], 'youtube' => $row['youtube'], 'pin1' => $row['phrase1'], 'pin2' => $row['phrase2'], 'pin3' => $row['phrase3'])));
            else
                echo(json_encode(array('error' => 'password')));
        }
        else
            echo(json_encode(array('error' => 'mobile')));
            
            
    }
    
    
    
    
    
}
