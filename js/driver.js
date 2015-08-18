// spherical coords
var rotateSpeed,translateSpeed;

// global driver variable (easy for dev tools use)

/*
 *TODO: use rotation matrix rather than Euler angles to fix gimbal lock; maybe quarternions
 */
var Driver = {
  rotateLeft: function(){
                theta = -rotateSpeed;
                applyViewChange(theta,phi);
              },
  rotateRight: function(){
                 theta = rotateSpeed;
                 applyViewChange(theta,phi);
               },
  rotateUp: function(){
              phi = -rotateSpeed;
              applyViewChange(theta,phi);
            },
  rotateDown: function(){
                phi = rotateSpeed;
                applyViewChange(theta,phi);
              },
  moveLeft: function(){
              transX = translateSpeed;
              applyViewChange(theta,phi);
            },
  moveRight: function(){
               transX = -translateSpeed;
               applyViewChange(theta,phi);
             },
  moveUp: function(){
            transY = -translateSpeed;
            applyViewChange(theta,phi);
          },
  moveDown: function(){
              transY = translateSpeed;
              applyViewChange(theta,phi);
            },
  moveForward: function(){
                 transZ = translateSpeed;
                 applyViewChange(theta,phi);
               },
  moveBackward: function(){
                  transZ = -translateSpeed;
                  applyViewChange(theta,phi);
                },
  zoomIn: function(){
          },
  zoomOut: function(){
           },
};


function initializeListeners(rSpeed, tSpeed) {
  // set speed of rotation, translation
  rotateSpeed = rSpeed;
  translateSpeed = tSpeed;

  // initialize theta and phi to 0
  theta = 0;
  phi = 0;
  document.onkeydown = function(event) {
    if(!event)
      event = window.event;
    var code = event.keyCode;
    transX = 0, transY = 0, transZ = 0;
    var theta = 0, phi = 0;

    if(event.charCode && code == 0)
      code = event.charCode;
    switch(code) {
      case 37:
        // left key
        Driver.rotateLeft();
        break;
      case 38:
        // up key
        Driver.rotateUp();
        break;
      case 39:
        // right key
        Driver.rotateRight();
       break;
      case 40:
        // down key
        Driver.rotateDown();
       break;
      case 87:
        // w
        Driver.moveUp();
       break;
      case 65:
        // a
        Driver.moveLeft();
        break;
      case 83:
        //s
        Driver.moveDown();
        break;
      case 68:
        //d
        Driver.moveRight();
        break;
      case 82:
        //r
        Driver.moveBackward();
        break;
      case 70:
        //f
        Driver.moveForward();
        break;
    }
    event.preventDefault();
  }
  // from this example http://ominoushum.com/gl/cube/
  // function to run when scrolling
  function handleMouseWheel() {
    if (!event) /* For IE. */
      event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
      delta = event.wheelDelta/120;
    } else if (event.detail) { /** Mozilla case. */
      /** In Mozilla, sign of delta is different than in IE.
       * * Also, delta is multiple of 3.
       * */
      delta = -event.detail / 3;
    }
    /** If delta is nonzero, handle it.
     * * Basically, delta is now positive if wheel was scrolled up,
     * * and negative, if wheel was scrolled down.
     * */
    if (delta)
      handleScroll(delta);
    /** Prevent default actions caused by mouse wheel.
     * * That might be ugly, but we handle scrolls somehow
     * * anyway, so don’t bother here..
     * */
    if (event.preventDefault)
      event.preventDefault();
    event.returnValue = false;
  }

  function handleScroll(delta) {
    console.log('swag');
    // if scroll is neg and radius is large enough so don't scroll too far in
    if (delta < 0 && radius > .01)
      radius = radius / 1.1;
    // if radius is small enough, zoom out
    else if(radius < 9)
      radius = radius * 1.1;
    else
      return;
    applyViewChange(0,0);
  }

  var glCanvas = document.getElementById("gl-canvas");
  /*
   *glCanvas.onmousewheel = handleMouseWheel;
   */
};
