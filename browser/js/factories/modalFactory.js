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
		},
		getCarousel: () => showCarousel,
		turnOffWelcome: function () {
			welcomeControls.data = false;
		},
		getWelcomeControls: () => welcomeControls,
		getMessageModal: () => messageModal,
		toggleMessageModal : () => {
			messageModal.data = !messageModal.data;
		}
	}
}