'use strict'

module.exports = function() {
	return {
		ambientLight: function () {
			return new THREE.AmbientLight( 0x606060 );
		},
		directionalLight: function () {
			let directionalLight = new THREE.DirectionalLight( 0xaabbff, 2);
			directionalLight.position.set( 1, .75, .5 ).normalize();
			return directionalLight;
		}
	}
}