var file;	//obj file

//display info for a given file in a given DOM element
function fileInfo(file,elem){
	var output=[];
	output.push('<strong>'+escape(file.name),'</strong> (',file.type||'n/a',') - ',file.size,' bytes, last modified: ',
          file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a','<br>');
	elem.innerHTML+=output.join('');
}

/*  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }*/

//read a single file on a given event (from picking a file)
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  fileInfo(file,e.srcElement);
  var reader = new FileReader();
  //when reader has loaded
  reader.onload = function(e) {
    var contents = e.target.result;
    vertices=[];
    objCenter=parseOBJ(contents);
    if(vertices.length==0){
      alert("The file wasn't loaded as it was incorrectly formatted");
    }
    else{
      if(!listening)
        initializeListeners(10);

      currentModel=new Model(indices,wireframeIndices,vertices,vertColors,vertTextures,vertNormals,objCenter);
      currentModel.init();
      models.push(currentModel);
      //addButton(e.srcElement);
    }
  };
  reader.readAsText(file);
}

//add a new button after original; not currently in use above: better practice to 
function addButton(elem){
  var buttonPicker=document.createElement("input");
  buttonPicker.type="file";
  buttonPicker.class="file-picker";
  buttonPicker.addEventListener('change',readSingleFile,false);
  elem.appendChild(buttonPicker);
}

/*//log contents in console and in an obj file
function displayContents(contents) {
  console.log(contents);
  var element = document.getElementById('obj');
  element.innerHTML = contents;
}*/