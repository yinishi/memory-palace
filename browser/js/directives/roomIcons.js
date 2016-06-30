module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        	
        },
        template: `<div class="roomIcons carousel carousel-container">
                     <div class="ctrlsIcon roomIcon"></div>
                     <div class="objectsIcon roomIcon"></div>
                 </div>`,
        link: function (s,a,e) {
        	s.showControls = modalFactory.getControls();
        }
    }
}