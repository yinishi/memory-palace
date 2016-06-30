module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/roomIcons.html',     
        link: function (s,a,e) {
        	s.toggleControls = function () {
                modalFactory.toggleControls();
            }
            console.log(s.toggleControls )
        }
    }
}


// ng-click="${toggleControls}"