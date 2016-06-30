module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        	
        },
        templateUrl: '/browser/js/templates/controlsModal.html',
        // link: function (s,a,e) {
        // 	s.show = modalFactory.getControls;
        // 	console.log("link ctrls", s.show)
        	
        // }
    }
}