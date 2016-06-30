'use strict'

module.exports = function() { 
	//mesh 
	//v or horizontal rotation 
	const rotate = {

		//90, 0, 90
		horizontal: function (wall) {
			wall.rotation.set(Math.PI / 2, 0, Math.PI / 2)
		}, 
		verticalClockwise: function (wall) {
			wall.rotation.set(0, Math.PI / 2, Math.PI)
		}
		
	}

	return function (wallSize, wallHeight, material, orientation) {
			let wallGeometry = new THREE.BoxGeometry(wallSize, wallHeight, 1);
			let wall = new THREE.Mesh(wallGeometry, material);
			// console.log(orientation)
			rotate[orientation](wall);
			this.mesh = wall;
  		}
}
    
