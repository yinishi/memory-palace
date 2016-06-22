const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;

let camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);


camera.position.set(0, 0, 80);
// camera.rotation.set(floorX, floorY, floorZ);


module.exports = camera;