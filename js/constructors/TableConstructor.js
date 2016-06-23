const THREE = require("three");

function Table() {
	this.mesh = new THREE.Object3D()

	var tabletopWidth = 6;
	var tabletopLength = 4;
	var tabletopHeight = 0.5;

	var legWidth = 0.5; 
	var legLength = 0.5;
	var legHeight = 4;

	var geomTop = new THREE.BoxGeometry(tabletopWidth, tabletopLength, tabletopHeight)
	var matTop = new THREE.MeshBasicMaterial({ color: 0x000000 });
	let tabletop = new THREE.Mesh(geomTop, matTop);

	var geomLeg = new THREE.BoxGeometry(legWidth, legLength, legHeight)
	var matLeg = new THREE.MeshBasicMaterial({ color: 0x000000 });
	
	let leg1 = new THREE.Mesh(geomLeg, matLeg);
	leg1.position.set(2, -1.5, -2)

	let leg2 = new THREE.Mesh(geomLeg, matLeg);
	leg2.position.set(2, 1.5, -2)


	let leg3 = new THREE.Mesh(geomLeg, matLeg);
	leg3.position.set(-2, -1.5, -2)

	let leg4 = new THREE.Mesh(geomLeg, matLeg);
	leg4.position.set(-2, 1.5, -2)

	this.mesh.add(tabletop);
	this.mesh.add(leg1);
	this.mesh.add(leg2);
	this.mesh.add(leg3);
	this.mesh.add(leg4);
}

module.exports = Table;