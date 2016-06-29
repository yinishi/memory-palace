module.exports = function(wallFactory) {
	return function (floorSize, material) {


	  this.container = new THREE.Object3D()
	  this.objects = [];

	  // var floorSize = 150
	  var wallSize = floorSize / 2
	  let floorGeometry = new THREE.PlaneBufferGeometry(floorSize, floorSize);
	  let floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
	  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	  
	  this.container.add(floor)
	  this.objects.push(floor);

	  let wallGeometry = new THREE.BoxGeometry(wallSize, floorSize, 1);
	  let doubleWallGeometry = new THREE.BoxGeometry(wallSize, (floorSize*3), 1);
	  let halfWallGeometry = new THREE.BoxGeometry(wallSize, (floorSize/2), 1);
	  

	  //purple
	  let wallMaterial1 = new THREE.MeshBasicMaterial({ color: "purple" });
	  let wall1 = new THREE.Mesh(wallGeometry, wallMaterial1)
	  wall1.rotation.set(0, Math.PI / 2, 0)
	  wall1.position.set(-wallSize, 0, wallSize / 2)
	  //green
	  let wallMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	  let wall2 = new THREE.Mesh(wallGeometry, wallMaterial2)
	  wall2.rotation.set(0, Math.PI / 2, Math.PI)
	  wall2.position.set(wallSize, 0, wallSize / 2)
	  //blue
	  console.log("here", material)
	  let wallMaterial3 = new THREE.MeshBasicMaterial({ color: "blue" });
	  let wall3 = new THREE.Mesh(wallGeometry, material)
	  wall3.rotation.set(Math.PI / 2, 0, Math.PI / 2)
	  wall3.position.set(0, wallSize, wallSize / 2)
	  //red
	  // let wallMaterial4 = new THREE.MeshBasicMaterial({ color: "red" });
	  // let wall4 = new THREE.Mesh(wallGeometry, wallMaterial4)
	  // wall4.rotation.set(Math.PI / 2, 0, Math.PI / 2)
	  // wall4.position.set(wallSize*2, -wallSize, wallSize / 2);
	  
	  // let wallMaterial5 = new THREE.MeshBasicMaterial({ color: "green" });
	  // let wall5 = new THREE.Mesh(doubleWallGeometry, wallMaterial5)
	  // wall5.rotation.set(Math.PI / 2, 0, Math.PI / 2)
	  // wall5.position.set(wallSize*2, (-wallSize+(-(wallSize/2))), wallSize / 2)

	  this.container.add(wall1);
	  this.container.add(wall2);
	  this.container.add(wall3);
	  // this.container.add(wall4);
	  // this.container.add(wall5);
	  this.objects.push(wall1);
	  this.container.rotation.set(-Math.PI/2, 0, 0);
	}
}

