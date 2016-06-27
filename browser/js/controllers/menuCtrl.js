 module.exports = function($scope, objectFactory){

  $scope.objects = objectFactory.getObjects();

  $scope.setCurrentObject = objectFactory.setCurrentObject;

};