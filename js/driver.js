// spherical coords
var rotateSpeed,translateSpeed;
var listening=false;  // whether initlisteners has been called

function initializeListeners(rSpeed,tSpeed){
  rotateSpeed=rSpeed;
  translateSpeed=tSpeed;
  theta=0;
  phi=0;
  listening=true;
  document.onkeydown=function(event){
    if(!event)
      event=window.event;
    var code=event.keyCode;
    transX=0, transY=0, transZ=0;
    var theta=0,phi=0;

    if(event.charCode && code==0)
      code=event.charCode;
    switch(code){

      // old code            applyViewChange(theta,phi,transX,transY,transZ);
      case 37:
        // left key
        theta=-rotateSpeed;
        applyViewChange(theta,phi);
        break;
      case 38:
        // up key
        phi=-rotateSpeed;
        applyViewChange(theta,phi);
        break;
      case 39:
        // right key
        theta=rotateSpeed;
        applyViewChange(theta,phi);
        break;
      case 40:
        // down key
        phi=rotateSpeed;
        applyViewChange(theta,phi);
        break;
        /*        case 87:    // w
                  transY=-translateSpeed;
                  applyViewChange(theta,phi);
                  break;
                  case 65:    // a
                  transX=translateSpeed;
                  applyViewChange(theta,phi);
                  break;
                  case 83:    // s
                  transY=translateSpeed;
                  applyViewChange(theta,phi);
                  break;
                  case 68:    // d
                  transX=-translateSpeed;
                  applyViewChange(theta,phi);
                  break;
                  case 82:    // r
                  transZ=-translateSpeed;
                  applyViewChange(theta,phi);
                  break;
                  case 70:    // f
                  transZ=translateSpeed;
                  applyViewChange(theta,phi);
                  break;*/
      case 187:   // +
        handleScroll(-1);
        break;
      case 189:   // -
        handleScroll(1);
        break;
    }
    event.preventDefault();
  }
  // from this example http://ominoushum.com/gl/cube/
  // function to run when scrolling
  function handleMouseWheel(evt){
    if (!event) /* For IE. */
      event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
      delta = event.wheelDelta/120;
    } else if (event.detail) { /** Mozilla case. */
      /** In Mozilla, sign of delta is different than in IE.
       * * Also, delta is multiple of 3.
       * */
      delta = -event.detail/3;
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
    // if scroll is neg and radius is large enough so don't scroll too far in
    if (delta < 0 && radius>.01)
      radius=radius/1.1;
    // if radius is small enough, zoom out
    else if(radius<9)
      radius=radius*1.1;
    else
      return;
    applyViewChange(0,0);
  }

  var glCanvas=document.getElementById("gl-canvas");
  glCanvas.onmousewheel=handleMouseWheel;
};
