var colorShaderProgram,flatShaderProgram;
var radius;
var theta,phi;  //camera angles
var transX,transY,transZ;    //camera eye position
//for lookat function
var up=vec3(0.0,-1.0,0.0);
var at=vec3(0.0,0.0,0.0);
var eye;
var vMatrix;    //view matrix
var pMatrix;    //projection matrix

//initialize view matrix variables, projection matrix variables, and shaders
function init(){
    //vars for view matrix
    theta=0;
    phi=0;
    radius=1;

    pMatrix=perspective(60,canvas.width/canvas.height,0.01,10.0);
    initColorShaders();
    resetView();
}

//reset the view matrix (vMatrix) and draw scene based on vMatrix
function resetView(){
    var cartCoords=this.polarToCartesian();
    eye=vec3(cartCoords[0],cartCoords[1],cartCoords[2]);
    vMatrix=lookAt(eye,at,up);

    drawScene();
}

//update all model's mvMatrices
function applyViewChange(deltaTheta,deltaPhi){
/*    if(theta<0)
        theta+=360;
    else if(theta>360)
        theta-=360;
    if(phi<0)
        phi+=360;
    else if(phi>0)
        phi-=360;
*/
    theta+=deltaTheta;
    phi+=deltaPhi;
    var cartCoords=polarToCartesian();

    //set new eye(where camera is) position
    eye=vec3(cartCoords[0],cartCoords[1],cartCoords[2]);

 /*   if(phi>180){
var down=vec3(0.0,1.0,0.0);
        mvMatrix=mult(lookAt(eye,at,down),mvMatrix);
    }
    else{*/
    var tmp=translate(transX,transY,transZ);
    vMatrix=mult(lookAt(eye,at,up),tmp);
    drawScene();
}

//render each model object
function drawScene(){
    for(var i=0;i<models.length;i++){
        models[i].render();
    }
}

//initialize color shaders
function initColorShaders(){
    //get shaders for gl from script tags (named color-vShader, fShader)
    colorShaderProgram=initShaders(gl,"color-vShader","color-fShader");

    //not sure why use this.colorProgram rather than colorShaderProgram
    gl.useProgram(colorShaderProgram);

    //get location of vPosition attr in shader and enable it
    colorShaderProgram.vPositionAttribute=gl.getAttribLocation(colorShaderProgram,"vPosition");
    gl.enableVertexAttribArray(colorShaderProgram.vPositionAttribute);

    //get location of vColor attr in shader and enable it
    colorShaderProgram.vColorAttribute=gl.getAttribLocation(colorShaderProgram,"vColor");
    gl.enableVertexAttribArray(colorShaderProgram.vColorAttribute);

    //get locations of uniform variables in shaders
    colorShaderProgram.pMatrixUniform=gl.getUniformLocation(colorShaderProgram,"pMatrix");
    colorShaderProgram.mvMatrixUniform=gl.getUniformLocation(colorShaderProgram,"mvMatrix");
}

//initialize the non-color shaders
function initGrayShaders(){}

function useProgram(){
    gl.useProgram
}

//returns array of cartesian coordinates based on theta and phi
function polarToCartesian(){
    var cartCoords=[];
    var xPos=radius*Math.sin(theta*Math.PI/360)*Math.cos(phi*Math.PI/360);
    var yPos=radius*Math.sin(phi*Math.PI/360);
    var zPos=radius*Math.cos(theta*Math.PI/360)*Math.cos(phi*Math.PI/360);
    cartCoords.push(xPos);
    cartCoords.push(yPos);
    cartCoords.push(zPos);
    return cartCoords;
}

