module.exports = function (modalFactory){
  return {
        restrict: 'E',
        templateUrl: '/browser/js/templates/carousel.html',
        controller: 'menuCtrl'
        // link: function (s,a,e) {
        // 	s.showCarousel = modalFactory.getCarousel();	
        // } 
  }
}