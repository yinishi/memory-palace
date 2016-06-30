 module.exports = function(modalFactory, $scope, objectFactory, $window){

  $scope.objects = objectFactory.getObjects();

  $scope.setCurrentObject = function (object) {
    objectFactory.setCurrentObject(object);
  }
};