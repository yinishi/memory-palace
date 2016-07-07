"use strict"

module.exports = function () {
	var showCarousel = { data: { true } };
	var showControls = { data: { false } };
	var welcomeControls = { data: { true } };
	var messageModal = { data: { false } };
	var showAbout = { data: { false } };
	var showLogin = { data: { false } };
	var showSignup = { data: { false } };
	
	var fac =  { 

		enableKeyEvents: true,

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
			if (messageModal.data) {
				fac.enableKeyEvents = false;
			} 
			else {
				fac.enableKeyEvents = true;
			}
			messageModal.data = !messageModal.data;
		},
		
		//about modal
		toggleAbout: () => {
    	showAbout.data = !showAbout.data
  	},
    getAbout: () => showAbout,

    
    getLogin: () => showLogin,

    
    getSignup: () => showSignup
	}

	//signup modal
    fac.toggleSignup = () => {
    	if (showSignup.data) {
				fac.enableKeyEvents = false;
			} 
			else {
				fac.enableKeyEvents = true;
			}
      showSignup.data = !showSignup.data;

    }
    //login modal
    fac.toggleLogin = () => {
    	if (showLogin.data) {
				fac.enableKeyEvents = false;
			} 
			else {
				fac.enableKeyEvents = true;
			}
      showLogin.data = !showLogin.data;

    }

    

	return fac;
}