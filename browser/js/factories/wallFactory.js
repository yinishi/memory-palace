'use strict'

module.exports = function() { 
	return {
		backWall: function (wallGeometry, wallSize, material) {
			let wallMaterial1 = new THREE.MeshBasicMaterial(material);
			let wall = new THREE.Mesh(wallGeometry, wallMaterial1);
			wall.rotation.set(0, Math.PI / 2, 0)
	  		wall.position.set(-wallSize, 0, wallSize / 2)
		},
		rightWall: function (wallGeometry, wallSize, material) {
			let wallMaterial1 = new THREE.MeshBasicMaterial(material);
			let wall = new THREE.Mesh(wallGeometry, wallMaterial1);
			wall.rotation.set(0, Math.PI / 2, 0)
	  		wall.position.set(-wallSize, 0, wallSize / 2)
		}
	}
}
    
