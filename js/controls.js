var moveForward, moveBackward,  moveRight, moveLeft;
var velocity = new THREE.Vector3();
var Controls = function() {

  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  if (havePointerLock) {

    var element = document.body;

    var pointerlockchange = function(event) {

      if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
        controlsEnabled = true;
        controls.enabled = true;
        console.log("ENABLED")


      } else {
        console.log("FALSE")
        controls.enabled = false;
      }

    }

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.body.addEventListener('click', function(event) {


      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

      if (/Firefox/i.test(navigator.userAgent)) {

        var fullscreenchange = function(event) {

          if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

            document.removeEventListener('fullscreenchange', fullscreenchange);
            document.removeEventListener('mozfullscreenchange', fullscreenchange);

            element.requestPointerLock();
          }

        }

        document.addEventListener('fullscreenchange', fullscreenchange, false);
        document.addEventListener('mozfullscreenchange', fullscreenchange, false);

        element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

        element.requestFullscreen();

      } else {

        element.requestPointerLock();

      }

    }, false);

  }
}


Controls.prototype.init = function() {

  var onKeyDown = function(event) {

    switch (event.keyCode) {

      case 38: // up
      case 87: // w
        moveForward = true;
        break;

      case 37: // left
      case 65: // a
        moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        moveRight = true;
        break;

    }

  };

  var onKeyUp = function(event) {

    switch (event.keyCode) {

      case 38: // up
      case 87: // w
        moveForward = false;
        break;

      case 37: // left
      case 65: // a
        moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        moveRight = false;
        break;

    }

  };

  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
}


Controls.prototype.update = function(delta) {
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;

  // velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

  if (moveForward) velocity.z -= 400.0 * delta;
  if (moveBackward) velocity.z += 400.0 * delta;

  if (moveLeft) velocity.x -= 400.0 * delta;
  if (moveRight) velocity.x += 400.0 * delta;

  // if (isOnObject === true) {
  //   velocity.y = Math.max(0, velocity.y);

  // }
  console.log(velocity)
  controls.getObject().translateX(velocity.x * delta);
  controls.getObject().translateY(velocity.y * delta);
  controls.getObject().translateZ(velocity.z * delta);
}