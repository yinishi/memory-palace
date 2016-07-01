 'use strict'
 module.exports = function(modalFactory, $scope, objectFactory, $window){

  $scope.objects = objectFactory.getObjects();
  $scope.showCarousel = modalFactory.getCarousel();	
  	 	
  	console.log("ctrl", $scope.showCarousel)	


  $scope.setCurrentObject = function (object) {
    objectFactory.setCurrentObject(object);
  }

};

