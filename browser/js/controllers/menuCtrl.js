 module.exports = function($scope, objectFactory){

  $scope.objects = objectFactory.getObjects();
  $scope.setCurrentObject = function (objectName) {
    objectFactory.setCurrentObject(objectName);
  };
};