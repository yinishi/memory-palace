 module.exports = function(modalFactory, $scope, objectFactory, $window){

  $scope.objects = objectFactory.getObjects();
  $scope.showCarousel = function () {
  	modalFactory.getCarousel();
  	$scope.objects = objectFactory.getObjects();	
  }
  $scope.setCurrentObject = function (object) {
    objectFactory.setCurrentObject(object);
  }
  // $scope.showCarousel = function () {
  // 	console.log("carousel!!", modalFactory.getCarousel)
  // 	modalFactory.getCarousel()
  // }
};