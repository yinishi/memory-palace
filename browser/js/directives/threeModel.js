'use strict'

module.exports = function ($window, roomFactory, tableFactory, $document) {
	 return {
        restrict: 'E',
        	scope: {
        },
        link: function(s,e,a) {
		
			/*  ESSENTIAL THREE.JS COMPONENTS */
			console.log(e, "e");
			// CONSTANTS
			const WIDTH = $window.innerWidth;
			const HEIGHT = $window.innerHeight * 0.93;
			const ASPECT = WIDTH / HEIGHT;
			const UNITSIZE = 250;

			// CREATING SCENE
			const scene = new THREE.Scene();
			// scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
		
			//ADDING LIGHT
			// var ambientLight = new THREE.AmbientLight( 0x606060 );
			// scene.add( ambientLight );
			var directionalLight = new THREE.DirectionalLight( 0xffffff );
			directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
			scene.add( directionalLight );

			//ADDING CAMERA
			let camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);
			camera.position.set(0, 0, 100);
			scene.add(camera);

			// CONTROLS
			var controls = new PointerLockControls(camera);
			scene.add( controls.getObject() );
			var controlsEnabled = true;
			controls.enabled = true;

			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;
			var canJump = false;

			var prevTime = performance.now();
			var velocity = new THREE.Vector3();

			var onKeyDown = function ( event ) {

				switch ( event.keyCode ) {

					case 38: // up
						event.preventDefault();
						moveForward = true;
						break;

					case 37: // left
						moveLeft = true; break;

					case 40: // down
						event.preventDefault();
						moveBackward = true;
						break;

					case 39: // right
						moveRight = true;
						break;

					case 32: // space
						if ( canJump === true ) velocity.y += 350;
						canJump = false;
						break;
				}

			};

			var onKeyUp = function ( event ) {

				switch( event.keyCode ) {

					case 38: // up
						event.preventDefault();
						moveForward = false;
						break;

					case 37: // left
						moveLeft = false;
						break;

					case 40: // down
						event.preventDefault();
						moveBackward = false;
						break;

					case 39: // right
						moveRight = false;
						break;

				}
			};

			document.addEventListener( 'keydown', onKeyDown, false );
			document.addEventListener( 'keyup', onKeyUp, false );

			// 3D CONTROLS - PointerLockControls
			function PointerLockControls ( camera ) {

				var scope = this;

				camera.rotation.set( 0, 0, 0 );

				var pitchObject = new THREE.Object3D();
				pitchObject.add( camera );

				var yawObject = new THREE.Object3D();
				yawObject.position.y = 10;
				yawObject.add( pitchObject );

				var PI_2 = Math.PI / 2;

				var onKeyDown = function ( event ) {

					if ( scope.enabled === false ) return;

					switch(event.keyCode){

						case 87: // w, look up
									pitchObject.rotation.x += .05;
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

			// RENDERER
			let renderer = new THREE.WebGLRenderer();
			renderer.setClearColor( 0xf0f0f0 );
			renderer.setSize( WIDTH, HEIGHT);

			function render() {

				requestAnimationFrame( render );

				if ( controlsEnabled ) {
					raycaster.ray.origin.copy( controls.getObject().position );
					raycaster.ray.origin.y -= 10;

					var intersections = raycaster.intersectObjects( objects );

					var isOnObject = intersections.length > 0;

					var time = performance.now();
					var delta = ( time - prevTime ) / 1000;

					velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;

					velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

					if ( moveForward ) velocity.z -= 400.0 * delta;
					if ( moveBackward ) velocity.z += 400.0 * delta;

					if ( moveLeft ) velocity.x -= 400.0 * delta;
					if ( moveRight ) velocity.x += 400.0 * delta;



					if ( isOnObject === true ) {
						velocity.y = Math.max( 0, velocity.y );

						canJump = true;
					}

					controls.getObject().translateX( velocity.x * delta );
					controls.getObject().translateY( velocity.y * delta );
					controls.getObject().translateZ( velocity.z * delta );

					if ( controls.getObject().position.y < 10 ) {

						velocity.y = 0;
						controls.getObject().position.y = 10;

						canJump = true;

					}

					prevTime = time;

				}

				renderer.render( scene, camera );

			}

			//RESIZE WINDOW
			$window.addEventListener( 'resize', onWindowResize, false );

			function onWindowResize() {
				camera.aspect = $window.innerWidth / $window.innerHeight * 0.9;
				camera.updateProjectionMatrix();
				renderer.setSize( $window.innerWidth, $window.innerHeight  * 0.9);
			}

			// CREATE CONTAINER
			e[0].appendChild(renderer.domElement);

			/* OBJETCS */

			// REQUIRING OBJECTS
			var objects = [];
			var isShiftDown = false;
			var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2();
			var myObject;

			// COLORFUL FLOOR
			var geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
			geometry.rotateX( - Math.PI / 2 );

			for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

				var vertex = geometry.vertices[ i ];
				vertex.x += Math.random() * 20 - 10;
				vertex.y += Math.random() * 2;
				vertex.z += Math.random() * 20 - 10;

			}

			for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

				var face = geometry.faces[ i ];
				face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

			}

			var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

			var mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );
			objects.push(mesh);
			var floorObjects = [mesh];

			// CREATE A TABLE
			var tableInstance = new tableFactory();
			let table = tableInstance.container;
			table.scale.set(5, 5, 5)

			// CREATE A ROOM
			var roomInstance = new roomFactory();
			let room = roomInstance.container;
			scene.add(room);

			objects = objects.concat(roomInstance.objects);

			table.position.set(0, 5, 6);
			room.add(table);
			objects = objects.concat(tableInstance.objects);

			//PLACING OBJECTS
			e.on( 'mousemove', onDocumentMouseMove);
			e.bind( 'mousedown', onDocumentMouseDown);
			// e.bind('dblclick', onDoubleClick);
			$document.on( 'keydown', onDocumentKeyDown);
			$document.on( 'keyup', onDocumentKeyUp);

			// TEAPOT
			var loader = new THREE.ObjectLoader();
			loader.load('/browser/js/monster.json', function(object){
				// myObject = object;
				// object.scale.set(.3, .3, .3);
				var cube = new THREE.Mesh(new THREE.BoxGeometry(19, 19, 5), new THREE.MeshBasicMaterial({visible: false}));
				cube.add(object);
				console.log('obj is', object)
				myObject = cube;

				// myObject = object;
				console.log('myObject', myObject);
				// myObject.rotation.set(Math.PI/2, 0, 0);
			});

			// test object - use if need to place sphere
			// myObject = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshLambertMaterial())

			// var loader = new THREE.JSONLoader();
			// loader.load('/browser/js/monster.json', function(geometry, materials){
			// 	var material = new THREE.MultiMaterial(materials);
			// 	var object = new THREE.Mesh(geometry, material);
			// 	myObject = object;
			// })

			// console.log('in the threemodel file', objects);
			// var elWidth = renderer.domElement.offsetWidth, elHeight = renderer.domElement.offsetHeight;
			function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.set( ( event.clientX / WIDTH ) * 2 - 1, - ( event.clientY / HEIGHT ) * 2 + 1 );
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( objects);
				if ( intersects.length > 0 ) {
					var intersect = intersects[ 0 ];
					myObject.position.copy( intersect.point ).add( intersect.face.normal );
					myObject.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
					scene.add(myObject);
				}
			}

			function onDocumentMouseDown( event ) {
			
				event.preventDefault();
				mouse.set( ( event.clientX / WIDTH ) * 2 - 1, - ( event.clientY / HEIGHT ) * 2 + 1 );
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( objects);
				console.log(intersects)
				if ( intersects.length > 0 ) {
					var intersect = intersects[ 0 ];
					// delete cube
					if ( isShiftDown ) {
						console.log(intersect.object, "intersect object", intersect, "intersect")
						if ( !roomInstance.objects.includes(intersect.object) && !tableInstance.objects.includes(intersect.object) && !floorObjects.includes(intersect.object)) {

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
							myObject2.position.copy( intersect.point ).add( intersect.face.normal );
							myObject2.position.divideScalar( 3 ).multiplyScalar( 3 ).addScalar( 3/2 );
							scene.add( myObject2 );
							console.log(myObject2, "myObject2");
							objects.push( myObject2 );
					}
				}
			}

		// 	//delete object
		// 	function onDoubleClick (event){
		// 		console.log("in double click")
		// 		event.preventDefault();
		// 		mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
		// 		raycaster.setFromCamera( mouse, camera );
		// 		var intersects = raycaster.intersectObjects( objects );
		// 		console.log(intersects)
		// 		if ( intersects.length > 0 ) {
		// 			var intersect = intersects[ 0 ];
		// 		if ( !roomInstance.objects.includes(intersect.object) && !tableInstance.objects.includes(intersect.object )) {
		// 					scene.remove( intersect.object );
		// 					objects.splice( objects.indexOf( intersect.object ), 1 );
		// 			}
		// 		}
		// }

			function onDocumentKeyDown( event ) {
				switch( event.keyCode ) {
					case 16: 
					isShiftDown = true; 
					console.log("shift pressed");
					break;
				}
			}
			function onDocumentKeyUp( event ) {
				switch ( event.keyCode ) {
					case 16: isShiftDown = false; break;
				}
			}

			// CALL RENDER FUNCTION
			render();
	    }
    };
};