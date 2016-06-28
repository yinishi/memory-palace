module.exports = function ($window, sliderFactory) {
	return {
        restrict: 'EA',
        scope: {
        	objects: "="
        },
        templateUrl: "/browser/js/templates/carousel.html",
        link: function (scope, el, attr) {
        	var Slider = sliderFactory;
			var sel = new Slider(".object-slider");
			var nextBtn = el.find(".next");
			var prevBtn = el.find(".prev");
			nextBtn.click(function() {
				var nextSlide = sel.current+1;
				sel.goToSlide(nextSlide, "left");
				console.log("next", sel.current)
			});
			prevBtn.click(function() {
				var prevSlide = sel.current-1;
				sel.goToSlide(prevSlide, "right");
				console.log("prev", sel.current)
			});
			console.log("el", el.find(".next"))
        }
    };
 };