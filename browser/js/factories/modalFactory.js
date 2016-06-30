"use strict"

module.exports = function () {

	var showControls = { data: { false } }
	return { 
		toggleControls: function () {
			console.log("toggling before", showControls)
			showControls.data = !showControls.data;
			console.log("toggling after", showControls)
		},
		getControls: () => showControls
	}
}