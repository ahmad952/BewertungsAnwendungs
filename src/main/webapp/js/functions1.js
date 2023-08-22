let mymap;
let redIcon;
let blauIcon;
var Username;
let OsmID=0;
let selectedMarker;
let UserID;
let userneamFürGäste;
var RestTest="un";
var hefebase64;
window.onload = function() {
	         mymap = L.map('mapid').setView([49.250723, 7.377122 ],13); 

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
	                +'access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpe'
	                +'jY4NXVycTA2emYycXBndHRqcmZ3N3gifQ'
	                +'.rJcFIG214AriISLbB6B5aw',
	   {  maxZoom     : 18,
	      attribution : 'Map data &copy; '
	                     + '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
	                     + ' contributors, '
	                     + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">'
	                     + 'CC-BY-SA</a>, '
	                     + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',	
	      id         : 'mapbox.streets' 
	   }).addTo(mymap);
	
	redIcon = new L.Icon({
		iconUrl: './icon/marker-icon-red.png',
		shadowUrl: './icon/marker-shadow.png', 
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34], 
		shadowSize: [41, 41] });

	blueIcon = new L.Icon({ 
		iconUrl: './icon/marker-icon-blue.png', 
		shadowUrl: './icon/marker-shadow.png',
		iconSize: [25, 41], 
		iconAnchor: [12, 41], 
		popupAnchor: [1, -34], 
		shadowSize: [41, 41]
	});
	showPoisOnMap ();
	 console.log("window onload end");

}

function showPoisOnMap() { 
	 console.log("start show pois ");

	fetch("data/poi") .then(response => response.json()).then(data => data.forEach( 
			poi => {
		let callback = poiSelectionCallback(poi); 
		L.marker([poi.lat, poi.lon],
				{icon: blueIcon}).addTo(mymap).on('click', callback);
		} ) 
		) .catch( error => console.log(error) ); 
	}

function poiSelectionCallback(poi) {
	//damit ich prüfe ,ob es tag name gibt es
	var tagname=false;
	var einmal=false;
	//out infos
	var outinfo=document.querySelector("#daten");
	
	//out in rechte seite in aside
	var out=document.querySelector("#output");
	
	
	
	return function(event) {
		//damit infoButton zeigen 
		showinfoButton()
		//damit die credtede nord(p) löchen
		while (outinfo.firstChild) {
			outinfo.removeChild(outinfo.firstChild);
			}
		if (selectedMarker != null) { 
		selectedMarker.setIcon(blueIcon);
		} selectedMarker = event.target; selectedMarker.setIcon(redIcon);
		var tagname=false;
		var einmal=false;
console.log("Event" ); 
console.log( event );
console.log("Poi" );
console.log( poi );
//damit ich prüfe ,ob es tag name gibt es
poi.poiTags.forEach( item => { 
	if(item.tag=="name"){
		tagname=true;
	}
});

poi.poiTags.forEach( item => { 
	console.log( item.tag + " " + item.value ); 
	// hier werden nordes erstellt und datrin ist infomationen 
	let p = document.createElement('p');	
	p.appendChild(document.createTextNode(item.tag + ":  " + item.value ));
	outinfo.appendChild(p);
	// hier wird  nur name  zeigen 
	//undbewertung auch	
	if(item.tag=="name"&&tagname==true){
	out.innerHTML= item.value	
	//osmid
	OsmID=item.osmId
	console.log("hier von ist osmID  :"+OsmID)
	
		ratingdata(item.osmId);	
	
	
	absendebutten()
	}
	if(tagname==false){
		OsmID=item.osmId
		out.innerHTML= "keine name";
		if(einmal==false){
			console.log("inein mal "+item.osmId)
			RestTest="keines name"
			einmal=true;
			ratingdata(item.osmId);	
			absendebutten()
		}
		
		
	}
			
	} );

}
}

// zeigen was in info
function  showInput(){
	
	document.querySelector("#infos").style.display = "block";
}


// schliessen fenster von infos
function hideinfos(){
	document.querySelector("#infos").style.display = "none";
}
function showinfoButton() {
	document.querySelector("#infoButten").style.display = "block";
}
//zeigen fennster für registieren 
function showRegistration() {
	document.querySelector("#registration").style.display = "block";
    //document.getElementById("registration").style.display = "block";
		
}

function hideRegistration() {
	document.querySelector("#registration").style.display = "none";
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
    document.querySelector("#passwdMsg").innerHTML = "unsicher";
    document.querySelector("#errorPlz").innerHTML = "";
    document.querySelector("#errorEmail").innerHTML = "";
    document.querySelector("#errorstrasse").innerHTML = "";
    document.querySelector("#errornachName").innerHTML = "";
    document.querySelector("#errorvorName").innerHTML = "";
    document.querySelector("#errorPass").innerHTML = "";
     c = document.querySelector("#pwdCanvas");
     var c = document.querySelector("#pwdCanvas");
 	var ctx = c.getContext("2d");

 	ctx.fillStyle =  "#ffffff";
 	ctx.fillRect(0, 0, 80, 10);

 	var grd = ctx.createLinearGradient(0, 0, 200, 0);
 	
    //document.getElementById("registration").style.display = "none";
}
//zeigen abmelden 
function showabmelden() {
	document.querySelector("#abmelden").style.display = "block";
    //document.getElementById("registration").style.display = "block";
	
	
}
// login

//bewertung
function showbewertung() {
	document.querySelector("#ratingGast").style.height="30%"
	document.querySelector("#bewertungsDiv").style.display = "block";
	document.querySelector("#h3text").style.display = "block";
}
function hidebewertung(){
	document.querySelector("#ratingGast").style.height="70%"
	document.querySelector("#bewertungsDiv").style.display = "none";
	document.querySelector("#h3text").style.display = "none";
	
} 
//sicherheit es wird all zeichnen die javas und HTML   gefiltert 
function strip_tags(str) {
    str = str.toString();
    
    return str.replace(/<\/?[^>]+>/gi, '');
}


