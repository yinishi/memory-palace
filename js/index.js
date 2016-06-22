'use strict'
// console.log("hi")
const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
const UNITSIZE = require("./constants").UNITSIZE;
// const MOVESPEED = 100;
// const LOOKSPEED = 0.075;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);

 camera.position.set(0, 0, 80);
// camera.position.set(20, 20, 80);
// camera.rotation.set(0, 0, 0);
console.log(camera.rotation)
scene.add(camera);

let renderer = require("./renderer");

 const floorX = 2
    const floorY = -Math.PI / 2 - 1.7
    const floorZ = 2

// floorGeometry.rotateX( - Math.PI / 2 );
function Room() {
    this.mesh = new THREE.Object3D()

    let floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
    let floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.mesh.add(floor)

    let wallGeometry = new THREE.PlaneBufferGeometry(15, 30);
    let wallMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let wall1 = new THREE.Mesh(wallGeometry, wallMaterial1)
    wall1.rotation.set(0, Math.PI/2, 0)
    wall1.position.set(-15, 0, 15/2)

	let wallMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let wall2 = new THREE.Mesh(wallGeometry, wallMaterial2)
    wall2.rotation.set(0, Math.PI/2, 0)
    wall2.position.set(15, 0, 15/2)

    let wallMaterial3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    let wall3 = new THREE.Mesh(wallGeometry, wallMaterial3)
    wall3.rotation.set(Math.PI/2, 0, Math.PI/2)
    wall3.position.set(0, 15, 15/2)
    
    // let wall3 = new THREE.Mesh(wallGeometry, wallMaterial)
    // wall3.rotation.set(0, Math.PI/2, 0)
    // wall3.position.set(0, -15, 15)

    this.mesh.add(wall1)
    this.mesh.add(wall2)
    this.mesh.add(wall3)

}

let room = new Room()
room.mesh.rotation.set(floorX, floorY, floorZ)
scene.add(room.mesh)
// floor.rotation.set(floorX, floorY, floorZ);



// scene.add(floor);
console.log(room)


renderer.render(scene, camera);
var container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);
