"use strict"

module.exports = function () {
	var showCarousel = { data: { false } };
	var showControls = { data: { false } };
	var welcomeControls = { data: { true } };
	var messageModal = { data: { false } };
	var showAbout = { data: { false } };
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
		},
		toggleAbout: () => {
			console.log("here")
            showAbout.data = !showAbout.data
        },
        getAbout: () => showAbout
	}
}