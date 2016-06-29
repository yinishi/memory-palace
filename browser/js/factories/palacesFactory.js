'use strict'

module.exports = function(roomFactory, wallFactory){
	//var room = 3 sides 
	var loadTexture = function (file) {
		const texture = THREE.ImageUtils.loadTexture("./browser/textures/"+file);
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 2, 2 );
		let material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
		return material;
	}

	return {
		defaultPalace: function () {
			const material = loadTexture('white-stone.jpg')
			const woodtex = loadTexture('wood-wall.jpg')

			const floorSize = 150;
			const wallSize = floorSize/2
			
			const mainRoom = new roomFactory(floorSize, wallSize, material, woodtex);
			//bathroom?
			// const smallRoom = new roomFactory(wallSize, wallSize, material).container;
			// smallRoom.position.set(wallSize*3.5,-wallSize,0)

			//hallway
			let wall4 = new wallFactory(wallSize, 150, woodtex).mesh;
			wall4.position.set(wallSize*2, -wallSize, wallSize / 2);

			let wall5 = new wallFactory(wallSize, (floorSize*3), material).mesh;
			wall5.position.set(wallSize*2, (-wallSize+(-(wallSize/2))), wallSize / 2)
			wall5.material.side = THREE.BackSide;
			//bed room 
			let wall6 = new wallFactory(wallSize, floorSize*2, woodtex).mesh;
			wall6.position.set(wallSize*3, wallSize, wallSize / 2);

			mainRoom.container.add(wall4);
			mainRoom.container.add(wall5);
			mainRoom.container.add(wall6);
			this.palace = mainRoom;
		}
	}
	
	//mesh.material.side = THREE.BackSide;

}