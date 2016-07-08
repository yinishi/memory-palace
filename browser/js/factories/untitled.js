function render() {

        requestAnimationFrame(render);

        if (controlsEnabled) {

          // COLLISION DETECTION - FORWARD
          raycasterCamera = new THREE.Raycaster()
          raycasterCamera.ray.origin.copy(controls.getYawObject().position);
          raycasterCamera.setFromCamera(forward_vec, camera)
          raycasterCamera.ray.origin.z -= 1;
          var collisions = raycasterCamera.intersectObjects(scene.children, true);

          var collidingForward = collisions.length > 1;

          if (collidingForward && moveForward && collisions[0].distance < 20) {
            moveForward = false;
            velocity.x = 0;
            velocity.y = 0;
            velocity.z = 0;
          }

          // COLLISION DETECTION - BACKWARD
          raycasterCamera = new THREE.Raycaster()
          raycasterCamera.ray.origin.copy(controls.getYawObject().position);
          raycasterCamera.setFromCamera(backward_vec, camera)
          raycasterCamera.ray.origin.z += 5;
          var collisions = raycasterCamera.intersectObjects(scene.children, true);

          var collidingBackward = collisions.length > 1;

          if (collidingBackward && moveBackward && collisions[0].distance < 40) {
            moveBackward = false;
            velocity.x = 0;
            velocity.y = 0;
            velocity.z = 0;
          }

          // COLLISION DETECTION - left
          raycasterCamera = new THREE.Raycaster()
          raycasterCamera.ray.origin.copy(controls.getYawObject().position);
          raycasterCamera.setFromCamera(left_vec, camera)
          raycasterCamera.ray.origin.x += 1;
          var collisions = raycasterCamera.intersectObjects(scene.children, true);

          var collidingLeft = collisions.length > 1;

          if (collidingLeft && moveLeft && collisions[0].distance < 40) {
            moveLeft = false;
            velocity.x = 0;
            velocity.y = 0;
            velocity.z = 0;
          }

          // COLLISION DETECTION - right
          raycasterCamera = new THREE.Raycaster()
          raycasterCamera.ray.origin.copy(controls.getYawObject().position);
          raycasterCamera.setFromCamera(right_vec, camera)
          raycasterCamera.ray.origin.x -= 1;
          var collisions = raycasterCamera.intersectObjects(scene.children, true);

          var collidingRight = collisions.length > 1;

          if (collidingRight && moveRight && collisions[0].distance < 40) {
            moveRight = false;
            velocity.x = 0;
            velocity.y = 0;
            velocity.z = 0;
            console.log('colliding right, velocity is', velocity, 'can move right?', moveRight, 'collidingRight', collidingRight);
          }


          /////////////////////////

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