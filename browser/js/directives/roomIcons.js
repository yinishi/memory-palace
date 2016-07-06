module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/roomIcons.html',     
        link: function (s,a,e) {
            
        	s.toggleControls = modalFactory.toggleControls;

            s.toggleCarousel = function () {
                modalFactory.toggleCarousel();
            }
            
        }
    }
}