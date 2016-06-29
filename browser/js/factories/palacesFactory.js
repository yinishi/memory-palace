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
			let hallwayW = (wallSize+(wallSize/2))

			let wall4 = new wallFactory(wallSize, 150, woodtex, "horizontal").mesh;
			wall4.position.set(wallSize*2, -wallSize, wallSize / 2);

			let wall5 = new wallFactory(wallSize, (floorSize*2), material, "horizontal").mesh;
			//-150-75
		
			wall5.position.set(wallSize*2, (-hallwayW), wallSize / 2)
			wall5.material.side = THREE.BackSide;
			//bed room 

			let wall6 = new wallFactory(wallSize, floorSize*1.5, woodtex, "horizontal").mesh;

			wall6.position.set(wallSize*2.5, wallSize, wallSize / 2);
			//end wall
			let wall7 = new wallFactory(wallSize, floorSize+hallwayW, material, "verticalClockwise").mesh;

			wall7.position.set(wallSize*4, 0, wallSize / 2);

			mainRoom.container.add(wall4);
			mainRoom.container.add(wall5);
			mainRoom.container.add(wall6);
			mainRoom.container.add(wall7);
			this.palace = mainRoom;
		}
	}
	
	//mesh.material.side = THREE.BackSide;

}