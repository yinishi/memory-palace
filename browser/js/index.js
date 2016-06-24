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

// Object loader
var objectLoader = require('./Objects.js');

var isShiftDown = false;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var myObject;

//Add a teapot

// instantiate a loader
var loader = new THREE.ObjectLoader();
objectLoader('js/utah-teapot-threejs/utah-teapot.json')
	.then(function(teapot){
		teapot.scale.set(.3, .3, .3)
		teapot.rotation.set(Math.PI/2, 0, 0)
		myObject = teapot;
	})

var ObjectTeapot = {item: 'js/utah-teapot-threejs/utah-teapot.json', positionx: -9.78849431, positiony: 10.4618582, positionz: 2.499999999 };
console.log(ObjectTeapot.item, "object");
objectLoader(ObjectTeapot.item)
	.then(function(teapot){
		teapot.scale.set(.3, .3, .3)
		teapot.rotation.set(Math.PI/2, 0, 0)
		teapot.position.set(ObjectTeapot.positionx, ObjectTeapot.positiony, ObjectTeapot.positionz)
		scene.add(teapot);
		render();
	})

// loader.load('js/utah-teapot-threejs/utah-teapot.json', function(object){
// 	object.scale.set(.3, .3, .3)
// 	object.rotation.set(Math.PI/2, 0, 0)
// 	myObject = object
// })

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

// renderer
let renderer = require("./renderer");

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
			moveForward = true;
			break;

		case 37: // left
			moveLeft = true; break;

		case 40: // down
			moveBackward = true;
			break;

		case 39: // right
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
			moveForward = false;
			break;

		case 37: // left
			moveLeft = false;
			break;

		case 40: // down
			moveBackward = false;
			break;

		case 39: // right
			moveRight = false;
			break;

	}
};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );


// floor

var geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
geometry.rotateX( - Math.PI / 2 );

for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

	var vertex = geometry.vertices[ i ];
	vertex.x += Math.random() * 20 - 10;
	vertex.y += Math.random() * 2;
	vertex.z += Math.random() * 20 - 10;

}

for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

	var face = geometry.faces[ i ];
	face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

}

var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
//objects.push(mesh);

// TEAPOT
var loader = new THREE.ObjectLoader();

loader.load('js/utah-teapot-threejs/utah-teapot.json', function(object){
	myObject = object
});

// CREATE A TABLE
var tableInstance = new Table();
let table = tableInstance.container

// CREATE A ROOM
var roomInstance = new Room()
let room = roomInstance.container
room.rotation.set(-Math.PI/2, 0, 0);
// room.position.set(0, -30, 0);
room.scale.set(30, 30, 30);

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


// CREATE CONTAINER
var container = document.createElement('div');
document.getElementById("world").appendChild(container);
console.log("hi")
container.appendChild(renderer.domElement);

//resize image to fit screen
// window.addEventListener( 'resize', onWindowResize, false );

// function onWindowResize() {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// }

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
		// myObject.scale.set(.3, .3, .3)
		// myObject.rotation.set(Math.PI/2, 0, 0)
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
				myObject2.position.copy( intersect.point ).add( intersect.face.normal );
				myObject2.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
				scene.add( myObject2 );
				objects.push( myObject2 );
				console.log(myObject2);
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


// RENDER EVERYTHING HERE

function render() {

	requestAnimationFrame( render );

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