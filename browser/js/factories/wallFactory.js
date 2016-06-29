'use strict'

module.exports = function() { 
	var floorSize = 150
	var wallSize = floorSize / 2
	let wallGeometry = new THREE.BoxGeometry(wallSize, floorSize, 1);
	let doubleWallGeometry = new THREE.BoxGeometry(wallSize, (floorSize*3), 1);
	  
	var walls = {
		back: function (wallGeometry, material) {
		let wallMaterial1 = new THREE.MeshBasicMaterial(material);
		this.wall = new THREE.Mesh(wallGeometry, wallMaterial1);
		this.wall.rotation.set(0, Math.PI / 2, 0)
  		this.wall.position.set(-wallSize, 0, wallSize / 2)
  		}
	}

	return function (type, material) {
			return walls[type](material)
		}
}
    
