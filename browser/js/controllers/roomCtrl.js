module.exports = function ($scope, modalFactory, objectFactory, messageFactory, storingFactory) {
	$scope.welcomeModal = modalFactory.getWelcomeControls();
  
    $scope.objects = objectFactory.getObjects();
    $scope.showCarousel = modalFactory.getCarousel();
	  $scope.showModal = modalFactory.getMessageModal();
    $scope.sendMessage = function () {
      objectFactory.currentObject.message = $scope.message; 
      if (objectFactory.currentObject.message) {
       messageFactory.getObject().message = objectFactory.currentObject.message;
      }
      modalFactory.toggleMessageModal();
      storingFactory.storeMessage(messageFactory.getObject().position, $scope.message)
      $scope.message = null; 
    }

  	$scope.setCurrentObject = function (object) {
  	  objectFactory.setCurrentObject(object);
	  }

  	$scope.toggle = function () {
  		modalFactory.turnOffWelcome();  		
  	}
  	$scope.getObjects = function () {
  		modalFactory.turnOffWelcome();
      modalFactory.toggleCarousel();
  		$scope.objects = objectFactory.getObjects();
  	}
}