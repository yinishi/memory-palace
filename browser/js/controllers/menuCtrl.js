 'use strict'
 module.exports = function(modalFactory, $scope, objectFactory, $window){
  //loadObjects.then(() => {$scope.showCarousel = modalFactory.getCarousel()});
 	$scope.showCarousel = modalFactory.getCarousel()
  	$scope.objects = objectFactory.getObjects();

	$scope.setCurrentObject = function (object) {
	  objectFactory.setCurrentObject(object);
	}

};

