/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );

	var PI_2 = Math.PI / 2;

	var xEvent = 0;

	var onKeyDown = function ( event ) {

		if ( scope.enabled === false ) return;

		switch(event.keyCode){

			case 87: // w, look up
				xEvent++;
				console.log('b',pitchObject.rotation.x)
				// if(pitchObject.rotation.x >= .09){
						pitchObject.rotation.x += .05;
				// }else{
					
				// }
				console.log('c',pitchObject.rotation.x)
				break;
			case 83: // s, look down
				pitchObject.rotation.x -= 0.05;
				break;
			case 65: // a, look left
				yawObject.rotation.y += 0.05;
				break;
			case 68: // d, look right
				yawObject.rotation.y -= 0.05;
				break;
				}

		//check	180 deg, doesn't allow user to flip over	
		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	this.dispose = function() {

		document.removeEventListener( 'keydown', onKeyDown, false );

	};

	document.addEventListener( 'keydown', onKeyDown, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		};

	}();

};

module.exports = THREE.PointerLockControls