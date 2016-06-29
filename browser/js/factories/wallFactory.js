'use strict'

module.exports = function() { 
	//mesh 
	//v or horizontal rotation 
	const rotate = {
		horizontal: function (wall) {
				wall.rotation.set(Math.PI / 2, 0, Math.PI / 2)
			}
		
	}

	return function (wallSize, wallHeight, material) {
			let wallGeometry = new THREE.BoxGeometry(wallSize, wallHeight, 1);
			let wall = new THREE.Mesh(wallGeometry, material);
			rotate.horizontal(wall);
			this.mesh = wall;
  		}
}
    
