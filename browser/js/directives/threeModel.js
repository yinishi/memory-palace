'use strict'

module.exports = function ($window, roomFactory, tableFactory) {
	 return {
        restrict: 'E',
        scope: {
        },
        link: function(s,e,a) {
			// CONSTANTS
			const WIDTH = $window.innerWidth;
			const HEIGHT = $window.innerHeight;
			const ASPECT = WIDTH / HEIGHT;
			const UNITSIZE = 250;
			// REQUIRING OBJECTS
			var objects = [];
			var isShiftDown = false;
			var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2();
			var myObject;

		//Add a teapot
		// instantiate a loader
		var loader = new THREE.ObjectLoader();

		loader.load('/browser/js/utah-teapot-threejs/utah-teapot.json', function(object){
			myObject = object
		});

		// CREATING SCENE
		const scene = new THREE.Scene();

		//ADDING LIGHT
		var ambientLight = new THREE.AmbientLight( 0x606060 );
		scene.add( ambientLight );
		var directionalLight = new THREE.DirectionalLight( 0xffffff );
		directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
		scene.add( directionalLight );

		//ADDING CAMERA
		let camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);
		camera.position.set(0, 0, 100);
		scene.add(camera);

		// CREATE A TABLE
		var tableInstance = new tableFactory();
		let table = tableInstance.container

		// CREATE A ROOM
		var roomInstance = new roomFactory();
		let room = roomInstance.container
		room.scale.set(3, 3, 3)
		scene.add(room);

		objects = objects.concat(roomInstance.objects)

		table.position.set(0, -10, 6)
		room.add(table)
		objects = objects.concat(tableInstance.objects);

		// RENDERER
		let renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0xf0f0f0 );
		renderer.setSize( WIDTH, HEIGHT);
		var render = function(){
			renderer.render(scene, camera);
		}

		render();

		// CREATE CONTAINER
		e[0].appendChild(renderer.domElement);
	


		//resize image to fit screen
		$window.addEventListener( 'resize', onWindowResize, false );

		function onWindowResize() {
			camera.aspect = $window.innerWidth / $window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( $window.innerWidth, $window.innerHeight );
		}

		//DROPPING OBJECTS
		e.bind("click", onDocumentMouseDown);
		// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		// document.addEventListener( 'keydown', onDocumentKeyDown, false );
		// document.addEventListener( 'keyup', onDocumentKeyUp, false );

		function onDocumentMouseMove( event ) {
			event.preventDefault();
			mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( objects );
			if ( intersects.length > 0 ) {
				var intersect = intersects[ 0 ];
				myObject.scale.set(.3, .3, .3)
				myObject.rotation.set(Math.PI/2, 0, 0)
				myObject.position.copy( intersect.point ).add( intersect.face.normal );
				myObject.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
				scene.add(myObject)
			}
			render();
		}
		function onDocumentMouseDown( event ) {
			console.log("heeey")
			event.preventDefault();
			mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( objects );
			if ( intersects.length > 0 ) {
				var intersect = intersects[ 0 ];
				// delete cube
				if ( isShiftDown ) {
					if ( !roomInstance.objects.includes(intersect.object) || !tableInstance.objects.includes(intersect.object)) {
						scene.remove( intersect.object );
						objects.splice( objects.indexOf( intersect.object ), 1 );
					}
				// create cube
				} else {
					// var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
					// voxel.position.copy( intersect.point ).add( intersect.face.normal );
					// voxel.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
					// scene.add( voxel );
					// objects.push( voxel );
					
						var myObject2 = myObject.clone();
						myObject2.scale.set(.3, .3, .3)
						myObject2.rotation.set(Math.PI/2, 0, 0)
						myObject2.position.copy( intersect.point ).add( intersect.face.normal );
						myObject2.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
						scene.add( myObject2 );
						objects.push( myObject2 );
				}
				render();
			}
		}
		function onDocumentKeyDown( event ) {
			switch( event.keyCode ) {
				case 16: isShiftDown = true; break;
			}
		}
		function onDocumentKeyUp( event ) {
			switch ( event.keyCode ) {
				case 16: isShiftDown = false; break;
			}
		}


        }
     }
}