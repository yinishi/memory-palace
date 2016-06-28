module.exports = function ($window) {
	return {
        restrict: 'E',
        scope: {
        },
        templateUrl: "/browser/js/templates/carousel.html",
        link: function (scope,el,attr) {
        	// var SLIDER = function () {
	        	var _SLIDER_WRAPPER_ = '.slider__wrapper';
				var _SLIDER_ITEM_ = '.slider__item';

				function getCSSValAsNum( el, cssProp ) {
					var styles = window.getComputedStyle( el );
					var val = styles[ cssProp ];
					var numVal = parseInt( val, 10 );
					if ( isNaN( numVal ) ) {
						return 0;
					}

					return numVal;
				}
				function getOuterWidth( el ) {
					var actualWidth = el.offsetWidth;
					var paddingLeft = getCSSValAsNum( el, "paddingLeft" );
					var paddingRight = getCSSValAsNum( el, "paddingRight" );
					var marginLeft = getCSSValAsNum( el, "marginLeft" );
					var marginRight = getCSSValAsNum( el, "marginRight" );

					return actualWidth + paddingLeft + paddingRight + marginLeft + marginRight;
				}
				function _startShow() {
					return setInterval(function() {
						this.wrapper.style.left = -1*this.current*this.slideWidth + "px";
						this.current++;

						if ( this.current === this.numItems ) {
							this.current = 0;
						}
					}.bind(this), 500);
				}
				function _addWrapper() {
					this.slider.innerHTML = "<div class='slider__wrapper'>"
											+ this.slider.innerHTML
											+ "</div>";	
				}
				function Slider( sliderClass ) {
					this.slider = document.querySelector( sliderClass );
					
					_addWrapper.call( this );

					var wrapperClass = sliderClass + ' ' + _SLIDER_WRAPPER_;
					var itemClass = sliderClass + ' ' + _SLIDER_ITEM_;

					this.wrapper = document.querySelector( wrapperClass );
					this.items = document.querySelectorAll( itemClass );

					this.slideWidth = getOuterWidth( this.items[ 0 ] );
					this.numItems = this.items.length;
					this.current = 0;
					this.intervalID = _startShow.call( this );
				} // the constructor function
			var sel = new Slider(".object-slider")
			console.log("el", el)

        }
    };
 };