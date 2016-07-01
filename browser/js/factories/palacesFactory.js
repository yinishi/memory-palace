'use strict'

module.exports = function(roomFactory, objectFactory, tableFactory, wallFactory){

	function defaultPalace() {
			const whiteStone = loadTexture('white-stone.jpg');
			const woodtex = loadTexture('wood-wall.jpg');
			const redCarpet = loadTexture('carpet_red.jpg');
			const wallHeight = 75;

			const load = objectFactory.load;

			this.objects = [];
			this.palace =  new THREE.Object3D();

			//BEDROOM 1
			var b1Outerwall1 = new wallFactory.Wall(150, wallHeight, whiteStone, false, false)
			.clockwiseY()
			.wall;
			b1Outerwall1.position.set(0,0,-75);
			this.addToScene(b1Outerwall1);

			var b1Outerwall2 = new wallFactory.Wall(150, wallHeight, whiteStone, false, true)
			.wall;
			b1Outerwall2.position.x = 75 - 0.5;
			b1Outerwall2.position.z = .5;
			this.addToScene(b1Outerwall2);

			var b1Door = new wallFactory.Wall(75, wallHeight, woodtex, true, false)
			.clockwiseY()
			.wall;
			b1Door.position.z = (-75/2);
			b1Door.position.x = (150 - 1);
			this.addToScene(b1Door);

			var b1Inner1 = new wallFactory.Wall(75.5, wallHeight, woodtex, false, false)
			.clockwiseY()
			.wall;
			b1Inner1.position.z = ((-75/2)- 75);
			b1Inner1.position.x = (150 - 1);

			this.addToScene(b1Inner1);

			var b1Inner2 = new wallFactory.Wall(75, wallHeight, woodtex, false, false)
			.wall;
			b1Inner2.position.z = (-150 -1);
			b1Inner2.position.x = (75/2 -.5);

			this.addToScene(b1Inner2);

			var b1InnerDoor = new wallFactory.Wall(75, wallHeight, woodtex, true, false)
			.wall;
			b1InnerDoor.position.z = (-150 -1);
			b1InnerDoor.position.x = ((75/2 -.5)+ 75);

			this.addToScene(b1InnerDoor);		

	}

	function loadTexture(file) {
		const texture = THREE.ImageUtils.loadTexture("./browser/textures/"+file);
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 2, 2 );
		let material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
		return material;
	};

	defaultPalace.prototype.addToScene = function(mesh) {
		this.objects.push(mesh);
		this.palace.add(mesh);
	};

	return {
		defaultPalace : defaultPalace
	};

};
