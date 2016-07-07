module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/roomIcons.html',     
        link: function (s,a,e) {
            
        	s.toggleControls = function(){
                if(modalFactory.getAbout().data === false) modalFactory.toggleAbout();
                //if(modalFactory.getCarousel().data === true) modalFactory.toggleCarousel();
                if(modalFactory.getLogin().data === false) modalFactory.toggleLogin();
                if(modalFactory.getSignup().data === false) modalFactory.toggleSignup();
                modalFactory.toggleControls();
                s.showControls = !s.showControls;
            }

            s.toggleCarousel = function () {
                modalFactory.toggleCarousel();
                if(modalFactory.getControls().data === false) modalFactory.toggleControls();
                s.showCarousel = !s.showCarousel;
            }

            s.showControls = true;
            s.showCarousel = false;
            
        }
    }
}