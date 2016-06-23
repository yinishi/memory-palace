const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;
const ASPECT = WIDTH / HEIGHT;
//fov — Camera frustum vertical field of view.
//aspect — Camera frustum aspect ratio.
//near — Camera frustum near plane.
//far — Camera frustum far plane.

let camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);


camera.position.set(0, 0, 80);
// camera.rotation.set(floorX, floorY, floorZ);


module.exports = camera;