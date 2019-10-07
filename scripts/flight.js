
class Flight {
  // voir https://opensky-network.org/apidoc/rest.html
  constructor(data) {
    this.vol = data[1]; // AF134
	var n = "NULL";
	if(data[2]) {
		n = data[2];
	}
    this.origine = getFrenchCountryNameFromShortName(data[2]); // nom court du pays 
	this.destination = ""; // doit ê déterminé par une autre requête....
    this.vitesse = int(data[9] * 3.6); //km/h
	var a = data[7] ? data[7] : 123;
    this.alt = floor(1*a); // metres
	var b = data[13] ? data[13] : 123;
    this.geo_alt = floor(1*b); // metres
    this.monte = data[11] ? data[11] * 1 > 0 : true; // monte ou descend
  }
}
