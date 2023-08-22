function ratingdata(osmid) { 
	var ratingDiv=document.querySelector("#ratingGast");
	var tabele=document.querySelector("#table");
	var test=document.querySelector("#test");
	while (tabele.firstChild) {
		tabele.removeChild(tabele.firstChild);
		}
		
	fetch("data/rating/"+osmid
			
	
	) .then(response => response.json()).then( data => ratingzeigen(data) 
			) .catch( error => console.log(error) ); 
	
	
}
function ratingzeigen(rating){
	ratingGast
	idTR="T"
		document.querySelector("#bewertungen").style.display = "block";
	document.querySelector("#ratingGast").style.display = "block";
	
		console.log("Event" ); 
		
		console.log("rating" );
		console.log( rating );
		rating.forEach( item => { 
			
				
			
		userfetch(item.user_id , item.grade,item.txt,item.image_path,item.create_dt )
			
		
//console.log("OsmID :"+OsmID +",username:"+userneamFürGäste + ",userid: "+item.user_id +",gerade :"+ item.grade +",comm :"+ item.txt );
		
			
			
		} );
			
	
}


function userfetch(userid,grade,comm,foto,datum)
{
	
	
	 fetch("data/user/"+userid
			
			
	) .then(response => response.json()).then(data => {		
		
			
			userneamFürGäste= data.username
			console.log("username:"+userneamFürGäste+",grade:"+grade+"comm"+comm);
		
			for(let i=0;i<4;i++){
			var out=document.querySelector("#table");	
			var x = document.createElement("TR");
			    x.setAttribute("id", idTR);		 
		  document.querySelector("#table").appendChild(x);
		    var y = document.createElement("TD");
		    if(i==0){
		    	if(grade==0){
					var t = document.createElement("p");
					t.innerHTML ="&#9734;&#9734;&#9734;&#9734;&#9734;"
				}
		    	if(grade==1){
					var t = document.createElement("p");
					t.innerHTML ="&#9733;&#9734;&#9734;&#9734;&#9734;"
				}if(grade==2){
					var t = document.createElement("p");
					t.innerHTML ="&#9733;&#9733;&#9734;&#9734;&#9734;"
				}if(grade==3){
					var t = document.createElement("p");
					t.innerHTML ="&#9733;&#9733;&#9733;&#9734;&#9734;"
				}if(grade==4){
					var t = document.createElement("p");
					t.innerHTML ="&#9733;&#9733;&#9733;&#9733;&#9734;"
				}if(grade==5){
					var t = document.createElement("p");
					t.innerHTML ="&#9733;&#9733;&#9733;&#9733;&#9733;"
				}		    	
			
			    y.appendChild(t);
	      document.getElementById(idTR).appendChild(y);
		    }
		    if(i==1){
		    	var t = document.createTextNode(userneamFürGäste+"  schreibt am "+datum+" :"+comm);
			    y.appendChild(t);
	      document.getElementById(idTR).appendChild(y);
		    }
		    if(i==2){
		    	
		    	
		    	let img=atob(foto) 
		    	
		    	var t = document.createElement("IMG");
		    	t.setAttribute("src", img);
		    	 t.setAttribute("width", "50");
		    	  t.setAttribute("height", "50");
			    y.appendChild(t);
	      document.getElementById(idTR).appendChild(y);
		    }if(i==3){
		    	var t = document.createTextNode("------------------------------");
			    y.appendChild(t);
	      document.getElementById(idTR).appendChild(y);
		    }
		    idTR+="t"
		    
	}
			
			}
	 
			).catch( error => console.log(error) );
	
}


/*function ratinganzeigen(userneamFürGäste,grade,comm,foto,datum){
	for(let i=0;i>4;i++){
		console.log("hi")
		var out=document.querySelector("#table");	
		var x = document.createElement("TR");
		    x.setAttribute("id", idTR);		 
	  document.querySelector("#table").appendChild(x);
	  		
	    var y = document.createElement("TD");
	    var t = document.createElement("p");
		t.innerHTML ="&#9733;&#9734;&#9734;&#9734;&#9734;"
			  y.appendChild(t);
	      document.getElementById(idTR).appendChild(y);
	 
	    idTR+="t"
	    
}
}*/
//cearetrating
function addbewertung()
{
//	let data = {  
//			      user_id:userID,
//			      osm_id : osmid,
//			  rating_type: welchetype(),
//			        grade: welchergrad(),
//		              txt: document.querySelector("#ratingText").value,
//			   image_path: document.querySelector("#file").value,
//			   };
	let user_name=Username;
	
     let osm_id = OsmID   
     let rating_type= welchetype()
 console.log("type :"+welchetype())
     let     grade= welchergrad()
   console.log("grad :"+welchergrad());
     let  text= strip_tags(document.querySelector("#ratingText").value)
     console.log("text :"+document.querySelector("#ratingText").value);
     let image_path= document.querySelector("#file").files[0];
     //weil in ratingcotroler braucht string encodes a string in base-64.
     // Use the atob() method to decode a base-64 encoded string.
    var imag=null;
     if(image_path!=null){
    	 imag=btoa(hefebase64); 
    	 
     }
     console.log("bei absenden");
     
     
     
	fetch('data/rating/'+osm_id+'/'+user_name+'/'+text+'/'+rating_type+'/'+imag+'/'+grade, 
			
			{
	    method: 'post'
	   
	    
	  })
	
	.then( response => {
		     document.querySelector("#ratingText").value=""
			 document.querySelector("#star1").checked=false
			 document.querySelector("#star2").checked=false
			 document.querySelector("#star3").checked=false
			 document.querySelector("#star4").checked=false
			 document.querySelector("#star5").checked=false
			 document.querySelector("#file").value=null
			//damit hier  beide nicht glecih zeitech anrufen  
			    /*let g=function(){
			    	setTimeout( function(){
			    		getuserRating();
			    	  }, 500 );
			    
			    }
			    
			    let f= function(callback){
			    	
			    	helfegetuserRating();
			    	
			    	callback();
			    }
			    f(g);*/
			 getuserRating() 
		console.log(response)
		ratingdata(osm_id)
	} )	
	.catch( error => console.error('Error:', error) );
	
	
}
//foto
/*function urlfoto(element){
	 var file = element.files[0];
	 console.log(element.files[0])
	 console.log(URL.createObjectURL(file))
	var r= btoa(URL.createObjectURL(file))
	 console.log(r)
	var m= atob(r)
	console.log(m)
	return URL.createObjectURL(file);
}*/



var blobURL;
var fileName;
function conv(dataURI){

// Convert a base64 string into a binary Uint8 Array 
// https://gist.github.com/borismus/1032746
var BASE64_MARKER = ';base64,';
var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
var base64 = dataURI.substring(base64Index);

var raw = window.atob(base64);

var rawLength = raw.length;
var array = new Uint8Array(new ArrayBuffer(rawLength));
for(i = 0; i < rawLength; i++) {
array[i] = raw.charCodeAt(i);

}
return array;
}


function readFile(evt){

var f =evt.files[0];
if(f) { if( /(jpe?g|png|gif)$/i.test(f.type) ) {
 
var r= new  FileReader();
r.onload=function(e){
var base46Img = e.target.result;
var binary=conv(base46Img)
var blob1 = new Blob([binary],{type : f.type});


Fotohelfe(blob1)
blobURL= window.URL.createObjectURL(blob1)

console.log(blobURL)

}
r.readAsDataURL(f)
}else {
alert("faild file type")}
}else{
alert("failed to load file")

} 


}
function Fotohelfe(blob1){
	bobleToBase64(blob1)
	 fotoblob=blob1
	console.log("bei fotohelfe"+fotoblob)
	console.log(fotoblob)
}
function bobleToBase64(blob){
	 var reader = new FileReader();
	 reader.readAsDataURL(blob); 
	 reader.onloadend = function() {
	     var base64data = reader.result;
	     helfebolb(base64data)
	     
	 }
	
}
function helfebolb(base64){
	 hefebase64=base64
	console.log("hier in helfeblob")	
			
}

/*function readURL(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();

	    reader.addEventListener(
	      "load",
	      function() {
	        var avatarImg = new Image();
	        var src = reader.result;
	        avatarImg.src = src;
	       foto=src	      
	        
	      },
	      false
	    );

	    reader.readAsDataURL(input.files[0]);
	  }
	  
	  
	}*/

function welchergrad(){
	 var rates = document.querySelector("#rates").value;
	 var rate_value;
	 if(document.querySelector("#star5").checked){
	     rate_value = document.querySelector("#star5").value;

	 }else if(document.querySelector("#star4").checked){
	     rate_value = document.querySelector("#star4").value;

	 }else if(document.querySelector("#star3").checked){
	     rate_value = document.querySelector("#star3").value;
	 }else if(document.querySelector("#star2").checked){
	     rate_value = document.querySelector("#star2").value;
	 }else if(document.querySelector("#star1").checked){
	     rate_value = document.querySelector("#star1").value;
	     }else {
	    	 rate_value=0;
	     }
	     return rate_value	
}
function welchetype(){
	 var rates = document.querySelector("#rates").value;
	 var rate_value;
	 if(document.querySelector("#star5").checked){
	     rate_value = document.querySelector("#r").title;

	 }else if(document.querySelector("#star4").checked){
		 rate_value = "good";

	 }else if(document.querySelector("#star3").checked){
		 rate_value = document.querySelector("#m").title;
	 }else if(document.querySelector("#star2").checked){
		 rate_value = document.querySelector("#k").title;
	 }else if(document.querySelector("#star1").checked){
		 rate_value = "Sucks";
	     }else {
	    	 rate_value="keine";
	     }
	     return rate_value	
}
function absendebutten(){
	
	document.querySelector("#absendenButten").disabled=false
}
//getuserrating
function getuserRating(){
	
	
	fetch("data/rating/"+Username
	) .then(response => response.json()).then(ra => allRatingVonUserzeigen(ra)	
		
				 
			 )
			 .catch( error => console.log(error)
					 );
}


function allRatingVonUserzeigen(rating){
	idnameVontr="myTr"
	// ich speiche datrin  nur was ich brauce von item 
	var array; 
	//out rating
	var outinfo=document.querySelector("#rating");
	let ratingLang=rating.length;
	//tabele in unten seite in aside
	var out=document.querySelector("#myTable");
	while (out.firstChild) {
		out.removeChild(out.firstChild);
		}
		     	
	console.log("allreatingvonUser" ); 
	
	console.log("rating" );
	console.log( rating );
	     rating.forEach( item => {
	    	 
	    	
	    	 console.log("hier ist rating :" );    		 
	    	 
	    	 arry=[item.create_dt,item.txt,item.grade,item.image_path] 
	    	
	    	 getResturantName(item.osm_id, arry)
	    	 
	    	 
	});
	
	}
function getResturantName(osmid,arry){
	
	fetch("data/poi/"+osmid) .then(response => response.json()).then(data => getname(data,arry) 
			
		) .catch( error => console.log(error) ); 
	
}
function getnamaufrufen(rating){
	
	rating.forEach( item => { 
		getResturantName(item.osm_id)
		
	});
	
}

function getname(poi,arry){	
	
	
let esGibtname=false;
let einmal2=false;
	
poi.poiTags.forEach( item => { 						
	if(item.tag=="name"){
	esGibtname=true;
}});
	poi.poiTags.forEach( item => { 						
	
		
		
			if(item.tag=="name"&&esGibtname==true){
				//newLengthVonrestaurant= RestaurantName.unshift(item.value);
				RestTest=item.value
				console.log("ein mal :" +RestTest);
				
			
			} 
			if(esGibtname==false){
				
				if(einmal2==false){
				esGibtname=true;
				//newLengthVonrestaurant= RestaurantName.unshift("keine name");
				RestTest="keine name"
					console.log("keine name:" +RestTest);
			}
				}
			
		
		});
	console.log("name jetz:" +RestTest);
	 helf(arry,RestTest)
	
	}
function helf(arry,RestTest  ){
	
	console.log("hier ist  helf ")
	console.log(arry)
	console.log(idnameVontr)
	
			
				//out rating
		var outinfo=document.querySelector("#rating");
		let ratingLang=rating.length;
		//tabele in unten seite in aside
		var out=document.querySelector("#myTable");	
	var x = document.createElement("TR");
	  x.setAttribute("id", idnameVontr);		 
	  document.querySelector("#myTable").appendChild(x);
	 
		 var y = document.createElement("TD");
		  y.setAttribute("style","border: 1px solid black")  
	    var t = document.createTextNode(RestTest);
		     y.appendChild(t);
	        document.getElementById(idnameVontr).appendChild(y);
	        
	// }
	  //in die reihe td erzeugen   
	 for(let i=0;i<4;i++){		 
		 var y = document.createElement("TD");
	      y.setAttribute("style","border: 1px solid black")	
		  if(i==2){
			  if(arry[i]==0){
					var t = document.createElement("p");
					t.innerHTML ="&#9734;&#9734;&#9734;&#9734;&#9734;"
				}
			if(arry[i]==1){
				var t = document.createElement("p");
				t.innerHTML ="&#9733;&#9734;&#9734;&#9734;&#9734;"
			}if(arry[i]==2){
				var t = document.createElement("p");
				t.innerHTML ="&#9733;&#9733;&#9734;&#9734;&#9734;"
			}if(arry[i]==3){
				var t = document.createElement("p");
				t.innerHTML ="&#9733;&#9733;&#9733;&#9734;&#9734;"
			}if(arry[i]==4){
				var t = document.createElement("p");
				t.innerHTML ="&#9733;&#9733;&#9733;&#9733;&#9734;"
			}if(arry[i]==5){
				var t = document.createElement("p");
				t.innerHTML ="&#9733;&#9733;&#9733;&#9733;&#9733;"
			}
			
		  }else{
		  if(i==3){
			 
			 	    	
		    	let im=atob(arry[3])  
		    	
		    	var t = document.createElement("IMG");
		    	t.setAttribute("src", im);
		    	 t.setAttribute("width", "50");
		    	  t.setAttribute("height", "50");
		    	  
		  }else{
			 
			  
		  var t = document.createTextNode(arry[i]);
		  }
		 
		  
	 }
	      y.appendChild(t);
		  document.getElementById(idnameVontr).appendChild(y);   
	 }
	 idnameVontr+="t";
	       console.log( idnameVontr)
	
}
