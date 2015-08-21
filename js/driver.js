// global driver variable (easy for dev tools use)
var Driver = {
  // initialize camera variables to 0

  // camera eye position
  transX: 0,
  transY: 0,
  transZ: 0,

  // camera angles
  theta: 0,
  phi: 0,

  /*
   *TODO: give input (probably a range input) to change Driver speeds
   */

  // speed of rotation and translation.
  // translation should be around .01 to 1 by default
  // (since the WebGL canvas is -1 to 1 on x, y)
  // rotation should be around 10 to 50
  rotateSpeed: 0,
  translateSpeed: 0,

  // radius of camera
  radius: 0,


  rotateLeft: function(){
                this.theta -= this.rotateSpeed;
                applyViewChange();
              },
  rotateRight: function(){
                 this.theta += this.rotateSpeed;
                 applyViewChange();
               },
  rotateUp: function(){
              this.phi -= this.rotateSpeed;
              applyViewChange();
            },
  rotateDown: function(){
                this.phi += this.rotateSpeed;
                applyViewChange();
              },
  moveLeft: function(){
              this.transX += this.translateSpeed;
              applyViewChange();
            },
  moveRight: function(){
               this.transX -= this.translateSpeed;
               applyViewChange();
             },
  moveUp: function(){
            this.transY -= this.translateSpeed;
            applyViewChange();
          },
  moveDown: function(){
              this.transY += this.translateSpeed;
              applyViewChange();
            },
  moveForward: function(){
                 this.transZ += this.translateSpeed;
                 applyViewChange();
               },
  moveBackward: function(){
                  this.transZ -= this.translateSpeed;
                  applyViewChange();
                },
  zoom: function(delta){
          // if scroll is neg and radius is large enough so don't scroll too far in
          if (delta < 0 && this.radius > .01)
            this.radius = this.radius / 1.1;
          // if radius is small enough, zoom out
          else if(delta > 0 && this.radius < 9)
            this.radius = this.radius * 1.1;
          else
            return;
          applyViewChange(0,0);
        },
  // returns array of cartesian coordinates based on theta and phi
  polarToCartesian: function(){
                      var cartCoords = [];
                      var xPos = this.radius*Math.sin(this.theta*Math.PI/360)*Math.cos(this.phi*Math.PI/360);
                      var yPos = this.radius*Math.sin(this.phi*Math.PI/360);
                      var zPos = this.radius*Math.cos(this.theta*Math.PI/360)*Math.cos(this.phi*Math.PI/360);
                      cartCoords.push(xPos);
                      cartCoords.push(yPos);
                      cartCoords.push(zPos);
                      return cartCoords;
                    }
};


function initializeListeners(rSpeed, tSpeed, r) {
  // set speed of rotation, translation
  Driver.rotateSpeed = rSpeed;
  Driver.translateSpeed = tSpeed;
  Driver.radius = r;

  document.onkeydown = function(event) {
    if(!event)
      event = window.event;
    var code = event.keyCode;

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
      Driver.zoom(delta);
    /** Prevent default actions caused by mouse wheel.
     * * That might be ugly, but we handle scrolls somehow
     * * anyway, so don’t bother here..
     * */
    if (event.preventDefault)
      event.preventDefault();
    event.returnValue = false;
  }

  var glCanvas = document.getElementById("gl-canvas");
  glCanvas.onmousewheel = handleMouseWheel;
};
