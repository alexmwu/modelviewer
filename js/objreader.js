var vertices;
var vertColors;
var vertTextures;
var vertNormals;
var indices,wireframeIndices;

//parse .obj files
function parseOBJ(objText){
    var lines=objText.split("\n");
    var numLines=lines.length;

    vertices=[];
    vertColors=[];
    vertTextures=[];
    vertNormals=[];
    indices=[];
    wireframeIndices=[];
    for(var line=0;line<numLines;line++){
        var data=lines[line].split(" ");
            if(data[0]=="v"){
                //color included
                if(data.length==7){
                    for(var i=1;i<4;i++){
                        vertices.push(parseFloat(data[i]));
                    }
                    for(var i=4;i<7;i++){
                        vertColors.push(parseFloat(data[i]));
                    }
                }
                //no color
                else if(data.length==4){
                    for(var i=1;i<4;i++){
                        vertices.push(data[i]);
                    }
                }
                else{
                    alert("badly formatted v input in obj file: "+data.join(" "));
                }

            }
            //should only have 2 vertices
            else if(data[0]=="vt"){
                if(data.length==3){
                    vertTextures.push(data[1]);
                    vertTextures.push(data[2]);
                }
                else{
                    alert("badly formatted vt input in obj file: "+data.join(" "));
                }
            }
            else if(data[0]=="vn"){
                if(data.length==4){
                    for(var i=1;i<4;i++){
                        vertNormals.push(data[i]);
                    }
                }
                else{
                    alert("badly formatted vn input in obj file: "+data.join(" "));
                }

            }
            else if(data[0]=="f"){
                if(data.length==4){
                    for(var i=1;i<4;i++){
                        //split by / and grab first number, then convert into an int and subtract 1
                        //since the indices start at 1
                        indices.push(parseInt(data[i].split("/")[0])-1);
                        //indices.push(data[i].split("/")[0]);
                    }
                    wireframeIndices.push(parseInt(data[1].split("/")[0])-1);
                    wireframeIndices.push(parseInt(data[2].split("/")[0])-1);
                    wireframeIndices.push(parseInt(data[1].split("/")[0])-1);
                    wireframeIndices.push(parseInt(data[3].split("/")[0])-1);
                    wireframeIndices.push(parseInt(data[2].split("/")[0])-1);
                    wireframeIndices.push(parseInt(data[3].split("/")[0])-1);
                }
                else{
                    alert("badly formatted f input in obj file: "+data.join(" "));
                }
            }
            else if(data[0]=="#"){
                continue;
            }
            else if(data[0]==""){
                continue;
            }
            else{
                alert("badly formatted input obj: "+data.join(" "));
           }
    }
    return center();
}

//return average center of data (of x, y, and z components)
function center(){
    var xSum=0,ySum=0,zSum=0;  //sum of all x coords, etc.
    var i;

    //average all x coords in intervals of 3 for all vertices
    for(i=0;i<vertices.length;i+=3){
        xSum+=vertices[i];
    }

    //y coords
    for(i=1;i<vertices.length;i+=3){
        ySum+=vertices[i];
    }

    //z coords
    for(i=2;i<vertices.length;i+=3){
        zSum+=vertices[i];
    }
    var center=[];
    center.push(xSum/(vertices.length/3.0));
    center.push(ySum/(vertices.length/3.0));
    center.push(zSum/(vertices.length/3.0));
    return center;
}

//returns array of minimum and maximum values (-x,-y,-z,x,y,z)
function minMax(){}

//return max of array (to ensure that indices array doesn't have index (times 3) exceeding vertex length)

function max(arr){
    var max=0;
    for(var i=0;i<arr.length;i++){
        if(arr[i]>max){
            max=parseInt(arr[i]);
        }
    }
    return max;
}
