
// Supprime la première phrase selon le nb de phrases total
// Avant cela on ajoute un proto
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

// Retire un div du DOM
function removeDiv(did) {
	debugConsoleLog("dom remove "+did);
	// todo : pourquoi ce test ? pas logique qu'il faille tester
	if(document.getElementById(did)) {
		document.getElementById(did).remove();
	}
}

function debugConsoleLog(str) {
	//debugConsoleLog(str);
}
function debugPhrases(phrases) {
	debugConsoleLog("--- DEBUG PHRASES ----");
	var nnul= 0;
	for(let p of phrases) {
		if (p.texte == "") {
			nnul++;
			debugConsoleLog(p.phrase);
		}
	}
	debugConsoleLog(">>" + nnul + " / " + phrases.length + "<<");
}

function debugPhrasesRain(phrases) {
	for(var i = 0 ; i < phrases.length; i++) {
		if (phrases[i].tags == "rain") {
			debugConsoleLog("--- DEBUG RAIN ----");
			debugConsoleLog(phrases[i].valeurs );
			debugConsoleLog(phrases[i].phrase );
			debugConsoleLog(phrases[i].texte );
		}
	}
}