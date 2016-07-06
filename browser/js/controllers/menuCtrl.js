 'use strict'
 module.exports = function(modalFactory, $scope, objectFactory){
 	$scope.showCarousel = modalFactory.getCarousel()
  	$scope.objects = objectFactory.getObjects();

	$scope.setCurrentObject = function (object) {
	  objectFactory.setCurrentObject(object);
	}

};

