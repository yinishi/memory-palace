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

//ADDING LIGHT
var ambientLight = new THREE.AmbientLight( 0x606060 );
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
scene.add( directionalLight );

//ADDING CAMERA
const camera = cameraControls.getCamera();
scene.add(camera);

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
	renderer.render(scene, camera);
}
render();

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
		render();
	}
	else if(e.keyCode === 39) { //right
		cameraControls.moveRight();
		render();
	}
	else if(e.keyCode === 38) { //up
		cameraControls.moveUp();
		render();
	}
	else if(e.keyCode === 40) { //down
		cameraControls.moveDown();
		render();
	}
	//look up //c
	else if (e.keyCode === 67) {
		cameraControls.lookUp();
		render();
	}
	//look down //x
	else if (e.keyCode === 88) {
		cameraControls.lookDown();
		render();
	}
	//look left //z
	else if (e.keyCode === 90) {
		cameraControls.lookLeft();
		render();
	}
	//look right //v
	else if (e.keyCode === 86) {
		cameraControls.lookRight();
		render();
	}

});

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