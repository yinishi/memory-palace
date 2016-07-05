'use strict'
//text2d
var THREE_Text = require('three-text2D')
var Text2D = THREE_Text.Text2D;
var textAlign = THREE_Text.textAlign;

module.exports = function (textFactory, palacesFactory, $window, roomFactory, objectFactory, shelfFactory,	$document, storingFactory, modalFactory, lightFactory, messageFactory) {
	 return {
        restrict: 'E',
        	scope: {
        },
        link: function(s,e,a) {
			// CONSTANTS
			var WIDTH = $window.innerWidth;
			var HEIGHT = $window.innerHeight;
			var ASPECT = WIDTH / HEIGHT;
			const UNITSIZE = 250;
			var PI_2 = Math.PI / 2;
			let objects = [];

			// CREATING SCENE
			const scene = new THREE.Scene();
			scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
		
			//ADDING LIGHT
			scene.add( lightFactory.ambientLight() );
			var directionalLight = lightFactory. directionalLight()
			scene.add( directionalLight );

			//ADDING CAMERA
			let camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);
			scene.add(camera);

			// CONTROLS
			var controls = new PointerLockControls(camera);
			objects.push(controls.getYawObject());
			scene.add( controls.getYawObject() );
			var controlsEnabled = true;
			controls.enabled = true;

			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;
			var canJump = false;

			var prevTime = performance.now();
			var velocity = new THREE.Vector3();

			// 3D CONTROLS - PointerLockControls
			function PointerLockControls ( camera ) {

				var scope = this;

				var pitchObject = new THREE.Object3D();
				pitchObject.add( camera );

				var yawObject = new THREE.Object3D();
				yawObject.add( pitchObject );
				pitchObject.position.y = 10;

				this.dispose = function() {
					document.removeEventListener( 'keydown', onKeyDown, false );
				};

				document.addEventListener( 'keydown', onKeyDown, false );

				this.enabled = false;

				this.getYawObject = function () {
					return yawObject;
				};

				this.getPitchObject = function () {
					return pitchObject;
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

			}

			// INITIALIZE RENDERER
			let renderer = new THREE.WebGLRenderer();
			renderer.setClearColor( 0x7ec0ee );
			renderer.setSize( WIDTH, HEIGHT);

			//RESIZE WINDOW
			$window.addEventListener( 'resize', onWindowResize, false );

			function onWindowResize() {
				// const w = renderer.domElement.offsetWidth, h = renderer.domElement.offsetHeight
				const w = $window.innerWidth, h = $window.innerHeight;
				// camera.aspect = $window.innerWidth / $window.innerHeight * 0.93;
				camera.aspect = w / h
				camera.updateProjectionMatrix();
				renderer.setSize(w, h)
				WIDTH = w
				HEIGHT = h
			}
			// SKYDOME
			var vertexShader = document.getElementById( 'vertexShader' ).textContent;
			var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
			var uniforms = {
				topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
				bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
				offset:		 { type: "f", value: 400 },
				exponent:	 { type: "f", value: 0.6 }
			};
			uniforms.topColor.value.set(0xaabbff);
			var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
			var skyMat = new THREE.ShaderMaterial( {
				uniforms: uniforms,
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				side: THREE.BackSide
			} );
			var sky = new THREE.Mesh( skyGeo, skyMat );
			scene.add( sky );

			// CREATE CONTAINER
			e[0].appendChild(renderer.domElement);

			/* OBJECTS */

			// setting up stacking capabilities
			var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2();

			// ORIGIN BOX
			var origin = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x000000}))
			scene.add(origin)

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
			mesh.position.y = -2;
			scene.add( mesh );
			objects.push(mesh);
			var floorObjects = [mesh];

			// CREATE A ROOM
			var palaceInstance = new palacesFactory.Palace();
			var palace = palaceInstance.palace;
			var walls = palaceInstance.objects;
			palace.position.set(-300,75/2 + 1,100);
			scene.add(palace);

			objects = objects.concat(palaceInstance.objects);
			
			// // DIAMOND SHELVES
			// var shelfInstance = new shelfFactory();
			// let shelf = shelfInstance.container;
			// shelf.position.set(10, 5, -170);
			// shelf.rotation.set(0, Math.PI / 2, 0);
			// scene.add(shelf);
			// objects = objects.concat(shelfInstance.objects);

			//RETRIVE STORED OBJECTS
			storingFactory.retrieveObjects()
			.then(function(items){
				if(Array.isArray(items)){
					items.forEach(function(item){
						objectFactory.load(`/browser/objects/${item.name}/${item.name}.json`, null, item.name)
							.then(obj => {
								objectFactory.setObjProps(obj, item)
								let text = obj.messageMesh;
								text.lookat(camera.position);
								scene.add(obj);
								scene.add(text);
								objects.push(obj);
						});
					});
				}
			});

			/////////////////////
			 // EVENT LIS
			/////////////////////

			e.on( 'mousemove', onDocumentMouseMove);
			e.on( 'mousedown', onDocumentMouseDown);
			e.on('wheel', onWheel);
			document.addEventListener( 'keydown', onKeyDown, false );
			document.addEventListener( 'keyup', onKeyUp, false );

			let messageShown = false;

			function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.set( ( event.clientX / WIDTH ) * 2 - 1, - ( event.clientY / HEIGHT ) * 2 + 1 );
				raycaster.setFromCamera( mouse, camera );
				let intersects = raycaster.intersectObjects(objects);

				// var wallIntersections = raycaster.intersectObjects( walls );
				
				if(messageShown){	
					messageShown.visible = false;
					messageShown = false;
				}
				// add check for if its in the wall
				if (intersects.length > 0) {
					if(intersects[0].object.messageMesh && !messageShown) {
						messageShown = intersects[0].object.messageMesh;
						messageShown.visible = true;
					}
					if(!objectFactory.currentObject) objectFactory.currentObject = objectFactory.invisibleObject; 
					var intersect = intersects[ 0 ];
					objectFactory.currentObject.position.copy( intersect.point ).add( intersect.face.normal );
					objectFactory.currentObject.position.addScalar( 3/2 );
					if(objectFactory.currentObject.yPosition) objectFactory.currentObject.position.y += objectFactory.currentObject.yPosition;
					if(objectFactory.previousObject) scene.remove(objectFactory.previousObject);
					scene.add(objectFactory.currentObject);
				}
			}

			function onDocumentMouseDown( event ) {

			if(modalFactory.getMessageModal().data){
				event.preventDefault();
				mouse.set( ( event.clientX / WIDTH ) * 2 - 1, - ( event.clientY / HEIGHT ) * 2 + 1 );
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( objects);
				var wallIntersections = raycaster.intersectObjects( walls );
				
				//add check for if its in the wall
				if ( intersects.length > 0 && wallIntersections.length<=1) {
					if (objectFactory.currentObject.messageMesh) {
						let messageMesh = objectFactory.currentObject.messageMesh
						let messageRayCaster = new THREE.Raycaster(messageMesh, camera);
						let messageIntersects = raycaster.intersectObjects( objects );
					}
					var intersect = intersects[ 0 ];
					// delete cube
					if ( event.originalEvent.shiftKey ) {
						if ( !palaceInstance.objects.includes(intersect.object) && !floorObjects.includes(intersect.object)) {
							
							scene.remove( intersect.object );
							storingFactory.deleteObject(intersect.object.storingId);
							objects.splice( objects.indexOf( intersect.object ), 1 );

						}
					// create cube
					} else {						
							if (objectFactory.currentObject.children.length > 0) {
								var myObject2 = objectFactory.currentObject.clone();
								myObject2.position.copy( intersect.point ).add( intersect.face.normal );
								myObject2.position.addScalar( 3/2 );
								if(objectFactory.currentObject.yPosition) myObject2.position.y += objectFactory.currentObject.yPosition;
								//TEXT

								messageFactory.rememberObject(myObject2, intersect.point, scene, camera)
								modalFactory.toggleMessageModal();

								scene.add( myObject2 );
								objects.push( myObject2 );
								storingFactory.storeObject({
									name: myObject2.name, 
									positionX: myObject2.position.x, 
									positionY: myObject2.position.y, 
									positionZ: myObject2.position.z,
									rotationX: myObject2.rotation.x,
									rotationY: myObject2.rotation.y,
									rotationZ: myObject2.rotation.z, 
									scaleX: myObject2.scale.x,
									scaleY: myObject2.scale.y,
									scaleZ: myObject2.scale.z
									// message: objectFactory.currentObject.message
								})
							}
							// exchanging object for invisible cube (invisble pointer)
							objectFactory.previousObject = objectFactory.currentObject;
							objectFactory.currentObject = objectFactory.invisibleObject;

					}
				}
			}
		}

			// useful codes: w = 87, s = 83, 32 = space, up = 38, down = 40, left = 37, right = 39
			function onKeyDown ( event ) {
				if(modalFactory.getMessageModal().data){
					switch ( event.keyCode ) {
						// exit modal
						case 27: // esc
							blocker.style.display = 'none';
							break;
						case 13: // enter
							blocker.style.display = 'none';
							break;

						// move forward
						case 38: // up arrow
							event.preventDefault();
							moveForward = true;
							break;
						case 87: // w
							moveForward = true;
							break;

						// move backward
						case 40: // down arrow
							event.preventDefault();
							moveBackward = true;
							break;
						case 83: // s
							moveBackward = true;
							break;

						// case 65: // a - move left
						// 	moveLeft = true;
						// 	break;

						// case 68: // d - move right
						// 	moveRight = true;
						// 	break;

						// jump
						case 32: // space - jump
							//event.preventDefault();
							if ( canJump === true ) velocity.y += 350;
							canJump = false;
							break;

						// looking up and down
						case 81: // q, look up
							controls.getPitchObject().rotation.x += 3 * Math.PI / 180;
							break;
						case 69: // e, look down
							controls.getPitchObject().rotation.x -= 3 * Math.PI / 180;
							break;

						// rotate right
						case 37: // right arrow
							event.preventDefault();
							controls.getYawObject().rotation.y += 3 * Math.PI / 180;
							break;
						case 65: // a
							//event.preventDefault();
							controls.getYawObject().rotation.y += 3 * Math.PI / 180;
							break;

						// rotate left
						case 39: // left arrow
							event.preventDefault();
							controls.getYawObject().rotation.y -= 3 * Math.PI / 180;
							break;
						case 68: // d
							//event.preventDefault();
							controls.getYawObject().rotation.y -= 3 * Math.PI / 180;
							break;

						//check	180 deg for looking up and down, doesn't allow user to flip over
						controls.getPitchObject().rotation.x = Math.max( - PI_2, Math.min( PI_2, controls.getPitchObject().rotation.x ) );
					}
				}
			}

			function onKeyUp (event) {
				if(modalFactory.getMessageModal().data){
					switch( event.keyCode ) {

						// reset move forward
						case 38: // up arrow
							moveForward = false;
							break;
						case 87: // w
							moveForward = false;
							break;

						// reset move backward
						case 40: // down arrow
							moveBackward = false;
							break;
						case 83: // s
							moveBackward = false;
							break;
					}
				}
			}

			function onWheel($event){
				$event.preventDefault();
				if(modalFactory.getMessageModal().data){
					var event = $event.originalEvent;
					if(event.ctrlKey === true){ //pinch
						var delta = -event.deltaY/2;
						var currentScale = objectFactory.currentObject.scale;
						objectFactory.currentObject
							.scale.set(currentScale.x + delta, currentScale.y + delta, currentScale.z + delta)
							.clamp(new THREE.Vector3( 0.1, 0.1, 0.1 ), new THREE.Vector3( 50, 50, 50 ))	;
					}else if(Math.abs(event.deltaX) > .1 ){ //two finger left and right scroll
						// $event.preventDefault();
						var delta = -event.deltaX/20;
						if(objectFactory.currentObject){
							objectFactory.currentObject.rotation.y += delta;
						}
					}
				}
			}		

			/////////////////////
			// RENDER FUNCTION 
			/////////////////////

			var raycasterCamera;
			var forward_vec = new THREE.Vector3(0, 0, -1);
			var backward_vec = new THREE.Vector3(0, 0, -1);
			// var left_vec = new THREE.Vector3(1, 0, 0);
			// var right_vec = new THREE.Vector3(-1, 0, 0);

			function render() {

				requestAnimationFrame( render );

				if ( controlsEnabled ) {

					// COLLISION DETECTION - FORWARD
					raycasterCamera = new THREE.Raycaster()
					raycasterCamera.ray.origin.copy( controls.getYawObject().position );
					raycasterCamera.setFromCamera(forward_vec, camera)
					raycasterCamera.ray.origin.z -= 1;
					var collisions = raycasterCamera.intersectObjects( scene.children, true );
					
					var collidingForward = collisions.length > 1;

					if (collidingForward && moveForward && collisions[0].distance < 15) {
						moveForward = false;
						velocity.x = 0;
						velocity.y = 0;
						velocity.z = 0;
					}

					// COLLISION DETECTION - BACKWARD
					raycasterCamera = new THREE.Raycaster()
					raycasterCamera.ray.origin.copy( controls.getYawObject().position );
					raycasterCamera.setFromCamera(backward_vec, camera)
					raycasterCamera.ray.origin.z += 5;
					var collisions = raycasterCamera.intersectObjects( scene.children, true );
					
					var collidingBackward = collisions.length > 1;

					if (collidingBackward && moveBackward && collisions[0].distance < 20) {
						moveBackward = false;
						velocity.x = 0;
						velocity.y = 0;
						velocity.z = 0;
					}
					/////////////////////////

					// REGULAR MOVEMENT
					
					var time = performance.now();
					var delta = ( time - prevTime ) / 1000;

					velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;

					velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

					if ( moveForward) velocity.z -= 400.0 * delta;
					if ( moveBackward) velocity.z += 400.0 * delta;

					if ( moveLeft ) velocity.x -= 400.0 * delta;
					if ( moveRight ) velocity.x += 400.0 * delta;

					// if ( isOnObject === true ) {
					// 	velocity.y = Math.max( 0, velocity.y );
					// 	canJump = true;
					// }

					controls.getYawObject().translateX( velocity.x * delta );
					controls.getYawObject().translateY( velocity.y * delta );
					controls.getYawObject().translateZ( velocity.z * delta );

					if ( controls.getYawObject().position.y < 10 ) {

						velocity.y = 0;
						controls.getYawObject().position.y = 10;

						canJump = true;

					}

					prevTime = time;

				}

				renderer.render( scene, camera );

			}

			render();
	    }
    };
};