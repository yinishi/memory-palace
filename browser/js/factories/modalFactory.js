"use strict"

module.exports = function () {
	var showCarousel = { data: { false } }
	var showControls = { data: { false } }
	var welcomeControls = { data: { true } };
	return { 
		toggleControls: function () {
			showControls.data = !showControls.data;
		},
		getControls: () => showControls, 
		toggleCarousel: function () {
			showCarousel.data = !showCarousel.data
		},
		getCarousel: () => showCarousel,
		turnOffWelcome: function () {
			console.log("befoer", welcomeControls)
			welcomeControls.data = false;
			console.log("after", welcomeControls)
		},
		getWelcomeControls: () => welcomeControls
	}
}