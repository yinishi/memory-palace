'use strict'
console.log("room")
// CONSTANTS
const THREE = require("three");
const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
const UNITSIZE = require("./constants").UNITSIZE;
const Room = require('./constructors/RoomConstructor.js')
const Table = require('./constructors/TableConstructor.js')
const cameraControls = require('./camera.js');
const camera = cameraControls.getCamera();
const MOVESPEED = 100;
const LOOKSPEED = 0.075;

require('three-first-person-controls')(THREE);

// CREATING SCENE
const scene = new THREE.Scene();

scene.add(camera);
// // CREATE A TABLE
let table = new Table().mesh

// CREATE A ROOM
let room = new Room().mesh
const roomRotationX = (- Math.PI / 2) +.75 
const roomRotationY = 0
const roomRotationZ = -0.3
// room.rotation.set(roomRotationX, roomRotationY, roomRotationZ)
room.scale.set(3, 3, 3)
// room.position.set(30,30,30)
console.log("room position", room.position)
scene.add(room)


// Table /////////////
table.position.set(0, -10, 6)
room.add(table)


// RENDERER
let renderer = require("./renderer");


// CREATE CONTAINER
var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);

// const controls = new THREE.FirstPersonControls(camera);
// // controls.lookVertical = false; 
// console.log(controls)

// function frame() {
// 	requestAnimationFrame(frame)
// 	controls.update(5)
// 	renderer.render(scene, camera);
// }
// frame()


// CONTROLLS
window.addEventListener('wheel', e => wheelEvents(e));

function wheelEvents(event){

	// console.log(event.deltaY);
	if(event.deltaY > 0){
		cameraControls.moveForward();
		renderer.render(scene, camera);
	}else{
		cameraControls.moveBackward();
		renderer.render(scene, camera);
	}
}
$("body").keydown(function(e) {
	console.log(camera.rotation.x)
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