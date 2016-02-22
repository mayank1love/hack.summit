<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class LocationController extends Controller
{
    public function viewlocation()
    {
        $loc = file_get_contents('http://freegeoip.net/json/');
        $loc = json_decode($loc);
        $lat = $loc->latitude;
        $lon = $loc->longitude;
        
        echo($lat.":".$lon);
    }
}
