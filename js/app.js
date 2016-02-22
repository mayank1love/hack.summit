$(document).ready(function () {


    });


var app = angular.module('MainApp', ['ngRoute','ngDialog','ja.qr','ngMap']);

app.config(function($routeProvider) {
        $routeProvider

            
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'MainController'
            })

            .when('/view', {
                templateUrl : 'pages/view.html',
                controller  : 'MainController'
            })

            .when('/edit', {
                templateUrl : 'pages/edit.html',
                controller: 'MainController'
            })

            .when('/create', {
                templateUrl : 'pages/create.html',
                controller: 'MainController'
            })

            .otherwise({redirectTo: '/'})

    });

app.controller('MainController', ['$scope','$location','$http','$window','ngDialog','NgMap', function($scope,$location,$http,$window,ngDialog,NgMap)
{
    
$scope.response = "";    
$scope.navv1 = "active";
$scope.navv2 = "active";
$scope.navv3 = "active";
$scope.navv4 = "active";

if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
 
function onPositionUpdate(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    $scope.lat = lat;
    $scope.lng = lng;
    
     var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
        $http.get(url)
        .then(function(result) {
            var address = result.data.results[2].formatted_address;
            $scope.address = address;
            reg.address.value = address;
        });
};



    
    $scope.createPrsnl = function()
    {
        
        
        if(mobile.value == "" || mpassword.value == "" || fname.value == "" || lname.value == "" || dob.value == "" || email.value == "" || address.value == "" || pin1.value == "" || pin2.value == "" || pin3.value == "")
            swal("Enter all the required values");
        else
        {
        
        
        $http({
            method  : 'POST',
            url     : 'http://158.85.191.252/prsnl/api/public/create',
            data    : $.param({
                cc: cc.value,
                mobile: mobile.value,
                mpassword: mpassword.value,
                fname: fname.value,
                lname: lname.value,
                dob: dob.value,
                sex: sex.value,
                email: email.value,
                address: address.value,
                twitter: twitter.value,
                facebook: facebook.value,
                gplus: gplus.value,
                linkedin: linkedin.value,
                instagram: instagram.value,
                youtube: youtube.value,
                pin1: pin1.value,
                pin2: pin2.value,
                pin3: pin3.value
                }),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
             })
            .success(function(data) {
                
                if(data.success == "registered")
                    {
                        swal("Success", "PrSnL Created", "success");
                        $location.path('/');
                    }
                else if (data.error == "exists")
                {
                    swal("Error", "PrSnL Already Exists", "error");
                    $location.path('/');   
                }
                else
                {
                    swal("Error", "Server Error Please Try Again", "error");
                    $location.path('/');
                }
                    
        
            });
        
        
        
        
        }
    };
    
    
    
    $scope.viewPrsnl = function()
    {
        if(mobile.value == "" || passphrase.value == "")
            swal("Enter all the required values");
        else
        {
             
             $http({
                method  : 'POST',
                url     : 'http://158.85.191.252/prsnl/api/public/view',
                data    : $.param({
                    cc: cc.value,
                    mobile: mobile.value,
                    passphrase: passphrase.value
                }),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
             })
            .success(function(data) {
                
                if(data.error == "pin")
                    swal("Error", "Wrong Passphrase", "error");
                else if(data.error == "mobile")
                    swal("Error", "Mobile not present", "error");
                else
                {
                    $scope.qr = 'BEGIN:VCARD\nVERSION:3.0\nN:'+data.lname+';'+data.fname+'\nTEL:+'+data.mobile+'\nADR:'+data.address+'\nBDAY:'+data.dob+'\nEMAIL:'+data.email+'\nEND:VCARD';
                    $scope.response = data;
                    ngDialog.open({
                    template: 'views/data_view.html',
                    scope: $scope
                    });
                }
                    
        
            });
        
        }
        
        
    };
    
    
    
    $scope.editPrsnl = function()
    {
        if(mobile.value == "" || mp.value == "")
            swal("Enter all the required values");
        else
        {
            $http({
                method  : 'POST',
                url     : 'http://158.85.191.252/prsnl/api/public/view/master',
                data    : $.param({
                    cc: cc.value,
                    mobile: mobile.value,
                    mp: mp.value
                }),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
             })
            .success(function(data) {
                
                if(data.error == "password")
                    swal("Error", "Wrong Master Password", "error");
                else if(data.error == "mobile")
                    swal("Error", "Mobile not present", "error");
                else
                {
                    $scope.response = data;
                    //$window.alert($scope.response.mobile);
                    ngDialog.open({
                    template: 'views/edit_view.html',
                    scope: $scope
                    });
                    
                }
        
            });
            
            
            
        }
    }
    
    
    
    
     $scope.editConfirmPrsnl = function()
    {
        if(mpassword.value == "" || fname.value == "" || lname.value == "" || dob.value == "" || email.value == "" || address.value == "")
            swal("Enter all the required values");
        else
        {
            $http({
                method  : 'POST',
                url     : 'http://158.85.191.252/prsnl/api/public/edit',
                data    : $.param({
                mobile: $scope.response.mobile,
                mpassword: mpassword.value,
                fname: fname.value,
                lname: lname.value,
                dob: dob.value,
                sex: sex.value,
                email: email.value,
                address: address.value,
                twitter: twitter.value,
                facebook: facebook.value,
                gplus: gplus.value,
                linkedin: linkedin.value,
                instagram: instagram.value,
                youtube: youtube.value,
                pin1: pin1.value,
                pin2: pin2.value,
                pin3: pin3.value
                }),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
             })
            .success(function(data) {
                $scope.response = data;
                if(data.error == "mpassword")
                {
                    swal("Error", "Wrong Master Password", "error");
                }
                    
                else if(data.error == "mobile")
                {
                    swal("Error", "Mobile not present", "error");   
                }
                else
                {
                    ngDialog.closeAll();
                    swal("Success", "PrSnL Edited", "success");
                }
        
            });
            
            
            
        }
    }
    
    
    $scope.deletePrsnl = function()
    {
        
        if(mpassword.value == "")
         swal("Enter all the required values");
         else
         {
            swal({   
            title: "Are you sure?",   
            text: "You will not be able to recover your PrSnL.",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false }, 
            function(){   
                
                
                $http({
                method  : 'POST',
                url     : 'http://158.85.191.252/prsnl/api/public/delete',
                data    : $.param({
                    mobile: $scope.response.mobile,
                    mpassword: mpassword.value
                 }),  // pass in data as strings
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                 })
                .success(function(data) {
                
                
                
                if(data.error == "mpassword")
                    swal("Error", "Wrong Master Password", "error");
                else if(data.success = "deleted")
                {
                    ngDialog.closeAll();
                    swal("Deleted!", "PrSnL Deleted.", "success");
                }
                else
                    swal("Error", "Please Try Again Later", "error");
        
        
            });
                
                
        });
        
         }
        
        
    }
    
    
    
    
    $scope.nav1 = function()
    {
        $scope.navv1 = "active";
        $scope.navv2 = "";
        $scope.navv3 = "";
        $scope.navv4 = "";
    }
    
    $scope.nav2 = function()
    {
        $scope.navv1 = "";
        $scope.navv2 = "active";
        $scope.navv3 = "";
        $scope.navv4 = "";
    }
    
    $scope.nav3 = function()
    {
        $scope.navv1 = "";
        $scope.navv2 = "";
        $scope.navv3 = "active";
        $scope.navv4 = "";
    }
    
    $scope.nav4 = function()
    {
        $scope.navv1 = "";
        $scope.navv2 = "";
        $scope.navv3 = "";
        $scope.navv4 = "active";
    }
    
    
    // $scope.qr = 'BEGIN:VCARD\nVERSION:3.0\nN:Verma;Mayank\nTEL:919453500846\nADR:add\nBDAY:1986-08-09\nEMAIL:maya@seg.com\nEND:VCARD';
                    
    //$window.alert("Hi");
    // $scope.string = 'BEGIN:VCARD\nN:Kowalchik;Michael\nORG:TenZeroLab\nTITLE:Founder\nEMAIL:mikepk@tenzerolab.com\nEND:VCARD';
    // $scope.size = 250;
    // $scope.correctionLevel = '';
    // $scope.typeNumber = 0;
    // $scope.inputMode = '';
    // $scope.image = true;
    
    
}]);
