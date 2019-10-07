
class Weather {
  constructor(temp, ciel, pression, humidite, vent) {
    this.temp = int(1*	temp);
    this.ciel = ciel;
    this.pression = 1*pression;
    this.humidite = 1*humidite;
    this.vent = int(vent * 3.6);
	this.lever_du_soleil = -1; 
	this.coucher_du_soleil = -1; 
	this.heures_avant_coucher_du_soleil = -1; 
	this.heures_depuis_lever_du_soleil = -1; 
	this.jour = true;
	this.hdrise = 0;
	this.hdset = 0;
  }
  
  setSunsetSunriseWhen(sunrisetime, sunsettime){
	this.lever_du_soleil = new Date(sunrisetime); 
	this.coucher_du_soleil = new Date(sunsettime); 
	debugConsoleLog("set rise/set : " + this.lever_du_soleil + ", "  +this.coucher_du_soleil);
	
	var dNow = new Date(Date.now());
	var diffSunset = this.coucher_du_soleil.getTime() - dNow.getTime();
	var hDiffSunset = diffSunset / (1000 * 3600);
	
	var diffSunrise =  dNow.getTime() - this.lever_du_soleil.getTime();
	var hDiffSunrise = diffSunrise / (1000 * 3600);
	
	this.heures_avant_coucher_du_soleil = floor(hDiffSunset); 
	this.heures_depuis_lever_du_soleil = floor(hDiffSunrise);
	debugConsoleLog("H-nuit = " +this.heures_avant_coucher_du_soleil);
	var diffSunrise = this.lever_du_soleil.getTime() - dNow.getTime();
	var hDiffSunrise = diffSunrise / (1000 * 3600);	
		
	this.hdrise = hDiffSunrise;
	this.hdset = hDiffSunset;

	if(hDiffSunrise * hDiffSunset < 0) {
		this.jour = true;
	}
	else {
		this.jour = false;
	}
	
	
  }
}