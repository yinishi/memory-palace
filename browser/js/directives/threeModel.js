'use strict'

module.exports = function(palacesFactory, $window, objectFactory, storingFactory, modalFactory, lightFactory, messageFactory, constantsFactory) {
  return {
    restrict: 'E',
    scope: {},
    link: function(s, e, a) {
      // CONSTANTS
      var WIDTH = $window.innerWidth;
      var HEIGHT = $window.innerHeight;
      var ASPECT = WIDTH / HEIGHT;
      const UNITSIZE = 250;
      var PI_2 = Math.PI / 2;

      // CREATING SCENE
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xffffff, 0, 750);

      //ADDING LIGHT
      scene.add(lightFactory.ambientLight());
      var directionalLight = lightFactory.directionalLight()
      scene.add(directionalLight);

      //ADDING CAMERA
      var camera = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000);
      scene.add(camera);

      // CONTROLS
      var controls = new PointerLockControls(camera);
      scene.add(controls.getYawObject());
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
      function PointerLockControls(camera) {

        var scope = this;

        var pitchObject = new THREE.Object3D();
        pitchObject.add(camera);

        var yawObject = new THREE.Object3D();
        yawObject.add(pitchObject);
        pitchObject.position.y = 10;

        this.dispose = function() {
          document.removeEventListener('keydown', onKeyDown, false);
        };

        document.addEventListener('keydown', onKeyDown, false);

        this.enabled = false;

        this.getYawObject = function() {
          return yawObject;
        };

        this.getPitchObject = function() {
          return pitchObject;
        };

        this.getDirection = function() {

          // assumes the camera itself is not rotated
          var direction = new THREE.Vector3(0, 0, -1);
          var rotation = new THREE.Euler(0, 0, 0, "YXZ");

          return function(v) {

            rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);

            v.copy(direction).applyEuler(rotation);

            return v;

          };

        }();

      }
      // INITIALIZE RENDERER
      let renderer = constantsFactory.initializeRenderer(WIDTH, HEIGHT);

      //RESIZE WINDOW
      $window.addEventListener('resize', onWindowResize, false);

      function onWindowResize() {
        const w = $window.innerWidth,
          h = $window.innerHeight;
        camera.aspect = w / h
        camera.updateProjectionMatrix();
        renderer.setSize(w, h)
        WIDTH = w
        HEIGHT = h
      }
      // SKYDOME
      var vertexShader = document.getElementById('vertexShader').textContent;
      var fragmentShader = document.getElementById('fragmentShader').textContent;
      var uniforms = {
        topColor: { type: "c", value: new THREE.Color(0x0077ff) },
        bottomColor: { type: "c", value: new THREE.Color(0xffffff) },
        offset: { type: "f", value: 400 },
        exponent: { type: "f", value: 0.6 }
      };
      uniforms.topColor.value.set(0xaabbff);
      var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
      var skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
      });
      var sky = new THREE.Mesh(skyGeo, skyMat);
      scene.add(sky);

      // CREATE CONTAINER
      e[0].appendChild(renderer.domElement);

      /* OBJECTS */

      // setting up stacking capabilities
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();

      // ADD THE COLORFUL WORLD FLOOR
      scene.add(constantsFactory.getFloor());

      // CREATE A ROOM
      var palaceInstance = new palacesFactory.Palace();
      var palace = palaceInstance.palace;
      palace.position.set(-300, 75 / 2 + 1, 100);
      scene.add(palace);

      //store scene in constantsFactory
      constantsFactory.storeScene(scene);

      //RETRIEVE STORED OBJECTS
      storingFactory.retrieveObjects()
        .then(function(items) {
          if (Array.isArray(items)) {
            items.forEach(function(item) {
              objectFactory.load(`/browser/objects/${item.name}/${item.name}.json`, null, item.name)
                .then(obj => {
                  objectFactory.setObjProps(obj, item);
                  scene.add(obj);
                  constantsFactory.placeObject(obj);
                });
            });
          }
        });

      /////////////////////
      // EVENT LIS
      /////////////////////

      e.on('mousemove', onDocumentMouseMove);
      e.on('mousedown', onDocumentMouseDown);
      e.on('wheel', onWheel);
      document.addEventListener('keydown', onKeyDown, false);
      document.addEventListener('keyup', onKeyUp, false);

      let messageShown = false;
      var msg = document.createElement('div')
      msg.className = "message-label";
      msg.style.position = 'absolute'
      msg.style.zIndex = 1000000
      e[0].appendChild(msg)

      function onDocumentMouseMove(event) {
        event.preventDefault();
        mouse.set((event.clientX / WIDTH) * 2 - 1, -(event.clientY / HEIGHT) * 2 + 1);
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(constantsFactory.getObjects());

        if (messageShown) {
          messageShown = false;
          msg.style.opacity = 0
        }
        // add check for if its in the wall
        if (intersects.length > 0) {
          if (intersects[0].object.message && !messageShown) {
            let messageLength = (msg.textContent.length * 20)
            msg.style.opacity = 1
            msg.textContent = intersects[0].object.message;
            msg.style.top = event.clientY - 100 + 'px'
              //not to far to the right
            if (event.clientX < window.innerWidth - messageLength) msg.style.left = event.clientX + 'px'
              //too far to the right
            else msg.style.left = event.clientX - (msg.textContent.length * 20) + 'px'
            messageShown = true;
          }

          if (!objectFactory.currentObject) objectFactory.currentObject = objectFactory.invisibleObject;
          var intersect = intersects[0];
          objectFactory.currentObject.position.copy(intersect.point).add(intersect.face.normal);
          objectFactory.currentObject.position.addScalar(3 / 2);
          if (objectFactory.currentObject.yPosition) objectFactory.currentObject.position.y += objectFactory.currentObject.yPosition;
          if (objectFactory.previousObject) scene.remove(objectFactory.previousObject);
          scene.add(objectFactory.currentObject);
        }
      }

      function onDocumentMouseDown(event) {

        if (modalFactory.enableKeyEvents) {
          event.preventDefault();
          mouse.set((event.clientX / WIDTH) * 2 - 1, -(event.clientY / HEIGHT) * 2 + 1);
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(constantsFactory.getObjects(), true);
          //if its intersecting with an object
          if (intersects.length > 0) {
            var intersect = intersects[0];
            // delete cube
            if (event.originalEvent.shiftKey) {
              if (!palacesFactory.palaceObjects.includes(intersect.object) && constantsFactory.getFloor() != intersect.object) {
                scene.remove(intersect.object);
                storingFactory.deleteObject(intersect.object.storingId);
                constantsFactory.removeObject(intersect.object);
              }
              // create cube
            } else {
              //what is this line doing?
              if (objectFactory.currentObject.children.length > 0) {

                var myObject2 = objectFactory.currentObject.clone();
                myObject2.position.copy(intersect.point).add(intersect.face.normal);
                myObject2.position.addScalar(3 / 2);
                if (objectFactory.currentObject.yPosition) myObject2.position.y += objectFactory.currentObject.yPosition;

                //TEXT;
                messageFactory.rememberObject(myObject2)
                modalFactory.toggleMessageModal();
                scene.add(myObject2);
                constantsFactory.placeObject(myObject2)
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
                });
                // exchanging object for invisible cube (invisble pointer)
                objectFactory.previousObject = objectFactory.currentObject;
                objectFactory.currentObject = objectFactory.invisibleObject;
              }
            }
          }
        }
      }

      // useful codes: w = 87, s = 83, 32 = space, up = 38, down = 40, left = 37, right = 39
      function onKeyDown(event) {
        messageShown = false;
        msg.style.opacity = 0;
        if (modalFactory.enableKeyEvents) {
          switch (event.keyCode) {
            // exit welcome
            // case 27: // esc
            //   // exit welcome modal
            //   welcome.style.display = 'none';

              // // escape modals
              // if (!modalFactory.getAbout().data) {
              //   modalFactory.toggleAbout();
              //   s.$apply();
              // }
              // if (!modalFactory.getLogin().data) {
              //   modalFactory.toggleLogin();
              //   s.$apply();
              // }
              // if (!modalFactory.getSignup().data) {
              //   modalFactory.toggleSignup();
              //   s.$apply();
              // }
              // break;

            // case 13: // enter
            //   welcome.style.display = 'none';
            //   break;

              // toggle carousel modal
            case 49: // 1
              modalFactory.toggleCarousel();
              s.$apply(); // necessary for modal to appear
              break;

              // toggle controls modal
            case 50: // 2
              modalFactory.toggleControls();
              s.$apply(); // necessary for modal to appear
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

              // strafing
            case 65: // a - move left
              moveLeft = true;
              break;

            case 68: // d - move right
              moveRight = true;
              break;

              // jump
            case 32: // space - jump
              if (canJump === true) velocity.y += 280;
              canJump = false;
              break;

              // looking up and down
            case 81: // q, look up
              controls.getPitchObject().rotation.x += 3 * Math.PI / 180;
              break;
            case 69: // e, look down
              controls.getPitchObject().rotation.x -= 3 * Math.PI / 180;
              break;

              // rotate left
            case 37: // left arrow
            	event.preventDefault();
              controls.getYawObject().rotation.y += 3 * Math.PI / 180;
              break;

              // rotate right
            case 39: // right arrow
           	  event.preventDefault();
              controls.getYawObject().rotation.y -= 3 * Math.PI / 180;
              break;

              //check	180 deg for looking up and down, doesn't allow user to flip over
              controls.getPitchObject().rotation.x = Math.max(-PI_2, Math.min(PI_2, controls.getPitchObject().rotation.x));
          }
        }
      }

      function onKeyUp(event) {
        if (modalFactory.enableKeyEvents) {
          switch (event.keyCode) {

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

              // reset strafing
            case 65: // a - move left
              moveLeft = false;
              break;
            case 68: // d - move right
              moveRight = false;
              break;
          }
        }
      }

      function onWheel($event) {
        $event.preventDefault();
        if (modalFactory.enableKeyEvents) {
          var event = $event.originalEvent;
          if (event.ctrlKey === true) { //pinch
            var delta = -event.deltaY / 2;
            var currentScale = objectFactory.currentObject.scale;
            objectFactory.currentObject
              .scale.set(currentScale.x + delta, currentScale.y + delta, currentScale.z + delta)
              .clamp(new THREE.Vector3(0.1, 0.1, 0.1), new THREE.Vector3(50, 50, 50));
          } else if (Math.abs(event.deltaX) > .1) { //two finger left and right scroll
            // $event.preventDefault();
            var delta = -event.deltaX / 20;
            if (objectFactory.currentObject) {
              objectFactory.currentObject.rotation.y += delta;
            }
          }
        }
      }

      /////////////////////
      // RENDER FUNCTION 
      /////////////////////

      function render() {

        requestAnimationFrame(render);

        if (controlsEnabled) {

          // REGULAR MOVEMENT

          var time = performance.now();
          var delta = (time - prevTime) / 1000;

          velocity.x -= velocity.x * 10.0 * delta;
          velocity.z -= velocity.z * 10.0 * delta;

          velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

          if (moveForward) velocity.z -= 400.0 * delta;
          if (moveBackward) velocity.z += 400.0 * delta;

          if (moveLeft) velocity.x -= 400.0 * delta;
          if (moveRight) velocity.x += 400.0 * delta;

          // if ( isOnObject === true ) {
          // 	velocity.y = Math.max( 0, velocity.y );
          // 	canJump = true;
          // }

          controls.getYawObject().translateX(velocity.x * delta);
          controls.getYawObject().translateY(velocity.y * delta);
          controls.getYawObject().translateZ(velocity.z * delta);

          if (controls.getYawObject().position.y < 10) {

            velocity.y = 0;
            controls.getYawObject().position.y = 10;

            canJump = true;

          }

          prevTime = time;

        }

        renderer.render(scene, camera);

      }

      render();
    }
  };
};