module.exports = function (modalFactory) {
	 return {
        restrict: 'E',
        scope: {
        	
        },
        template: `<div class="roomIcons">
                 <div class="ctrlsIcon""></div>
                 </div>`,
        link: function (s,a,e) {
        	s.showControls = modalFactory.getControls();
        }
    }
}