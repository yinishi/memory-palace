module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        templateUrl: '/browser/js/templates/about.html',
        link: function (s,a,e) {
        	s.showAbout = modalFactory.getAbout();
        }
    }
}