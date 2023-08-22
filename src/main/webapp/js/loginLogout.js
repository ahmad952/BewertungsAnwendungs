 
 
 
 
function login()
{
	
	var data = { username : strip_tags(document.querySelector("#userNameLogin").value), 
		         password : strip_tags(document.querySelector("#passwordLogin").value) ,
		        
		         
		   };
	
		
	
	
	fetch('data/logInOut',   {
	    method: 'post',
	    headers: {
	    	'Content-type': 'application/json' 
	    },
	    body: JSON.stringify(data)
	  })
	  .then( response => {
		  
		    
		    
			if( !response.ok )
			{
				alert("Benutzerdaten sind fehlerhaft!"); 
				throw Error(response.statusText);
			}
			else
			{
				document.querySelector("#welcome").innerHTML="herzlich willkommen"+" "+document.querySelector("#userNameLogin").value;
				  Username=document.querySelector("#userNameLogin").value;
				    document.querySelector("#userNameLogin").value = "";
				    document.querySelector("#passwordLogin").value = "";
				changeVisibilityAnmelden();
				document.querySelector("#rating").style.display="block"
			    document.querySelector("#MeinBewertung").style.display="block"
			}
		} )
	 .catch( error => console.error('Error:', error));
	
} 
 
function changeVisibilityAnmelden()
{
	
	console.log("user von fucktions1 "+Username);
	
	  var x = document.querySelector("#anmelden");
	  if (x.style.display === "block") {
	    x.style.display = "none";
	    
	    showbewertung();
	    changeVisibilityAbmelden()
	    //damit hier  beide nicht glecih zeitech anrufen  
	  /*  let g=function(){
	    	setTimeout( function(){
	    		getuserRating();
	    	  }, 500 );
	    
	    }
	    
	    let f= function(callback){
	    	
	    	helfegetuserRating();
	    	
	    	callback();
	    }
	    f(g);*/
	  } else {
	    x.style.display = "block";
	  }
	    
	  getuserRating() 
	 
}

function changeVisibilityRatingDiv()
{
	var y=  document.querySelector("#MeinBewertung");
	 var x = document.querySelector("#rating");
	  if (x.style.display === "block") {
	    x.style.display = "none";
	    y.style.display = "none";
}
}

function changeVisibilityAbmelden()
{
	 
	  var x = document.querySelector("#abmelden");
	  if (x.style.display === "block") {
	    x.style.display = "none";
	    
	    
	    
	  } else {
	    x.style.display = "block";
	  }
	  
	 
}

function logout()
{
	fetch('data/logInOut',   {
	    method: 'delete'
	  })
	  .then( response => {
		  if( response.ok )
	      {
			  document.querySelector("#anmelden").style.display="block"		  
			  changeVisibilityAbmelden()
			  changeVisibilityRatingDiv()
		  }  
	  } )
	  .catch( error => console.error('Error:', error) );
	hidebewertung()	
	Username="";
	console.log("username ist jtzt "+Username);
	
}

function passunduserOnFocus()
{
	document.querySelector("#anmeldError").innerHTML = "";
}