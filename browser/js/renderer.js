'use strict'

const WIDTH = require("./constants").WIDTH;
const HEIGHT = require("./constants").HEIGHT;

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xf0f0f0 );
renderer.setSize( WIDTH, HEIGHT);


module.exports = renderer;