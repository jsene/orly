
class Phrase {
  constructor(id, phrase, tags, valeurs, valeursauf) {
	this.id = id;
	this.div = null;
	this.set(phrase, tags, valeurs, valeursauf);
    this.texte = "";
	// ?
	this.show = false;

  }
  set(phrase, tags, valeurs, valeursauf) {
	  debugConsoleLog("Phrase " + this.id +"  set : " + phrase + "/"+tags+"/"+valeurs+"/"+valeursauf);
	this.phrase = ""+phrase;
	if(!tags ||tags==null) {debugConsoleLog("TAGS pour " + phrase + " NULL !!!");}
    this.tags   = ""+tags;
    this.valeurs = ""+valeurs;
	this.valeursauf = ""+valeursauf;
  }
  // Positionne le texte = la phrase avec les %param remplacés
  update(meteo, vol) {
    this.texte = this.phrase.replace(/%vent/g, meteo.vent);
    this.texte = this.texte.replace(/%temperature/g, meteo.temp);
	this.texte = this.texte.replace(/%deanimal/g, getDeAnimal());
	this.texte = this.texte.replace(/%uneanimal/g, getUnEAnimal());
	this.texte = this.texte.replace(/%troisanimaux/g, getTroisAnimaux());
	if(vol != null) {
		if(vol.vol!="undefined") {
			this.texte = this.texte.replace(/%vol/g, vol.vol);
		} else {
			this.texte = this.texte.replace(/%vol/g, "[on ne déchiffrait pas]");
		}
		this.texte = this.texte.replace(/%origine/g, vol.origine);
		if(vol.destination !="") {
			this.texte = this.texte.replace(/%destination/g, vol.destination);
		} else {
			// on n'écrit pas si on ne sait pas la destination pr l'instant
			if(this.texte.indexOf('%destination')>-1){
				this.texte = "";
			}
		}
		this.texte = this.texte.replace(/%altitude/g, vol.alt); 
	}
  }
  // Vérifie que la phrase correspond à la météo et aux infos de vol
  // cf. https://openweathermap.org/weather-conditions
  matches(meteo, vol) {
	let ok = 1;
	// Nuages  
	if(this.tags.indexOf('ciel')>-1) {
		if(this.checkValeurListeInMeteoString(meteo.ciel, this.valeurs)) {
			ok *= 1;
		}
		else {
			ok *= 0;
		}
		// TODO jour matin nuit etc.
		if(this.valeurs.indexOf('matin')!=-1) {
			if(meteo.heures_depuis_lever_du_soleil <1.5) {
				ok*=1;
			} else { ok *= 0; }
		} else 
		if(this.valeurs.indexOf('soir')!=-1) {
			if(meteo.heures_avant_coucher_du_soleil <1.5) {
				ok*=1;
			} else { ok *= 0; }
		} else 
		if(this.valeurs.indexOf('jour')!=-1) {
			if(meteo.jour) {
				ok*=1;
			} else { ok *= 0; }
		} else 
		if(this.valeurs.indexOf('nuit')!=-1) {
			if(!meteo.jour) {
				ok*=1;
			} else { ok *= 0; }
		}
	}
	// Pluie 
	if(this.tags.indexOf('pluie')>-1) {
		if(this.checkValeurListeInMeteoString(meteo.ciel, this.valeurs)) {
			ok *= 1;
		}
		else {
			ok *= 0;
		}
	}
	// Atmosphere 
	if(this.tags.indexOf('atmosphere')>-1) {
		if(this.checkValeurListeInMeteoString(meteo.ciel, this.valeurs)) {
			ok *= 1;
		}
		else {
			ok *= 0;
		}
	}
	// Vent
	if(this.tags.indexOf('vent')>-1) {
		if(this.valeurs.indexOf('pas')!=-1){
			if(meteo.vent < 8) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('peu')!=-1){
			if(meteo.vent >=8 && meteo.vent < 15) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('fort')!=-1){
			if(meteo.vent >=15 && meteo.vent < 40) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('tempete')!=-1){
			if(meteo.vent >=40 && meteo.vent < 80) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('ouragan')!=-1){
			if(meteo.vent >=80) {
				ok *=1;
			} else { ok *=0; }
		}
	}
	// Pression
	if(this.tags.indexOf('pression')>-1) {
		if(this.valeurs.indexOf('tempete pression')!=-1) {
			if(meteo.pression<980) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('basse pression')!=-1) {
			if(meteo.pression>=980 && meteo.pression<1000) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('normale pression')!=-1) {
			if(meteo.pression>=1000 && meteo.pression<1025) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('haute pression')!=-1) {
			if(meteo.pression>=1025 && meteo.pression<1050) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('sec pression')!=-1) {
			if(meteo.pression>=1050) {
				ok *=1;
			} else { ok *=0; }
		}
	}
	// Température
	if(this.tags.indexOf('temp')>-1) {
		if(this.valeurs.indexOf('temperature glaciale')!=-1) {
			if(meteo.temp < -3) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('temperature glacee')!=-1) {
			if(meteo.temp >= -3 && meteo.temp < 8) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('temperature froide')!=-1) {
			if(meteo.temp >= 8 && meteo.temp < 14) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('temperature fraiche')!=-1) {
			if(meteo.temp >= 14 && meteo.temp < 17) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('temperature moyenne')!=-1) {
			if(meteo.temp >=17 && meteo.temp < 21) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('temperature chaude')!=-1) {
			if(meteo.temp >=21 && meteo.temp < 31) {
				ok *=1;
			} else { ok *=0; }
		}
		if(this.valeurs.indexOf('temperature canicule')!=-1) {
			if(meteo.temp >=31) {
				ok *=1;
			} else { ok *=0; }
		}
	}
	// Vol
	if(!vol || vol.length<1) {
      if(this.valeurs.indexOf('rien')!=-1) {
			ok *=1;
		} else { ok *=0; }
	}
	if(this.tags.indexOf('vol')==-1) {
		if(this.valeurs.indexOf('atterrissage')!=-1) {
			if(vol.alt < 200 && !vol.monte) {
				ok *=1;
			} else { ok *=0; }
		} else
		if(this.valeurs.indexOf('decollage')!=-1) {
			if(vol.alt < 200 && vol.monte) {
				ok *=1;
			} else { ok *=0; }
		} else
		if(this.valeurs.indexOf('altmoyenne')!=-1 && this.valeurs.indexOf('descend')!=-1) {
			if(vol.alt >= 200 && vol.alt < 900 && !vol.monte) {
				ok *=1;
			} else { ok *=0; }
		} else
		if(this.valeurs.indexOf('altmoyenne')!=-1) {
			if(vol.alt >= 200 && vol.alt < 900) {
				ok *=1;
			} else { ok *=0; }
		} else
		if(this.valeurs.indexOf('altelevee')!=-1) {
			if(vol.alt >=900) {
				ok *=1;
			} else { ok *=0; }
		}
	}
	// il peut aussi y avoir des valeurs à "ne pas" retrouver qui annule la phrase : 
	if(this.valeursauf!="") {
		debugConsoleLog("!- " + this.phrase + " :" + meteo.ciel + " vs " + this.valeursauf + " avec ok = " +ok);
		debugConsoleLog("!- is " + meteo.ciel.indexOf(this.valeursauf));
		let sauf = this.valeursauf.split(",");
		for(let i = 0; i < sauf.length; i++) {
			if(meteo.ciel.indexOf(sauf[i])>-1) {
				debugConsoleLog("!--- elimine " + this.phrase + " par " + sauf[i]);
				ok*=0;
			}
		}
	}
	return ok==1;
  }
  
  // Retourne true si une des valeurs de la liste est dans la chaine meteo 
  checkValeurListeInMeteoString(meteoStr, listeValeur) {
	let arr = listeValeur.split(",");
	for(let i = 0; i < arr.length; i++) {
		if(meteoStr.indexOf(arr[i]) > -1) {
			return true
		}
	}
	return false;
  }
  
  // Écrit la phrase si elle est valide p/r aux données
  ecrit() {
    if(this.texte != "") {
		this.div = createDiv(this.texte);
		this.div.addClass('une_phrase');
		this.div.id(this.id);	
		this.show = true;
		  //debugConsoleLog("ecrit_fondu " + this.id);	
		  this.div.html(this.texte);
		  ecrit_fondu(this.id);
    }
  }
}