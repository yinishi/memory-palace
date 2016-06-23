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

// REQUIRING OBJECTS
const camera = require('./camera.js')


// CREATING SCENE
const scene = new THREE.Scene();

scene.add(camera);
// // CREATE A TABLE
let table = new Table().mesh
console.log(table)

// CREATE A ROOM
let room = new Room().mesh
const roomRotationX = - Math.PI / 2 + 0.5
const roomRotationY = 0
const roomRotationZ = -0.3
room.rotation.set(roomRotationX, roomRotationY, roomRotationZ)
room.scale.set(3, 3, 3)


scene.add(room)


// CUBE /////////////

var geomCube = new THREE.BoxGeometry(4, 4, 4);
var matCube = new THREE.MeshBasicMaterial({color: 0x000000})
var cube = new THREE.Mesh(geomCube, matCube)

// room.add(cube)

table.position.set(0, -10, 6)
room.add(table)


// RENDERER
let renderer = require("./renderer");
renderer.render(scene, camera);

// CREATE CONTAINER
var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);
