 module.exports = function($scope, objectFactory){

  $scope.objects = objectFactory.getObjects();

  $scope.setCurrentObject = function (object) {
    objectFactory.setCurrentObject(object);
  };
 	
 //  $scope.slickConfig = {
 //    enabled: true,
 //    autoplay: false,
 //    draggable: false, 
 //    centerMode: true, 
 //    adaptiveHeight: true,
 //    autoplaySpeed: 3000,
 //    method: {},
 //    event: {
	//         beforeChange: function (event, slick, currentSlide, nextSlide) {
	//            console.log(event)
 //          },
	//         afterChange: function (event, slick, currentSlide, nextSlide) {
	//         }
	//     }
	// };
  
};