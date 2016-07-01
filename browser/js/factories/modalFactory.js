"use strict"

module.exports = function (objectFactory) {
	var showCarousel = { data: { false } }
	var showControls = { data: { false } }
	var welcomeControls = { data: { true } };
	var messageModal = { data: { false } };
	return { 
		toggleControls: function () {
			showControls.data = !showControls.data;
		},
		getControls: () => showControls, 
		toggleCarousel: function () {
			showCarousel.data = !showCarousel.data;
			objectFactory.previousObject = objectFactory.currentObject;
			objectFactory.currentObject = objectFactory.invisibleObject;
		},
		getCarousel: () => showCarousel,
		turnOffWelcome: function () {
			welcomeControls.data = false;
		},
		getWelcomeControls: () => welcomeControls,
		getMessageModal: () => messageModal,
		toggleMessageModal : () => {
			console.log("happening")
			messageModal.data = !messageModal.data;
		}
		// open up input box
	}
}