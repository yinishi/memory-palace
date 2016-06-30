 module.exports = function($scope, objectFactory, $window){

  $scope.objects = objectFactory.getObjects();

  $scope.setCurrentObject = function (object) {
    objectFactory.setCurrentObject(object);
  };

  // $scope.numOfSlides = 6;
  // $scope.getSlidesNum = function() {
  // 	return $scope.numOfSlides;
  // }

 	// // $scope.numOfSlides = window.innerWidth > 768? 4 : 3;
 	// $window.addEventListener( 'resize', onWindowResize, false );

 	// function onWindowResize(){
 	// 	console.log('IT WORKS!', window.innerWidth);
 	// 	console.log($scope,'$cssope')
 	// 	if(window.innerWidth > 800){
 	// 		$scope.numOfSlides = 4;
 	// 	}else if(window.innerWidth > 700){
 	// 		$scope.numOfSlides = 3;
 	// 	}else{
 	// 		$scope.numOfSlides = 1;
 	// 	}
 	// 	$scope.$digest()
 	// 	console.log($scope.getSlidesNum())
 	// }
 	// window.on('resize', function(){
 	// 	console.log('resizing?');
 	// 	if(window.innerWidth > 800){
 	// 		$scope.numOfSlides = 4;
 	// 	}else if(window.innerWidth > 700){
 	// 		$scope.numOfSlides = 3;
 	// 	}else{
 	// 		$scope.numOfSlides = 1;
 	// 	}
 	// 	$evalAsync();
 	// });
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