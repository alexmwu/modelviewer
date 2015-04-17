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

function init(){
    theta=0;
    phi=0;
    radius=1;
    pMatrix=perspective(60,canvas.width/canvas.height,0.01,10.0);
    initColorShaders();
    resetView();
}


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

function drawScene(){
    for(var i=0;i<models.length;i++){
        models[i].render();
    }
}


function initColorShaders(){
    colorShaderProgram=initShaders(gl,"color-vShader","color-fShader");
    
    gl.useProgram(this.colorProgram);

    colorShaderProgram.vPositionAttribute=gl.getAttribLocation(colorShaderProgram,"vPosition");
    gl.enableVertexAttribArray(colorShaderProgram.vPositionAttribute);
    
    colorShaderProgram.vColorAttribute=gl.getAttribLocation(colorShaderProgram,"vColor");
    gl.enableVertexAttribArray(colorShaderProgram.vColorAttribute);

    colorShaderProgram.pMatrixUniform=gl.getUniformLocation(colorShaderProgram,"pMatrix");
    colorShaderProgram.mvMatrixUniform=gl.getUniformLocation(colorShaderProgram,"mvMatrix"); 
}

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

