module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/roomIcons.html',     
        link: function (s,a,e) {
            
        	s.toggleControls = function(){
                if(modalFactory.getAbout().data === false) modalFactory.toggleAbout();
                if(modalFactory.getCarousel().data === true) modalFactory.toggleCarousel();
                modalFactory.toggleControls();
            }

            s.toggleCarousel = function () {
                modalFactory.toggleCarousel();
                if(modalFactory.getControls().data === false) modalFactory.toggleControls();
            }
            
        }
    }
}