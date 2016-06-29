'use strict'

module.exports = function(roomFactory, objectFactory, tableFactory, wallFactory){
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
			const hallwayW = (wallSize+(wallSize/2))
			const load = objectFactory.load;
			//hallway
			//first room 
			let wall4 = new wallFactory(wallSize, 150, woodtex, "horizontal").mesh;
			wall4.position.set(wallSize*2, -wallSize, wallSize / 2);
			//outer wall
			let wall5 = new wallFactory(wallSize, (floorSize*2.5), material, "horizontal").mesh;
			wall5.position.set(wallSize*1.5, (-hallwayW), wallSize / 2)
			//wall5.material.side = THREE.BackSide;

			//bed room 
			let wall6 = new wallFactory(wallSize, floorSize*1.5, woodtex, "horizontal").mesh;
			wall6.position.set(wallSize*2.5, wallSize, wallSize / 2);

			//end wall
			let wall7 = new wallFactory(wallSize, (floorSize+hallwayW-40), material, "verticalClockwise").mesh;

			wall7.position.set(wallSize*4, 0, wallSize / 2);
			//table 
			var tableInstance = new tableFactory();
			let table = tableInstance.container;
			table.scale.set(5, 5, 5)
			table.position.set(0, -40, 20); 
			console.log("hereBED", load('./browser/objects/bed/bed.json', 15))
			load('./browser/objects/bean-bag/bean-bag.json', 15)
			.then(beanBag => { 
				console.log(beanBag)
				beanBag.scale.set(2,2,2);
				beanBag.position.set(wallSize*2,-(wallSize-20),0);
				beanBag.rotation.x = THREE.Math.degToRad(90);
				// beanBag.rotation.set(Math.PI/2, Math.PI/2, 0);  
				mainRoom.container.add(beanBag);
			});
			load('./browser/objects/bed/bed.json', 15)
			.then(bedObj => {      
				let bed = bedObj;
				bed.position.set(wallSize*2, 20, 10);
				bed.rotation.set(Math.PI/2, Math.PI/2, 0);  
				mainRoom.container.add(bed);
				// console.log("hereBED", bed);
			});

			mainRoom.container.add(table);
			mainRoom.objects = mainRoom.objects.concat(tableInstance.objects);
			mainRoom.container.add(wall4);
			mainRoom.container.add(wall5);
			mainRoom.container.add(wall6);
			mainRoom.container.add(wall7);
			

			this.palace = mainRoom;

		}
	}
	
	//mesh.material.side = THREE.BackSide;

}