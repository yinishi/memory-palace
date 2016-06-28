 module.exports = function($scope, objectFactory){

  $scope.objects = objectFactory.getObjects();

  $scope.setCurrentObject = function (objectName) {
    objectFactory.setCurrentObject(objectName);
  };
 	
  $scope.slickConfig = {
    enabled: true,
    autoplay: true,
    draggable: false,  
    autoplaySpeed: 3000,
    method: {},
    event: {
	        beforeChange: function (event, slick, currentSlide, nextSlide) {
	        },
	        afterChange: function (event, slick, currentSlide, nextSlide) {
	        }
	    }
	};
  
};