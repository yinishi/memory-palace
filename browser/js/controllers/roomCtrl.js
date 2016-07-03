module.exports = function ($scope, modalFactory, objectFactory) {
	$scope.welcomeModal = modalFactory.getWelcomeControls();
  
    $scope.objects = objectFactory.getObjects();
    $scope.showCarousel = modalFactory.getCarousel();
	  $scope.showModal = modalFactory.getMessageModal();
    $scope.sendMessage = function () {
      objectFactory.currentObject.message = $scope.message;
      modalFactory.toggleMessageModal();
      $scope.message = null;
    }
  	$scope.setCurrentObject = function (object) {
  	  objectFactory.setCurrentObject(object);
      modalFactory.toggleMessageModal();
	 }

  	$scope.toggle = function () {
  		modalFactory.turnOffWelcome();  		
  	}
  	$scope.getObjects = function () {
  		modalFactory.turnOffWelcome();
  		$scope.objects = objectFactory.getObjects();
  	}
}