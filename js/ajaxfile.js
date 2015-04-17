window.onload=function(){
	document.getElementById("submiturl").onclick = function(){
	var url=document.getElementById('objurl').value;
	var resp=readFileFromURL(url);
	document.getElementById('obj').innerHTML=resp;
}
}

//reads text from file given a URL and return the response
function readFileFromURL(url){
	console.log("URL: "+url);
	var xhr=CORSRequest("GET",url);

	xhr.onerror=function(){
		return -3;
	}

	xhr.send();

	if(xhr==null){
		return -1;
	}
	if(xhr.readyState=4){
		console.log(xhr.responseText+"\n"+xhr.getResponseHeader('content-type')+"\n"+xhr.status);
		if(xhr.status==200){
			var resp=json.parse(xhr.responsetext);
			return resp;	
		}
		else{
			return -2
		}
	}


}

function CORSRequest(method,url){
	var xhr = new XMLHttpRequest();
	if("withCredentials" in xhr){
		xhr.open(method,url,true);
	}
	else if(typeof XDomainRequest!="undefined"){
		xhr=new XDomainRequest();
		xhr.open(method,url);
	}
	else{
		xhr=null;
	}
	return xhr;
}

function printText(){
	var url=document.getElementById('objurl').value;
	var resp=readFileFromURL(url);

	if(resp==-1){
		resp="CORS is not supported";
	}
	else if(resp==-2){
		resp="URL error";
	}
	else if(resp==-3){
		resp="Network error";
	}
	console.log(resp);
	document.getElementById('obj').innerHTML=resp;
	event.preventDefault ? event.preventDefault() : event.returnValue=false;
}
