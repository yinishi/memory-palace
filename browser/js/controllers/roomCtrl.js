module.exports = function ($scope, modalFactory, objectFactory) {
	$scope.welcomeModal = modalFactory.getWelcomeControls();
  
      $scope.objects = objectFactory.getObjects()
      $scope.showCarousel = modalFactory.getCarousel()
	
  	$scope.setCurrentObject = function (object) {
	  objectFactory.setCurrentObject(object);
	}

  	$scope.toggle = function () {
  		modalFactory.turnOffWelcome()  		
  	}
  	$scope.getObjects = function () {
  		modalFactory.turnOffWelcome();
  		$scope.objects = objectFactory.getObjects();
  	}
}