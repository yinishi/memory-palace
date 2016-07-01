"use strict"

module.exports = function () {
	var showCarousel = { data: { true } }
	var showControls = { data: { false } }
	return { 
		toggleControls: function () {
			showControls.data = !showControls.data;
		},
		getControls: () => showControls, 
		toggleCarousel: function () {
			console.log("befoer", this.showCarousel)
			showCarousel.data = !showCarousel.data
			console.log("after", showCarousel)
		},
		getCarousel: () => showCarousel
	}
}