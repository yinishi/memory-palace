"use strict"

module.exports = function () {
	var showCarousel = { data: { true } }
	var showControls = { data: { false } }
	var welcomeControls = { data: { true } }
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
		getCarousel: () => showCarousel,
		turnOffWelcome: function () {
			console.log("befoer", this.showCarousel)
			welcomeControls.data = false;
			console.log("after", showCarousel)
		},
		getWelcomeControls: () => welcomeControls
	}
}