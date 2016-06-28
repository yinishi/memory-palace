module.exports = function () {
	return {
        restrict: 'E',
        scope: {
        	// text: "=",
        	cb: "&"
        },
        template: "<button ng-click='cb()'>text</button>"
    };
 };