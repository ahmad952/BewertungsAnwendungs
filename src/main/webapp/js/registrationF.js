// registrationRegel
//global variable
//import {login} from 'js/functions1.js';
var vornameok = false;
var nachnameok = false;
var emailOk = false;
var passwortok=false
var plZundortok=false;
var strasseok =false;
var strassNr=false;
var IDok=false; 


function checkIfAllOk()
{
	let allOk = vornameok && nachnameok && emailOk &&passwortok&&plZundortok&&strasseok&&strassNr&&IDok ;
	if( allOk )
	{
		document.querySelector("#rebutton").disabled=false;
	}	
	else
    {
		document.querySelector("#rebutton").disabled=true;
    }
}

function checkvorNameOnFocus()
{
	document.querySelector("#errorvorName").innerHTML = "";
}

function checkvorNameOnBlur()
{
	if( document.querySelector("#vorname").value.length == 0 )
		 document.querySelector("#errorvorName").innerHTML="muss nicht leer sein"
			 
	if( vornameok == false )
	{
	   document.querySelector("#errorvorName").innerHTML = "Format des Vornamens ist falsch muss zB(Muster)";
	}
}

function checkvorName()
{
	let nameInput = document.querySelector("#vorname").value;
	if( nameInput.length === 0 )
		vornameok = false;
	
	let nameRegEx = /^[A-ZÄÖÜ][a-zäöüß]+(-[A-ZÄÖÜ][a-zäöüß]+)*$/;
	if( nameRegEx.test( nameInput ) == false )
	{
		vornameok = false;
	}
	else
	{
		vornameok = true;
	}
	checkIfAllOk();
}
function checknachNameOnFocus()
{
	document.querySelector("#errornachName").innerHTML = "";
}

function checknachNameOnBlur()
{
	if( document.querySelector("#nachname").value.length == 0 )
		   document.querySelector("#errornachName").innerHTML = "muss nicht leer sein";
	
	if( nachnameok == false )
	{
	   document.querySelector("#errornachName").innerHTML = "Format des nachnamens ist falsch muss B.z(Abc-Def)  ";
	}
}

function checknachName()
{
	let nameInput = document.querySelector("#nachname").value;
	if( nameInput.length === 0 )
		nachnameok = false;
	
	let nameRegEx = /^[A-ZÄÖÜ][a-zäöüß]+(-[A-ZÄÖÜ][a-zäöüß]+)*$/;
	if( nameRegEx.test( nameInput ) == false )
	{
		nachnameok = false;
	}
	else
	{
		nachnameok = true;
	}
	checkIfAllOk();
}
// strass
function checkstrasse()
{
	
	var regExstras = /^[A-ZÄÖÜ]?[a-zäöüß]/
	let strassInput = document.querySelector("#Strasse").value;
	if( strassInput.length === 0 )
		strasseok = false;
	if( regExstras.test( strassInput ) == false )
	{
		strasseok = false;
	}
	else
	{
		strasseok = true;
	}

checkIfAllOk();
}
function checkstrassOnBlur()
{
	
	if( document.querySelector("#Strasse").value.length == 0 ){
		   document.querySelector("#errorstrasse").innerHTML = "muss Strassefeld nicht leer sein";
		  
	
	}if( strasseok == false )
	{
		   document.querySelector("#errorstrasse").innerHTML = "Format der strasse ist falsch   ";
		}
	}
	

function checkstrasseOnFocus()
{
	document.querySelector("#errorstrasse").innerHTML = "";
}
function checkstrasseNr()
{
	let nameInput = document.querySelector("#Nr").value;
	if( nameInput.length === 0 ){
		strassNr =false}else{
			strassNr =true;
		}
	
	checkIfAllOk();
}
function checkstrassNrOnBlur()
{
	if( document.querySelector("#Nr").value.length == 0 ){
		   document.querySelector("#errorstrasse").innerHTML = "muss StrasseNrfeld nicht leer sein";
		  
		   }else{
		strassNr =true}
}

function checkstrasseNrOnFocus()
{
	document.querySelector("#errorstrasse").innerHTML = "";
}
//plz prüfen
function getPlzFromEscher()
{
	 ok=false;
	 
  let divElement = document.querySelector("#out");
  
  
	let stadt =document.querySelector('#stadt');
  let value = document.querySelector('#ort').value;
  if( value.length < 3 )
	  return;
  
  let url = 'http://escher.informatik.hs-kl.de/PlzService/ort?plz=' + value;
  
  fetch(url)
    .then( (response) =>  response.text() )
    .then( (data) => { 
    	  
    	  
    	  data.trim().slice(0, -1).split(/;\s/).forEach( ort => {  		  
    		  console.log(ort)
    		  
    		  if(value.length==5){
    			  ort=ort.substring(6)
    			  stadt.value= ort;
    			  
    			  ok=true; 			    
    			 
    		  }
    		
    		  
    	  } );
    	  
    	  
    	  if(ok==false){
    			let plzRegEx=/^0\d{4}/;
    			 chek1=plzRegEx.test(document.querySelector("#ort").value)
    			 if(!chek1){
    				 document.querySelector("#errorPlz").innerHTML = "muss der PLZ fünf Zahlstelle sein und erste ist 0";
    				 plZundortok=false	
    				 }else{
    					 plZundortok=true;
    					 }
    				 }else{
    					 plZundortok=true;
    				 }
    	  checkIfAllOk();
    	  
    	} )
    .catch( (error) =>  console.error(error) );
 
}
function checkPLZOnBlur()
{
	
	 if( plZundortok==false){
		 document.querySelector("#errorPlz").innerHTML = "muss der PLZ fünf Zahlstelle sein und erste ist 0";
		 }if( document.querySelector("#ort").value.length == 0 || document.querySelector("#stadt").value.length == 0){
			 document.querySelector("#errorPlz").innerHTML="muss nicht leer sein"
				 
			 
		 }
	 }
	

	
	
function checkPLZOnFocus()
{
	document.querySelector("#errorPlz").innerHTML = "";
}
function checkstadtOnFocus(){
	document.querySelector("#errorPlz").innerHTML = "";
}
//
function checkEmailOnFocus()
{
	document.querySelector("#errorEmail").innerHTML = "";
}

function checkEmailOnBlur()
{
	if( document.querySelector("#email").value.length == 0 )
		 document.querySelector("#errorEmail").innerHTML="muss nicht leer sein"
			 
	if( emailOk == false )
	{
	  document.querySelector("#errorEmail").innerHTML = "Format der E-Mail-Adresse ist falsch";
	}
}

function checkEmail()
{
	
	
	let emailInput = document.querySelector("#email").value;
	if( emailInput.length === 0 )
		emailOk = false;
	   
	let emailRegEx = /^\w{4}\d{4,}@stud\.(hs-kl|fh-kl)\.de$/;
	
	if( emailRegEx.test( emailInput ) == false )
	{
		emailOk = false;
	}
	else
	{
		emailOk = true;
	}
	
	checkIfAllOk();
}
// password
//damit ich die probleme (dass die Js ausgeführt wird, bevor die HTML geladen wird.)lösen benutze Grid
var Grid = function(width, height) {
 canvas = document.querySelector("#pwdCanvas");
 
 ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 80, 10);
}
function checkPassword() {
	
	var passwd = document.querySelector("#passwd").value;
	var sicherstarke=document.querySelector("#passwdMsg");
	var len = passwd.length;
	
	var regExHasSpecialSign = /[!§$&?@]/;
	var regExBuchstaben = /[A-ZÄÖÜ]?[a-zäöüß]/;
	
    var haslänge=(len>7);
	var hasMinLen = (len > 5);
	
	var hasSpecialSign = regExHasSpecialSign.test(passwd);
	var hasbuchstabe = 	regExBuchstaben.test(passwd)
	
	if( hasMinLen && hasbuchstabe && hasSpecialSign && haslänge )
	{
		document.querySelector("#passwdMsg").innerHTML = "sehr sicher";
	}
	else if( hasMinLen && hasSpecialSign&&hasbuchstabe )
	{
		document.querySelector("#passwdMsg").innerHTML = "sicher";
	}else if( hasMinLen &&  hasbuchstabe)
	{
		document.querySelector("#passwdMsg").innerHTML = "mittel sicher";
	}
	else if( hasMinLen )
	{
		document.querySelector("#passwdMsg").innerHTML = "akzeptabel";
	}
	else
	{
		document.querySelector("#passwdMsg").innerHTML = "unsicher";
	}

	 size = 0;
	if (hasMinLen)
		size += 4;
	if (hasbuchstabe)
		size += 4;
	if (hasSpecialSign)
		size += 4;
	if(haslänge)
		size+=4

	var c = document.querySelector("#pwdCanvas");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 80, 10);

	var grd = ctx.createLinearGradient(0, 0, size * 20, 0);
	grd.addColorStop(0, "green");
	grd.addColorStop(1, "red");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 80, 10);
	if(sicherstarke.innerText=="sehr sicher"||sicherstarke.innerText=="mittel sicher"||sicherstarke.innerText=="akzeptabel"||sicherstarke.innerText=="sicher" ){
		passwortok=true
	}else{
		passwortok=false
	}
	checkIfAllOk();
}
function checkpassOnBlur()
{
	if( document.querySelector("#passwd").value.length == 0 )
		 document.querySelector("#errorPass").innerHTML="muss nicht leer sein"
	
	if( passwortok == false )
	{
	  document.querySelector("#errorPass").innerHTML = "passwot ist nicht sicher";
	}
}
function checkPLZOnFocus()
{
	document.querySelector("#errorPass").innerHTML = "";
}
// benutzname 
function checkbenutzname(){
	var regExstras = /^\w{4}\d{4,}/
		let strassInput = document.querySelector("#ID").value;
		if( strassInput.length === 0 )
			 IDok=false;
		if( regExstras.test( strassInput ) == false )
		{
			IDok = false;
		}
		else
		{
			IDok = true;
		}

	checkIfAllOk();
	
}
function checkbenutznameonFocus(){
	
	document.querySelector("#errorID").innerHTML = "";
}
function checkbenutznameonBlur(){
	if( document.querySelector("#ID").value.length == 0 &&IDok == false)
		 document.querySelector("#errorID").innerHTML="muss nicht leer sein"

				if( IDok == false )
				{
				  document.querySelector("#errorID").innerHTML = "format muss so sein B.z(alab0003)";
				}
}
// registrieren
function register()
{
	let data = { username : strip_tags(document.querySelector("#ID").value), 
			     password :strip_tags( document.querySelector("#passwd").value),
			     street  :  strip_tags( document.querySelector("#Strasse").value),
			     zip :strip_tags(document.querySelector("#ort").value),
			     city :strip_tags(document.querySelector("#stadt").value),
			     e_Mail :strip_tags(document.querySelector("#email").value),
			     firstname :strip_tags(document.querySelector("#vorname").value),
			     lastname:strip_tags(document.querySelector("#nachname").value),
			     streetNr:strip_tags(document.querySelector("#Nr").value)
			     
			    
			     
			     
			   };

	
	fetch('data/register',   {
	    method: 'post',
	    headers: {
	    	'Content-type': 'application/json' 
	    },
	    body: JSON.stringify(data)
	    
	  })
	.then( response => {
		console.log("aaaaaaa ");
		console.log(response);
		//für login
		 //document.querySelector("#userNameLogin").value=document.querySelector("#ID").value
		// document.querySelector("#passwordLogin").value=document.querySelector("#passwd").value
		document.querySelector("#welcome").innerHTML="herzlich willkommen"+" "+document.querySelector("#ID").value;
		
		Username=value=document.querySelector("#ID").value
		console.log("user von registration "+Username);
		document.querySelector("#ID").value = "";
	    document.querySelector("#passwd").value = "";
	    document.querySelector("#Strasse").value="";
	    document.querySelector("#ort").value="";
	    document.querySelector("#stadt").value="";
	    document.querySelector("#email").value="";
	    document.querySelector("#vorname").value="";
	    document.querySelector("#nachname").value="";
	    document.querySelector("#Nr").value="";
	    document.querySelector("#passwdMsg").innerHTML = "unsicher";
	    document.querySelector("#errorPlz").innerHTML = "";
	    document.querySelector("#errorEmail").innerHTML = "";
	    document.querySelector("#errorstrasse").innerHTML = "";
	    document.querySelector("#errornachName").innerHTML = "";
	    document.querySelector("#errorvorName").innerHTML = "";
	    document.querySelector("#errorPass").innerHTML = "";
	    var c = document.querySelector("#pwdCanvas");
	 	var ctx = c.getContext("2d");
	 	document.querySelector("#rebutton").disabled=true;

	 	ctx.fillStyle =  "#ffffff";
	 	ctx.fillRect(0, 0, 80, 10);
	 	
		if( !response.ok )
		{
			document.querySelector("#accessError").innerHTML = "Benutzer existiert bereits!";
			throw Error(response.statusText);
		}
		else
		{
			changeVisibility();
			changeVisibilityAnmelden();
			 
			document.querySelector("#rating").style.display="block"
			document.querySelector("#MeinBewertung").style.display="block"
			showbewertung();
			
			//login(); auto
		}
	} )
	.catch( error => console.error('Error:', error));
}

function changeVisibility()
{
	
	  var y = document.querySelector("#abmelden");
	  var x = document.querySelector("#registration");
	  if (x.style.display === "block"&&x.style.display === "block") {
	    x.style.display = "none";
	    y.style.display = "none";
	  } else {
		  y.style.display = "block";
	    x.style.display = "block";
	  }
	  
	 
}


