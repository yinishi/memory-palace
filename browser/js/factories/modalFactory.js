"use strict"

module.exports = function () {
	var showCarousel = { data: { false } };
	var showControls = { data: { false } };
	var welcomeControls = { data: { true } };
	var messageModal = { data: { false } };
	var showAbout = { data: { false } };
	return { 

		// controls modal
		toggleControls: function () {
			showControls.data = !showControls.data;
		},
		getControls: () => showControls, 

		// carosel modal
		toggleCarousel: function () {
			showCarousel.data = !showCarousel.data;
		},
		getCarousel: () => showCarousel,
		turnOffWelcome: function () {
			welcomeControls.data = false;
		},

		// welcome page modal
		getWelcomeControls: () => welcomeControls,

		// message modal
		getMessageModal: () => messageModal,
		toggleMessageModal : () => {
			messageModal.data = !messageModal.data;
		},
		
		//about modal
		toggleAbout: () => {
			console.log("here")
            showAbout.data = !showAbout.data
        },
        getAbout: () => showAbout
	}
}