const THREE = require("three");
const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
let PI = Math.PI;

let positionX = 0;
let positionY = -70;
let positionZ = 40;

let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;
let fiveDegrees = (((PI/2)/3)/3)/2;
// 

let camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);

camera.position.set(positionX, positionY, positionZ);
camera.lookAt(new THREE.Vector3(0,0,0));
// camera.rotation.set(rotationX, rotationY, rotationZ);

function getCamera() {
	return camera;
}
function moveLeft() {
	camera.position.x-=3;
}
function moveRight() {
	camera.position.x+=3;
}
function moveUp() {
	if (camera.rotation.x < (PI/2)) {
		camera.position.z+=3;
	}
	else {
		camera.position.y+=3;
	}
}
function moveDown() {
	if (camera.rotation.x < (PI/2)) {
		camera.position.z-=3;
	}
	else {
		camera.position.y-=3;
	}
}
function lookDown() {
	//if (camera.rotation.x < (PI/2)) {
		camera.rotation.x-=fiveDegrees;

	//}
}
function lookUp() {
	//if (camera.rotation.x < (PI/2)) {
		camera.rotation.x+=fiveDegrees;
	//}
}
function lookLeft() {
	//if (camera.rotation.x < (PI/2)) {
		camera.rotation.y+=fiveDegrees;
		// camera.rotation.x+=fiveDegrees/2;
		//camera.rotation.z-=fiveDegrees/2;
	// }	
}
function lookRight() {

	camera.rotation.y-=fiveDegrees;
}
function moveForward(){
	if (camera.rotation.x < (PI/2)) {
		camera.position.y-=3;
	}
	else {
		camera.position.z+=3;
	}
}
function moveBackward(){
	if (camera.rotation.x < (PI/2)) {
		camera.position.y+=3;
	}
	else {
		camera.position.z+=3;
	}
}
//zoomout- increasing position z 
//zoomin- decreasing position z 

//move right //increasing x

//lookingleft //increase why
//look right 
//lookup //decrease z
//look down //increase z


module.exports = {
	getCamera: getCamera,
	moveLeft: moveLeft,
	moveRight: moveRight,
	moveUp: moveUp,
	moveDown: moveDown, 
	lookDown: lookDown,
	lookLeft: lookLeft,
	lookRight: lookRight,
	lookUp: lookUp,
	moveForward: moveForward,
	moveBackward: moveBackward
};





