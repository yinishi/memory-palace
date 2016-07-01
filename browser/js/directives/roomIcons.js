module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/roomIcons.html',     
        link: function (s,a,e) {
            
        	s.toggleControls = modalFactory.toggleControls;

            s.toggleCarousel = function () {
                console.log("carousel!!", modalFactory.getCarousel)
                modalFactory.toggleCarousel();
            }
            
        }
    }
}


// ng-click="${toggleControls}"