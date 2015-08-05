// create Model object
Model = function(ind, wireInd, verts, cols, texts, normals, objC) {
  this.indices = ind;
  this.wireframeIndices = wireInd;
  this.vertices = verts;
  this.colors = cols;
  this.textures = texts;
  this.normals = normals;
  this.objCenter = objC;
}

// initialize model info and data
Model.prototype.init = function() {
  this.initGL();

  this.loadBufferData();
  this.mMatrix = translate(-this.objCenter[0], -this.objCenter[1], -this.objCenter[2]);
  this.render();
}

// load relevant gl shaders, etc.
Model.prototype.initGL = function() {
  if(this.vertices.length == 0 || this.indices.length == 0 || this.wireframeIndices.length == 0) {
    alert("Error parsing obj file vertex/index information.");
  }
  if(this.colors.length != 0) {
    this.hasColor = true;
  }
  else{
    this.hasColor = false;
  }
  if(this.textures.length == 0) {

  }
  if(this.normals.length == 0) {

  }

  gl.enable(gl.DEPTH_TEST);
}

Model.prototype.render = function() {
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
  gl.vertexAttribPointer(colorShaderProgram.vPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  if(this.hasColor) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.vertexAttribPointer(colorShaderProgram.vColorAttribute, 3, gl.FLOAT, false, 0, 0);
  }

  this.loadMatrixUniforms();

  if(wireframe) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireframeIndexBuffer);
    gl.drawElements(gl.LINES, this.wireframeIndices.length, gl.UNSIGNED_SHORT, 0);
  }
  else{
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
  }
}

// load uniform matrices (modelview and projection) into shaders
Model.prototype.loadMatrixUniforms = function() {
  gl.uniformMatrix4fv(colorShaderProgram.pMatrixUniform, false, flatten(pMatrix));
  var mvMatrix = mult(vMatrix, this.mMatrix);
  gl.uniformMatrix4fv(colorShaderProgram.mvMatrixUniform, false, flatten(mvMatrix));
}


// load data into GPU buffers
Model.prototype.loadBufferData = function() {
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

  this.vertexPosBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

  this.wireframeIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireframeIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(wireframeIndices), gl.STATIC_DRAW);


  if(this.hasColor) {
    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW);
  }
}
/*
   Model.setModel() {

   }*/

/*
 *******************************************************
 need to fix flipping issue
 ********************************************************
 */

