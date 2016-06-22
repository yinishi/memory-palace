'use strict'
const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
const UNITSIZE = require("./constants").UNITSIZE;
const Room = require('./constructors/RoomConstructor.js')
const camera = require('./camera.js')

let scene = new THREE.Scene();

scene.add(camera);
let renderer = require("./renderer");


// floorGeometry.rotateX( - Math.PI / 2 );

// CREATE A ROOM
let room = new Room()
const roomRotationX = 2
const roomRotationY = -Math.PI / 2 - 1.7
const roomRotationZ = 2
room.mesh.rotation.set(roomRotationX, roomRotationY, roomRotationZ)
scene.add(room.mesh)


renderer.render(scene, camera);
var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);
