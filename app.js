'use strict'
var sf = angular.module('SpotiFynd', ['autocomplete']);

sf.controller('FyndController', function($scope, $http){

 	$scope.$watch('searchBox', function(){
 		if(angular.isDefined($scope.artistDetails)){	
 			snag();
 		}
 		else{
 		 $scope.artistDetails = "";	
 		}
 	});




function snag() {
 $http.get("https://api.spotify.com/v1/search?q=" + $scope.searchBox + "&type=artist")
 .then(function(response) {
          $scope.details = response.data;
          
          $scope.artistDetails = {thisArtist: []};
          $scope.albumDetails = {};
          $scope.items = $scope.details.artists.items;
          $scope.artistNames = [];



          for (var i=0; i< $scope.items.length; i++){
 		   $scope.artistNames = $scope.artistNames.concat($scope.items[i].name);
		}               
          
         	$scope.items.map(function(iteminfo){
         		$scope.artistDetails.thisArtist.push({
         			"name"	: iteminfo.name,
         			"id"		: iteminfo.id,
         			"image"		: angular.isDefined(iteminfo.images[0]) && iteminfo.images[0].url || "http://www.freeiconspng.com/uploads/spotify-icon-3.png"
         			         		});

         	$http.get("https://api.spotify.com/v1/artists/" + iteminfo.id + "/albums?limit=15")
         	.then(function(response){
         		$scope.albumResponse = response.data;
         		$scope.albumDetails = {thisAlbum: []};
				$scope.albumitems = $scope.albumResponse.items;

				$scope.albumitems.map(function(albumitemData){
         		$scope.albumDetails.thisAlbum.push({
         			"albumName"	: albumitemData.name,
         			"albumId"	: albumitemData.id,
         			"albumImage"		: angular.isDefined(albumitemData.images[0]) && iteminfo.images[0].url || "http://www.freeiconspng.com/uploads/spotify-icon-3.png"
         			
         			         		});

         	}) 

         	})
         	 
          	 
          })
          
          $scope.artists = $scope.artistNames;
                        

        $scope.updateArtists = function(typed){
            $scope.newmovies =  $scope.artistNames;      
          
        }
 }
 )}


  $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }

});




