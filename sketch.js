// Clé API pr dév
const openskyLocalId =""; // no need
const openweatherLocalId = "408d9741e4c38be378a46c326b565f86";
// Clé API pr prod
const openskyProdId ="";// no need
const openweatherProdId = "d47696b2c2d85d12620be33c94ac69d2";
// URL json
let orlyFlightsURL = "https://opensky-network.org/api/states/all?lamin=48.70&lomin=2.30&lamax=48.76&lomax=2.45";
let flightSearchURL = "https://opensky-network.org/api/flights/aircraft?icao24=%vol&begin=%secondbegin&end=%secondend";
let orlyWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Orly,fr&units=metric&appid=";
let sunsetUrl="https://api.sunrise-sunset.org/json?lat=48.730068&lng=2.400707&date=today";
orlyFlightsURL += openskyProdId;
orlyWeatherURL += openweatherProdId;
let phrasesJsonUrl = "phrases/phrases.json";
//
let meteo; // objet meteo avec l'open data weather
let flights = []; // open data des vols
var phrases = []; // phrases stockées préparées 
var tags = []; // tags de ces phrases pr les filtrer
let maintenant;  // div affichant date/heure now
var loaded = false; // si rien n'est chargé
var delay_phrases = 8000; // phrase lié à méteo/vol
var delay_sans_contexte = 15000; // on ajoute une phrase environ ttes les...
var delay_la_nuit = 23000; // idem
var delay_recit = 32000;
var h_sans_contexte; // handlers de ces timeouts pour pouvoir les killer
var h_de_nuit;
var h_recit;
var div_sans_contexte = []; // phrases hors vol et météo, qu'on ajoute ttes les...
var div_de_nuit = []; // idem pr les heures de nuit
var div_recit = [];
var cestlanuit = false; // si c'et la nuit...
var maxPhrasesDisplayed = 10; // nb max de phrases à afficher en même temps
var minPhrasesDisplayed = 5; // il en faut quand même un peu (

// Premier chargement
function preload() {
	getJSONs();
}
///////////////////////////////////////////////// SETUP
function setup() {
  // on charge les phrases à chq fois sinon en cas de chgt de temps, on a plus rien !
  getPhrases(phrasesJsonUrl);
  
  // préparation de l'heure qui tourne
  maintenant = createDiv(getCleanDate());
  maintenant.addClass("ladate");
  
  // appels régulier des fonctions d'affichage
  setInterval(ecritPhrases, delay_phrases);
  setInterval(function() {maintenant.html(getCleanDate());}, 230);
  
  // on teste si c'est la nuit
  estCeLaNuit();
  setInterval(estCeLaNuit, 120000);
  
  // de temps en temps on prend une phrase sans contexte au hasard 
  h_sans_contexte = setTimeout(ecrit_sans_contexte, delay_sans_contexte);
  // on de nuit, donc (le test est dans la f°)
  h_de_nuit = setInterval(ecrit_la_nuit, delay_la_nuit);
  // un récit
  h_recit = setInterval(ecrit_recit, delay_recit);
}

function draw() {
	//inutile ici mais à garder pr p5.js
}
// selon les données api sunset chargée de la météo on vérifie
function estCeLaNuit() {
	if(meteo) {	
		cestlanuit = !meteo.jour;
	}
	return cestlanuit;
}
var _Guid = 1;
function _getGuid() {
	return "phrase_sc_" + _Guid ++;
}
// on écrit moins si pas de vol
function ecrit_la_nuit() {
	clearTimeout(h_de_nuit);
	if(cestlanuit) {
		var test_sans_vol = 0;
		if (flights && flights.length>0 && meteo && phrases) {
			test_sans_vol = random(1);
		}
		if(test_sans_vol < 0.3) {
			var d = createDiv(getPhraseNuit());
			d.addClass('une_phrase');
			d.id(_getGuid());
			div_de_nuit.push( d );
			ecrit_fondu( d.id() );
		}
	}
	h_de_nuit = setTimeout(ecrit_la_nuit, floor(random(delay_la_nuit - 5000, delay_la_nuit + 5000)));
}
// on écrit moins si pas de vol
function ecrit_sans_contexte() {
	clearTimeout(h_sans_contexte);
	var test_sans_vol = 0;
	if (flights && flights.length>0 && meteo && phrases) {
		test_sans_vol = random(1);
	}
	if(test_sans_vol < 0.3) {
		//debugConsoleLog("++++ Sans Ctxt");
		var dsc = createDiv(getPhraseSansContexte());
		dsc.addClass('une_phrase');
		dsc.id(_getGuid());
		div_sans_contexte.push( dsc );
		//debugConsoleLog("fadeIN " + dsc.id() + " - " + dsc.html());
		ecrit_fondu( dsc.id() );
	}
	h_sans_contexte = setTimeout(ecrit_sans_contexte, floor(random(delay_sans_contexte, delay_sans_contexte + 10000)) );
}	
// un récit ?  mais pas trop souvent, et que le jour et pas trop la nuit
function ecrit_recit() {
	if(!meteo) { return; }
	if(meteo.jour || meteo.heures_depuis_lever_du_soleil >-2) {
		clearTimeout(h_recit);
		var test_sans_vol = random(1);
		if (flights && flights.length>0 && meteo && phrases) {
			test_sans_vol = random(2);
		}
		//debugConsoleLog("++++ Récit (alea: " + test_sans_vol + ")");
		if(test_sans_vol < 0.3) {
			//debugConsoleLog("écrit une phrase de récit");
			var dsc = createDiv(getPhraseRecit());
			dsc.addClass('une_phrase');
			dsc.id(_getGuid());
			div_recit.push( dsc );
			//debugConsoleLog("fadeIN " + dsc.id() + " - " + dsc.html());
			ecrit_fondu( dsc.id() );
		}
		h_recit = setTimeout(ecrit_recit, floor(random(delay_recit-2000, delay_recit+4000)) );
	}
}
// Ecriture des phrases régulières
function ecritPhrases() {
	getPhrases(phrasesJsonUrl); // on va à chaque fois
	ecritPhrasesSelonVols(); 
	getJSONs();
	avanceScroll();
	return; 
}
// avanceScroll
function avanceScroll() {
	if(phrases && phrases.length>0) {
		//debugConsoleLog("-----^^^^");
		/*var phrasesElts = document.getElementsByClassName('une_phrase');
		if(phrasesElts && phrasesElts.length > maxPhrasesDisplayed) {
			for(let i = 0 ; i < (phrasesElts.length-maxPhrasesDisplayed); i++) {
				var elt = document.getElementsByClassName('une_phrase')[0];
				if(elt) { elt.remove(); }
			}
		}*/
		window.scroll(0,1000);
	}
}

// Algo principale d'affichage des phrases selon tags/valeurs
function ecritPhrasesSelonVols() {
	// on mélange les phrases à chaque fois
	shuffle(phrases, true);
	var tags_ecrits = [];
	var max_phrases_maintenant = floor(random(2,5));
	if (flights && flights.length>0 && meteo && phrases) {
		for(let vi = 0; vi < flights.length; vi ++) {
			for (let pi = 0; pi < max_phrases_maintenant; pi++) {
				let ptag_str = phrases[pi].tags;
				let ptags = [];
				let deja_ecrit = false;
				// On prend les tags de la phrase
				if(ptag_str.indexOf(",")>0) {
					for(let pt of ptag_str.split(",")) {
						ptags.push(pt);
					}
				} else {
					ptags.push(ptag_str);
				}
				// si un de ses tags a été écrit on va zapper, parofis
				for(let test of ptags) {
					if(tags_ecrits.indexOf(test) >-1) {
						// on écrit quand même parfois, le droit à la répétition...
						deja_ecrit = random(1) < 0.8 ? true: false;
					}
				}
				// donc sinon on l'écrit
				if(!deja_ecrit) {
					if(phrases[pi].matches(meteo, flights[vi])) {
						phrases[pi].update(meteo, flights[vi]);
						phrases[pi].ecrit(); // <- Crée le div html ici : phrases[pi].div
						// on met à jour les tags déjà écrits
						for(let nouv of ptags) {
							tags_ecrits.push(nouv);
						}
					} else {
					//	debugConsoleLog(pi +"("+phrases[pi].id+"):"+phrases[pi].phrase + " does not match " + meteo.ciel + " & " + flights[vi].vol);
					}					
				}
			}
		}
	}
}
// CHARGEMENTS API
///////////////////////////////////////////////// GET JSONs
function getJSONs() {
//  getFlights("assets/dummy-noflights.json");
//	getFlights("assets/dummy-flights.json");

//	getWeather("assets/dummy-weather-rain.json");

	getFlights(orlyFlightsURL);
	getWeather(orlyWeatherURL);
	getSunsetTime(sunsetUrl);
}

///////////////////////////////////////////////// GET SUNSET
function getSunsetTime(url) {
	debugConsoleLog("*** Fetching " + url);
	fetch(url) // 1
		.then(validateResponse) // 2
		.then(readResponseAsJSON) // 3
		.then(initSunset) // 4
		.catch(logError);
}
///////////////////////////////////////////////// GET PHRASES
function getPhrases(url) {
  debugConsoleLog("*** Fetching phrases " + url);
  fetch(url) // 1
    .then(validateResponse) // 2
    .then(readResponseAsJSON) // 3
    .then(initPhrases) // 4
    .catch(logError);
}

///////////////////////////////////////////////// GET VOLS
function getFlights(url) {
  debugConsoleLog("*** Fetching flights " + url);
  fetch(url) // 1
    .then(validateResponse) // 2
    .then(readResponseAsJSON) // 3
    .then(initFlights) // 4
    .catch(logError);

}
function searchFlight(url, vol) {
	var endTime   = floor(Date.now()/1000)+ 8*3600;
	var beginTime = floor(Date.now()/1000)-16*3600;
	url = url.replace(/%vol/g, vol);
	url = url.replace(/%secondbegin/g, beginTime);
	url = url.replace(/%secondend/g, endTime);
	debugConsoleLog("*** Fetching " + url);
	fetch(url) // 1
		.then(validateResponse) // 2
		.then(readResponseAsJSON) // 3
		.then(initFlightSearched) // 4
		.catch(logError);
}

///////////////////////////////////////////////// GET METEO
function getWeather(url) {
  debugConsoleLog("*** Fetching weather " + url);
  fetch(url) // 1
    .then(validateResponse) // 2
    .then(readResponseAsJSON) // 3
    .then(initWeather) // 4
    .catch(logError);

}

// INITIALISATION DES VALEURS récupérées par les API
///////////////////////////////////////////////// INIT PHRASES
let loggedDone = false;
function initPhrases(data) {
  if (data != null && data.phrases != null) {
    for (let i = 0; i < data.phrases.length; i++) {
		if(!loggedDone) {
			console.log("Orly, par Joachim Séné. Phrases en v" + data.version + ", dernière mise à jour : " + data.update);
			loggedDone = true;
		}
		//print(data.phrases[i]);
		let p = data.phrases[i];
		// Mise à jour
		let pid = "phrase_"+(i+1);
		if(phrases.length>0) {
			let trouve = false;
			for(let j = 0 ; j < phrases.length; j++) {
				// On cherche la phrase en cas de mise à jour
				if(phrases[j].id == pid) {
					trouve = true;
					phrases[j].set(p.phrase, p.tags, p.valeurs, p.valeursauf);
					break; 
				}
			}
			if(!trouve) {
				phrases.push(new Phrase(pid, p.phrase, p.tags, p.valeurs, p.valeursauf));
				ajoute_tags(p.tags);
			}
		} else {
			// Création
			phrases.push(new Phrase(pid, p.phrase, p.tags, p.valeurs, p.valeursauf));	
			ajoute_tags(p.tags);
		}
    }
  }
}
// conserve l'ensemble des tags
function ajoute_tags(str) {
	if(str && str != "") {
		if(str.indexOf(",") ==-1) {
			if(tags.indexOf(str) == -1) {
				tags.push(str);
			}
		} else {
			var arr_t = str.split(",");
			for(t of arr_t) {
				if(tags.indexOf(t) == -1) {
					tags.push(t);
				}
			}
		}
	}
}
///////////////////////////////////////////////// INIT VOLS
function initFlights(data) {
	if (data && data.states != null) {
		flights = [];
		for (let f of data.states) {
			flights.push(new Flight(f));
		}
		shuffle(flights);
	}
	if(data.states == null) {
		debugConsoleLog("( AUCUN VOL )");
		flights = [];
		document.getElementById("no_flight").innerHTML="Aucun avion en vue, le ciel vide";
	}else {
		document.getElementById("no_flight").innerHTML="";
	}

	if(meteo && !loaded) {
		loaded = true;
		document.getElementById("loading").style = "display:none;";
		ecritPhrases();
	}
}	
function initFlightSearched(data) {
	if(data) {
		for(let d of data){
			
		}
	}
}

	
///////////////////////////////////////////////// INIT METEO
function initWeather(responseAsJson) {
  let d = responseAsJson;

  meteo = new Weather(d.main.temp, d.weather[0].description,
    d.main.pressure, d.main.humidity,
    d.wind.speed);
	
	if(flights && flights.length>0 && !loaded) {
		loaded = true;
		document.getElementById("loading").style = "display:none;";
		ecritPhrases();
	}
}

///////////////////////////////////////////////// INIT SUNSET TIME
function initSunset(responseAsJson) {
	let d = responseAsJson;
	if(meteo && d.results) {
		// attention, retourne 8:34:58 PM
		// qu'il faut transformer avec l'année
		
		let sunset_datetime = getDateTimeFromApiSunsetSunriseFormat(d.results.sunset);
		let sunrise_datetime = getDateTimeFromApiSunsetSunriseFormat(d.results.sunrise);
		meteo.setSunsetSunriseWhen(sunrise_datetime, sunset_datetime);
	}
}
// de la date chelou de l'API sunset, on tire au clair par javascript
function getDateTimeFromApiSunsetSunriseFormat(sundate) {
	let sun_datetime = new Date();
	sun_datetime.setFullYear( sun_datetime.getFullYear() );
	sun_datetime.setMonth( sun_datetime.getMonth() );
	sun_datetime.setDate( sun_datetime.getDate() );

	let sh_ampm = sundate.split(" ")[1];
	let sh_hms  = sundate.split(" ")[0].split(":");
	let sh_h = sh_hms[0]*1 + (sh_ampm =="PM" ? 12 : 0);
	// Gestion de l'heure été/hiver
	let offset =  sun_datetime.getTimezoneOffset()/60;
	sh_h -= offset;
	let sh_m = sh_hms[1];
	let sh_s = sh_hms[2];
	sun_datetime.setHours(sh_h);
	sun_datetime.setMinutes(sh_m);
	sun_datetime.setSeconds(sh_s);
	return sun_datetime;
}

///////////////////////////////////////////////// ERREURS
function logError(err) {
  debugConsoleLog("!! Err: " + err);
}

// pour tout n fourni retourne la valeur sur 2 caractères 
// avec 0 dizaine si nécessaire
function f2(n) {
	return ("0" +  n).slice(-2);
}
// affiche la date proprement
function getCleanDate() {
	var d = new Date(Date.now());
	 jj = f2(d.getDate());
	mm = f2(d.getMonth()+1);
	yy = d.getFullYear();
	hh = f2(d.getHours());
	mi = f2(d.getMinutes());
	s = f2(d.getSeconds());
	return jj+"/"+mm+"/"+yy + " " + hh+":"+mi+":"+s;
}
