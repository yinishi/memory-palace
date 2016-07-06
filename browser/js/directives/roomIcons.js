module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/roomIcons.html',     
        link: function (s,a,e) {
            
        	s.toggleControls = function(){
                if(modalFactory.getAbout().data === false) modalFactory.toggleAbout();
                modalFactory.toggleControls();
            }

            s.toggleCarousel = function () {
                modalFactory.toggleCarousel();
            }
            
        }
    }
}