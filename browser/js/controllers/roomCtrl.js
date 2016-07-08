module.exports = function ($scope,$window, modalFactory, objectFactory, messageFactory, storingFactory, palacesFactory) {
    $scope.welcomeModal = modalFactory.getWelcomeControls();
    $scope.loaded = function(){
      if(palacesFactory.palaceObjects.length >= 10){
        return true
      }
      else return false;
    }; 
    $scope.signIn = function(){
      modalFactory.turnOffWelcome();
      modalFactory.toggleLogin();
    }
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

    $scope.iframeHeight = window.innerHeight;

    console.log("height", $scope.iframeHeight)
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