module.exports = function ($scope, modalFactory, objectFactory) {
	$scope.welcomeModal = modalFactory.getWelcomeControls();
	
  	
  	$scope.toggle = function () {
  		modalFactory.turnOffWelcome()
  		$scope.showCarousel = modalFactory.getCarousel()
  		$scope.objects = objectFactory.getObjects();
  	}
  	$scope.getObjects = function () {
  		modalFactory.turnOffWelcome();
  		$scope.objects = objectFactory.getObjects();
  	}
}