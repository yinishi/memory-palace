 module.exports = function($scope, objectFactory){

  $scope.objects = objectFactory.getObjects();

  $scope.setCurrentObject = function (object) {
    objectFactory.setCurrentObject(object);
  };

  
};