'use strict'
console.log("room")
// CONSTANTS
const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
const UNITSIZE = require("./constants").UNITSIZE;
// CONSTRUCTOR FUNCTIONS
const Room = require('./constructors/RoomConstructor.js')
const Table = require('./constructors/TableConstructor.js')
const cameraControls = require('./camera.js');
// REQUIRING OBJECTS
const camera = cameraControls.getCamera();


// CREATING SCENE
const scene = new THREE.Scene();

scene.add(camera);
// // CREATE A TABLE
let table = new Table().mesh

// CREATE A ROOM
let room = new Room().mesh
const roomRotationX = - Math.PI / 2 
const roomRotationY = 0
const roomRotationZ = -0.3
room.rotation.set(roomRotationX, roomRotationY, roomRotationZ)
room.scale.set(3, 3, 3)


scene.add(room)


// CUBE /////////////

var geomCube = new THREE.BoxGeometry(4, 4, 4);
var matCube = new THREE.MeshBasicMaterial({color: 0x000000})
var cube = new THREE.Mesh(geomCube, matCube);
 
table.position.set(0, -10, 6)
room.add(table)


// RENDERER
let renderer = require("./renderer");
renderer.render(scene, camera);

// CREATE CONTAINER
var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);

// CONTROLLS
window.addEventListener('wheel', e => wheelEvents(e));

function wheelEvents(event){
	if(event.deltaY > 0){
		cameraControls.moveForward();
		renderer.render(scene, camera);
	}else{
		cameraControls.moveBackward();
		renderer.render(scene, camera);
	}
}
 
$("body").keydown(function(e) {
	if(e.keyCode === 37) { //left
		cameraControls.moveLeft();
		renderer.render(scene, camera)
	}
	else if(e.keyCode === 39) { //right
		cameraControls.moveRight();
		renderer.render(scene, camera)
	}
	else if(e.keyCode === 38) { //up
		cameraControls.moveUp();
		renderer.render(scene, camera)
	}
	else if(e.keyCode === 40) { //down
		cameraControls.moveDown();
		renderer.render(scene, camera)
	}
	//look up //c
	else if (e.keyCode === 67) {
		cameraControls.lookUp();
		renderer.render(scene, camera);
	}
	//look down //x
	else if (e.keyCode === 88) {
		cameraControls.lookDown();
		renderer.render(scene, camera);
	}
	//look left //z
	else if (e.keyCode === 90) {
		cameraControls.lookLeft();
		renderer.render(scene, camera);
	}
	//look right //v
	else if (e.keyCode === 86) {
		cameraControls.lookRight();
		renderer.render(scene, camera);
	}

});

//resize image to fit screen
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}