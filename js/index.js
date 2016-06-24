'use strict'
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
var objects = require("./constants").objects;

var isShiftDown = false;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var myObject;

//Add a teapot

// instantiate a loader
var loader = new THREE.ObjectLoader();

loader.load('js/utah-teapot-threejs/utah-teapot.json', function(object){
	myObject = object
});

// CREATING SCENE
const scene = new THREE.Scene();

scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

//ADDING LIGHT
var ambientLight = new THREE.AmbientLight( 0x606060 );
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
scene.add( directionalLight );

//ADDING CAMERA
const camera = cameraControls.getCamera();
scene.add(camera);

// controls
var PointerLockControls = require('./PointerLockControls.js')
var controls = new PointerLockControls(camera); // Handles camera control
scene.add( controls.getObject() );
var controlsEnabled = true;
controls.enabled = true;



var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

var onKeyDown = function ( event ) {

switch ( event.keyCode ) {

	case 38: // up
	case 87: // w
		moveForward = true;
		break;

	case 37: // left
	case 65: // a
		moveLeft = true; break;

	case 40: // down
	case 83: // s
		moveBackward = true;
		break;

	case 39: // right
	case 68: // d
		moveRight = true;
		break;

	case 32: // space
		if ( canJump === true ) velocity.y += 350;
		canJump = false;
		break;

}

};

var onKeyUp = function ( event ) {

switch( event.keyCode ) {

	case 38: // up
	case 87: // w
		moveForward = false;
		break;

	case 37: // left
	case 65: // a
		moveLeft = false;
		break;

	case 40: // down
	case 83: // s
		moveBackward = false;
		break;

	case 39: // right
	case 68: // d
		moveRight = false;
		break;

}

};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );



				function animate() {

				requestAnimationFrame( animate );

				if ( controlsEnabled ) {
					raycaster.ray.origin.copy( controls.getObject().position );
					raycaster.ray.origin.y -= 10;

					var intersections = raycaster.intersectObjects( objects );

					var isOnObject = intersections.length > 0;

					var time = performance.now();
					var delta = ( time - prevTime ) / 1000;

					velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;

					velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

					if ( moveForward ) velocity.z -= 400.0 * delta;
					if ( moveBackward ) velocity.z += 400.0 * delta;

					if ( moveLeft ) velocity.x -= 400.0 * delta;
					if ( moveRight ) velocity.x += 400.0 * delta;

					if ( isOnObject === true ) {
						velocity.y = Math.max( 0, velocity.y );

						canJump = true;
					}

					controls.getObject().translateX( velocity.x * delta );
					controls.getObject().translateY( velocity.y * delta );
					controls.getObject().translateZ( velocity.z * delta );

					if ( controls.getObject().position.y < 10 ) {

						velocity.y = 0;
						controls.getObject().position.y = 10;

						canJump = true;

					}

					prevTime = time;

				}

				renderer.render( scene, camera );

			}



// CREATE A TABLE
var tableInstance = new Table();
let table = tableInstance.container

// CREATE A ROOM
var roomInstance = new Room()
let room = roomInstance.container
const roomRotationX = - Math.PI / 2 
const roomRotationY = 0
const roomRotationZ = -0.3
// room.rotation.set(roomRotationX, roomRotationY, roomRotationZ)
room.scale.set(3, 3, 3)

scene.add(room)
objects = objects.concat(roomInstance.objects)

// // roll-over helpers
// var rollOverGeo = new THREE.BoxGeometry( 3, 3, 3 );
// var rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
// var rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
// scene.add( rollOverMesh );
// // cubes
// var cubeGeo = new THREE.BoxGeometry( 3, 3, 3 );
// var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c } );
 
table.position.set(0, -10, 6)
room.add(table)
objects = objects.concat(tableInstance.objects);

// RENDERER
let renderer = require("./renderer");
var render = function(){
	// controls.update()
	animate()
	renderer.render(scene, camera);
}
render();

// CREATE CONTAINER
var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);

// CONTROLLS
// window.addEventListener('wheel', e => wheelEvents(e));

// function wheelEvents(event){
// 	if(event.deltaY > 0){
// 		cameraControls.moveForward();
// 		renderer.render(scene, camera);
// 	}else{
// 		cameraControls.moveBackward();
// 		renderer.render(scene, camera);
// 	}
// }
 
// $("body").keydown(function(e) {
// 	if(e.keyCode === 37) { //left
// 		cameraControls.moveLeft();
// 		render();
// 	}
// 	else if(e.keyCode === 39) { //right
// 		cameraControls.moveRight();
// 		render();
// 	}
// 	else if(e.keyCode === 38) { //up
// 		cameraControls.moveUp();
// 		render();
// 	}
// 	else if(e.keyCode === 40) { //down
// 		cameraControls.moveDown();
// 		render();
// 	}
// 	//look up //c
// 	else if (e.keyCode === 67) {
// 		cameraControls.lookUp();
// 		render();
// 	}
// 	//look down //x
// 	else if (e.keyCode === 88) {
// 		cameraControls.lookDown();
// 		render();
// 	}
// 	//look left //z
// 	else if (e.keyCode === 90) {
// 		cameraControls.lookLeft();
// 		render();
// 	}
// 	//look right //v
// 	else if (e.keyCode === 86) {
// 		cameraControls.lookRight();
// 		render();
// 	}

// });

//resize image to fit screen
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

//DROPPING OBJECTS
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( objects );
	if ( intersects.length > 0 ) {
		var intersect = intersects[ 0 ];
		myObject.scale.set(.3, .3, .3)
		myObject.rotation.set(Math.PI/2, 0, 0)
		myObject.position.copy( intersect.point ).add( intersect.face.normal );
		myObject.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
		scene.add(myObject)
	}
	render();
}
function onDocumentMouseDown( event ) {
	event.preventDefault();
	mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( objects );
	if ( intersects.length > 0 ) {
		var intersect = intersects[ 0 ];
		// delete cube
		if ( isShiftDown ) {
			if ( !roomInstance.objects.includes(intersect.object) || !tableInstance.objects.includes(intersect.object)) {
				scene.remove( intersect.object );
				objects.splice( objects.indexOf( intersect.object ), 1 );
			}
		// create cube
		} else {
			// var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
			// voxel.position.copy( intersect.point ).add( intersect.face.normal );
			// voxel.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
			// scene.add( voxel );
			// objects.push( voxel );
			
				var myObject2 = myObject.clone();
				myObject2.scale.set(.3, .3, .3)
				myObject2.rotation.set(Math.PI/2, 0, 0)
				myObject2.position.copy( intersect.point ).add( intersect.face.normal );
				myObject2.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
				scene.add( myObject2 );
				objects.push( myObject2 );
		}
		render();
	}
}
function onDocumentKeyDown( event ) {
	switch( event.keyCode ) {
		case 16: isShiftDown = true; break;
	}
}
function onDocumentKeyUp( event ) {
	switch ( event.keyCode ) {
		case 16: isShiftDown = false; break;
	}
}