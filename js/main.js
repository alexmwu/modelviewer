// some globals that get loaded immediately
var gl;
var canvas;
var wireframe, vertColoring;     // vertColoring true means colored using obj file (i.e., not texture data, false means flat shading
var models; // array of loaded models
var currentModel;   // current model focus (e.g., which model to manipulate)

window.onload = function() {
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    // listen for new file chosen
    var className = document.getElementsByClassName("file-picker");
    // add a listener for each of the class
    for(var i = 0; i < className.length; i++) {
      className[i].addEventListener('change', readSingleFile, false);
    }

  } else {
    alert('The File APIs are not fully supported by this browser. This application may not be able to load files.');
  }

  /*
   *TODO: add button on loading .obj file that refers to the current model to manipulate as that loaded model
   */
  // empty models array
  models = [];

  // initialize object manipulation listeners
  initializeListeners(1,1);

  // if it is auto checked, make wireframe false, else true (it is a global)
  wireframe = document.getElementById("wireframe").checked == true;
  color = document.getElementById("colored").checked == true;

  // init GL canvas
  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if(!gl) {
    alert("WebGL isn't available");
  }

  // configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  init();
};

function addModel(model) {
  models.push(model);
  currentModel = model;
}


function switchWireframe() {
  wireframe = !wireframe;
  drawScene();
}