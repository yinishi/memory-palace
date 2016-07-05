module.exports = function ($scope, modalFactory, objectFactory, textFactory, messageFactory, storingFactory) {
	$scope.welcomeModal = modalFactory.getWelcomeControls();
  
    $scope.objects = objectFactory.getObjects();
    $scope.showCarousel = modalFactory.getCarousel();
	  $scope.showModal = modalFactory.getMessageModal();
    $scope.sendMessage = function () {
      objectFactory.currentObject.message = $scope.message; 
      //CREATE TEXT
      if (objectFactory.currentObject.message) {
       var text = textFactory(messageFactory.getObject().myIntersect, objectFactory.currentObject.message);
       if(messageFactory.getObject().myObject.yPosition) text.position.y += messageFactory.getObject().myObject.yPosition;
       text.lookat(messageFactory.getObject().myCamera.position);
       messageFactory.getObject().myObject.messageMesh = text;
       messageFactory.getObject().myScene.add(text);
      }
    
      modalFactory.toggleMessageModal();
      storingFactory.storeMessage(messageFactory.getObject().myObject.position, $scope.message)
      $scope.message = null;
    }
  	$scope.setCurrentObject = function (object) {
  	  objectFactory.setCurrentObject(object);
      // modalFactory.toggleMessageModal();
	 }

  	$scope.toggle = function () {
  		modalFactory.turnOffWelcome();  		
  	}
  	$scope.getObjects = function () {
  		modalFactory.turnOffWelcome();
  		$scope.objects = objectFactory.getObjects();
  	}
}