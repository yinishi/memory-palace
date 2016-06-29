'use strict'

module.exports = function(roomFactory){
	//var room = 3 sides 
	var textureLoader = new THREE.TextureLoader();

	return {
		defaultPalace: function () {
			const texture = THREE.ImageUtils.loadTexture("./browser/textures/stone-wall.jpg", {}, function() {
			});
		
			console.log(texture)
			var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

			const wallSize = 75
			let wallGeometry = new THREE.BoxGeometry(wallSize, 150, 1);
	  

			const mainRoom = new roomFactory(150, material);
			const smallRoom = new roomFactory(75).container;
			smallRoom.position.set(120,0,0)

			

			// let wallMaterial4 = new THREE.MeshBasicMaterial({ color: "red" });
			let wall4 = new THREE.Mesh(wallGeometry, material)
			wall4.rotation.set(Math.PI / 2, 0, Math.PI / 2)
			wall4.position.set(wallSize*2, -wallSize, wallSize / 2);
			 
			mainRoom.container.add(smallRoom)
			mainRoom.container.add(wall4)
			// testroom.rotation.set(0,Math.PI / 2,0)
			// const smallRoom = new roomFactory(150);
			// const wallSize = 150 / 2
			this.palace = mainRoom;
		}
	}
	

}