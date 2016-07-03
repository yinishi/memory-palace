module.exports = function(wallFactory) {
	return function (floorSize, wallSize, material, material2, floorMaterial) {


	  this.container = new THREE.Object3D()
	  this.objects = [];

	  // var floorSize = 150
	  // var wallSize = 75
	  let hallwayW = (wallSize+(wallSize/2))
	  let floorGeometry = new THREE.PlaneBufferGeometry((floorSize*3)+hallwayW+40, floorSize+hallwayW);
	  // let floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
	  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	  

	  this.container.add(floor)
	  this.objects.push(floor);   

	  let wallGeometry = new THREE.BoxGeometry(wallSize, floorSize, 1);
	  // let doubleWallGeometry = new THREE.BoxGeometry(wallSize, (floorSize*3), 1);
	  let outerWallGeometry = new THREE.BoxGeometry(wallSize, (floorSize+hallwayW-40), 1);
	  
	  //purple
	  //let wallMaterial1 = new THREE.MeshBasicMaterial({ color: "purple" });
	  let wall1 = new THREE.Mesh(outerWallGeometry, material2)
	  wall1.rotation.set(0, Math.PI / 2, 0)
	  wall1.position.set(-wallSize, 0, wallSize / 2)
	  //green
	  //let wallMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	  let wall2 = new THREE.Mesh(wallGeometry, material2)
	  wall2.rotation.set(0, Math.PI / 2, Math.PI)
	  wall2.position.set(wallSize, 0, wallSize / 2)
	  // console.log("here test")
	  //blue
	  //let wallMaterial3 = new THREE.MeshBasicMaterial({ color: "blue" });
	  let wall3 = new THREE.Mesh(wallGeometry, material)
	  wall3.rotation.set(Math.PI / 2, 0, Math.PI / 2)
	  wall3.position.set(0, wallSize, wallSize / 2)
	  
	  this.container.add(wall1);
	  this.container.add(wall2);
	  this.container.add(wall3);
	  this.objects.push(wall3);
	  this.objects.push(wall2);
	  this.objects.push(wall1);
	  this.container.rotation.set(-Math.PI/2, 0, 0);
	}
}

