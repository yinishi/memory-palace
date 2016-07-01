"use strict"

module.exports = function (objectFactory) {
	var showCarousel = { data: { false } }
	var showControls = { data: { false } }
	var welcomeControls = { data: { true } };
	return { 
		toggleControls: function () {
			showControls.data = !showControls.data;
		},
		getControls: () => showControls, 
		toggleCarousel: function () {
			showCarousel.data = !showCarousel.data;
			console.log("currentObject", objectFactory.currentObject, "invsible", objectFactory.invisibleObject)
			objectFactory.previousObject = objectFactory.currentObject;
			objectFactory.currentObject = objectFactory.invisibleObject;
		},
		getCarousel: () => showCarousel,
		turnOffWelcome: function () {
			welcomeControls.data = false;
		},
		getWelcomeControls: () => welcomeControls
	}
}