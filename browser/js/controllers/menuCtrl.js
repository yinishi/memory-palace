 module.exports = function($scope, objectFactory){

  $scope.objects = objectFactory.getObjects();
  $scope.setCurrentObject = function (obj) {
      console.log('inscope', obj)
      objectFactory.setCurrentObject(obj);
  }
}