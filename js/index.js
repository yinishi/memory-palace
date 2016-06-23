'use strict'
console.log("room")
// CONSTANTS
const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
const UNITSIZE = require("./constants").UNITSIZE;
// CONSTRUCTOR FUNCTIONS
const Room = require('./constructors/RoomConstructor.js')
// REQUIRING OBJECTS
const camera = require('./camera.js')


// CREATING SCENE
const scene = new THREE.Scene();

scene.add(camera);

// CREATE A ROOM
let room = new Room()
const roomRotationX = 2
const roomRotationY = -Math.PI / 2 - 1.7
const roomRotationZ = 2
room.mesh.rotation.set(roomRotationX, roomRotationY, roomRotationZ)
scene.add(room.mesh)

// RENDERER
let renderer = require("./renderer");
renderer.render(scene, camera);

// CREATE CONTAINER
var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);
