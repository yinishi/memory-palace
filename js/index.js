'use strict'
// console.log("hi")
const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
const UNITSIZE = require("./constants").UNITSIZE;
// const MOVESPEED = 100;
// const LOOKSPEED = 0.075;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 60, ASPECT, 1, 10000 );

camera.position.set( 0, 0, UNITSIZE*.2);
scene.add(camera);

let renderer = require("./renderer"); 

let floorGeometry = new THREE.PlaneBufferGeometry( 30, 30);
let floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc});
// floorGeometry.rotateX( - Math.PI / 2 );

let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.set( 2, -Math.PI / 2 - 1.7, 2 );
floor.position.set(0, -5, 0)

scene.add(floor);


renderer.render(scene, camera);
var container = document.createElement( 'div' );
document.body.appendChild( container );
container.appendChild( renderer.domElement );