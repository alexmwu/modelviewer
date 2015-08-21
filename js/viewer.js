var colorShaderProgram, flatShaderProgram;
var radius;
// for lookat function
var up = vec3(0.0, -1.0, 0.0);
var at = vec3(0.0, 0.0, 0.0);
var eye;
var vMatrix;    // view matrix
var pMatrix;    // projection matrix

// initialize view matrix variables, projection matrix variables, and shaders
function init() {
    pMatrix = perspective(60, canvas.width/canvas.height, 0.01, 10.0);
    initColorShaders();
    resetView();
}

// reset the view matrix (vMatrix) and draw scene based on vMatrix
function resetView() {
    var cartCoords = Driver.polarToCartesian();
    eye = vec3(cartCoords[0], cartCoords[1], cartCoords[2]);
    vMatrix = lookAt(eye, at, up);

    drawScene();
}

// update all model's mvMatrices
function applyViewChange() {
/*    if(theta<0)
        theta += 360;
    else if(theta>360)
        theta-=360;
    if(phi<0)
        phi += 360;
    else if(phi>0)
        phi-=360;
*/
    var cartCoords = Driver.polarToCartesian();

    // set new eye(where camera is) position
    eye = vec3(cartCoords[0], cartCoords[1], cartCoords[2]);

 /*   if(phi>180) {
var down = vec3(0.0, 1.0, 0.0);
        mvMatrix = mult(lookAt(eye, at, down), mvMatrix);
    }
    else{*/
    var tmp = translate(Driver.transX, Driver.transY, Driver.transZ);
    vMatrix = mult(lookAt(eye, at, up), tmp);
    drawScene();
}

// render each model object
function drawScene() {
    for(var i = 0; i < models.length; i++) {
        models[i].render();
    }
}

// initialize color shaders
function initColorShaders() {
    // get shaders for gl from script tags (named color-vShader, fShader)
    colorShaderProgram = initShaders(gl, "color-vShader", "color-fShader");

    // not sure why use this.colorProgram rather than colorShaderProgram
    gl.useProgram(colorShaderProgram);

    // get location of vPosition attr in shader and enable it
    colorShaderProgram.vPositionAttribute = gl.getAttribLocation(colorShaderProgram, "vPosition");
    gl.enableVertexAttribArray(colorShaderProgram.vPositionAttribute);

    // get location of vColor attr in shader and enable it
    colorShaderProgram.vColorAttribute = gl.getAttribLocation(colorShaderProgram, "vColor");
    gl.enableVertexAttribArray(colorShaderProgram.vColorAttribute);

    // get locations of uniform variables in shaders
    colorShaderProgram.pMatrixUniform = gl.getUniformLocation(colorShaderProgram, "pMatrix");
    colorShaderProgram.mvMatrixUniform = gl.getUniformLocation(colorShaderProgram, "mvMatrix");
}

// initialize the non-color shaders
function initGrayShaders() {}

function useProgram() {
    gl.useProgram
}

/*
 *******************************************************
 TODO: need to fix flipping issue
 ********************************************************
 */

