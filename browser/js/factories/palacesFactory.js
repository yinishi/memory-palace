'use strict'

module.exports = function(roomFactory){
	//var room = 3 sides 
	return {
		defaultPalace: function () {
			const mainRoom = new roomFactory(150);
			this.palace = mainRoom;
			// const smallRoom = new roomFactory(150);
			// const wallSize = 150 / 2
		}
	}
	

}