var dureeAffichageFonduMin = 28000;
var dureeAffichageFonduMax = 76000;
var phr_sans_contexte = new Array(
	"À Orly",
	"La nuit était figée, comme sans récit", 
	"Ça se passait maintenant",
	"Le bruit des portes automatiques",
	"La longueur des tapis roulants",
	"Le claquement des chariots à bagages",
	"Les gens perdus",
	"Les souvenirs d'un ancien film en noir et blanc, immobile et terrifiant", 
	"La vue d'un horizon extrêmement proche, en raison des pistes plates", 
	"Les perspectives truquées par la surface fine, invisible, du sol",
	"Toute la place donnée au ciel", 
	"La lumière toujours tamisée, à l'intérieur, la moquette, le brouhaha forcé au silence, le silence à la rumeur",
	"Les gens pressés",
	"L'âge du marbre, du granit, les valises et les semelles, les regards",
	"Une présence bien longue pour ces bâtiments, ce lieu de passage",
	"On pouvait s'asseoir, fermer les yeux, s'imaginer partir", 
	"Les jours glissait dans les turbulences grises des avions", 
	"Les couloirs aériens invisibles et infranchissables",
	"La jetée, l'entonnoir de la Tour de contrôle, les queues d'avions", 
	"Du macadam par kilomètre, si lisse",
	"Code IATA : ORY", 
	"L'aéroport d'Orly existait depuis 1918, quand il était un 'camp d'aviation'",
	"Une aérogare métallique, qui avait été conçue par Henri Vicariot", 
	"Parfois on avait beau ouvrir les yeux, on ne voyait pas son vol sur le tableau",
	"Le parfum et l'ambiance des différents commerces clinquants",
	"On ne comprenait rien dans ces allées, ces venues, ces agitations",
	"Baleine échouée en bout de piste", 
	"Pour les riverains Orly c'était à leurs fenêtres des avions vroum qui passaient trop fort",
	"Dans les jardins riverains les avions vroumaient plus fort que ne zinzinulaient les oiseaux",
	"Baleine échouée près du terminal sud",
	"On se trompait d'escalier, de couloir, de porte d'embarquement",
	"Les vols marqués 'delayed'",
	"L'attente légèrement paniquée",
	"Les cadeaux achetés au dernier moment",
	"Le contrôle des bagages, le contrôle des passeports, le contrôle des corps, et puis les magasins 'tax free'",
	"Le bruit assourdissant pouvait rendre fou, même fenêtres fermées, dans les communes voisines",
	"La lente torture par décibels des réacteurs au-dessus des maisons voisines",
	"Une déflagration au ralenti",
	"On imaginait pas une vie silencieuse, ici",
	"Les machines se rendaient à l'intersection des pistes voir les dégâts causés par la baleine échouée",
	"Les départs repoussés pour cause de baleine échouée",
	"Les hautes baies vitrées éblouissantes donnant sur les pistes",
	"Le contrôle ADN aléatoire pouvait tomber sur n'importe qui et pour rien",
	"La sonnerie du détecteur de métal inquiétait toujours"
	);
	
var phr_recit = new Array(
	"Tandis que certains vols étaient retardées par la baleine échouée à l'intersection de deux pistes",
	"La silhouette se détachait de la foule, par sa posture, son regard paniqué",
	"La silhouette semblait chercher son chemin, et une fois trouvé, elle l'empruntait sur quelques mètres avant de faire demi-tour",
	"On aurait pu croire que la silhouette se cachait derrière les bacs de plantes, les piliers, les panneaux publicitaires",
	"J'aurais jurer voir la silhouette tirer d'abord une valise grise, puis une noire",
	"Je me décidais à suivre la silhouette étrange qui frolait les murs", 
	"C'était peut-être important de la suivre, le décor entier m'y poussait",
	"Elle glissait dans la foule, tirant sa mystérieuse valise",
	"La silhouette s'engouffra dans un ascenseur, je pris l'escalier",
	"Je perdis de vue la silhouette",
	"Il faut continuer de marcher",
	"Une vitrine clignote, tout semble clignoter ici, la silhouette elle-même apparaît, disparaît",
	"Je ne savais plus où aller, si je devais la suivre encore",
	"J'ai peur de rater mon avion",
	"Je ne savais plus si j'étais ici pour prendre l'avion ou suivre quelqu'un",
	"Qu'y a-t-il dans sa valise ?",
	"C'est alors que je sentis, au fond de ma poche, un revolver",
	"J'avais peut-être une mission à accomplir ici",
	"Me défendre ou attaquer, je ne savais pas ce que je faisais ici",
	"Parmi les passagers immobiles, la silhouette que j'avais vu tout à l'heure",
	"Mais, était-ce bien elle, comment savoir ?",
	"Je croyais l'avoir aperçue se diriger vers le terminal sud",
	"La silhouette longeait les panneaux publicitaires à s'y glisser, devenir modèle, produit, couleur",
	"Dans l'ombre, la silhouette devenait naturellement ombre, mais dans la lumière, lumière aussi, disparaissait aussi", 
	"Je la perdais de vue en la prenant pour touriste, personnel de l'aéroport, un instant de trop",
	"Où allais-je, finalement ?"
	);
var phr_nuit = new Array(
	"Les nuits sont plus profondes et longues dans les aéroports",
	"Les nuits, surtout, étaient longues",
	"L'alignement des projecteurs, les lumières de signalisation vertes", 
	"Les nuits claires, les nuits nuageuses, toutes pareilles, projecteurs allumées, jaunes",
	"L'espacement des vols nocturnes rapprochait les passagers",
	"Un vol nocturne",
	"Y a-t-il un équivalent européen du red-eye flight Américain ?", 
	"Nuit trop longue pour un vol complet",
	"Toujours quelqu'un d'éveillé ici",
	"Tout s'aggrave et ralentit, la nuit", 
	"Les affiches publicitaires rétro-éclairées",
	"Les zones d'attente éclairées par les écrans où s'animent paysages, vols, promesses, tarifs", 
	"Une planète brillant plus que les étoiles, sur laquelle on irait jamais",
	"Seule la nuit pouvait calmer le grand tumulte",
	"Comme s'il manquait quelque chose, dans l'aéroport, la nuit",
	"Toujours éclairé, on ne voyait jamais le ciel, la nuit"
);
// liste des animaux selon déterminant
var arr_DeAnimal = new Array(
"d'écureuil",
"d'aigle",
"d'éléphant",
"de renard",
"de cheval",
"de poussin", 
"de souris",
"de chat",
"de chien à grandes oreilles",
"de poisson à fines écailles",
"de baleine",
"d'ours endormi",
"de serpent déroulé",
"de chameau",
"de cigogne aux ailes déployées",
"de singe suspendu"
);
var arr_UnEAnimal = new Array(
"un sanglier",
"une vache",
"un poney",
"une oie marchant au pas boité",
"une tortue",
"un taureau aux cornes gigantesques",
"un toucan au large bec",
"un requin",
"une autruche", 
"un rat à longue queue jusqu'à l'horizon", 
"une grenouille à cinq pattes",
"une méduse",
"une baleine échouée"
);
var arr_animal = new Array(
"écureuil",
"aigle",
"éléphant",
"renard",
"cheval",
"poussin", 
"souris",
"chat",
"chien",
"poisson",
"baleine",
"ours",
"serpent",
"chameau",
"cigogne",
"singe",
"sanglier",
"vache",
"poney",
"oie",
"tortue",
"taureau",
"toucan",
"requin",
"autruche", 
"rat", 
"grenouille",
"méduse",
"baleine"
);

function getPhraseSansContexte() {
	return phr_sans_contexte[ floor(random(0, phr_sans_contexte.length)) ];
}

function getPhraseNuit() {
	return phr_nuit[ floor(random(0, phr_nuit.length)) ];
}

function getPhraseRecit() {
	return phr_recit[ floor(random(0, phr_recit.length)) ];
}
function getDeAnimal() {
	return arr_DeAnimal[ floor(random(0, arr_DeAnimal.length)) ];
}
function getUnEAnimal() {
	return arr_UnEAnimal[ floor(random(0, arr_UnEAnimal.length)) ];
}
function getTroisAnimaux() {
	var a1 = floor(random(0, arr_animal.length)) ;
	var a2 = (a1 + floor(random(2,5))) % (arr_animal.length-1);
	var a3 = (a1 + floor(random(4,7))) % (arr_animal.length-1);
	return arr_animal[a1] + ", " + arr_animal[a2] + ", " + arr_animal[a3];
}
// Effectue le fadeout d'un div de phrase
function hideDiv(did) {
	debugConsoleLog("///// fade out " + did);
	var duree = floor(random(12, 20.5));
	var easein_index=-1; // index de la classe du fadein à supprimer
	for(var i = 0 ; i < document.getElementById(did).classList.length; i++) {
		if(document.getElementById(did).classList[i].indexOf('une_phrase_easein')!=-1) {
			easein_index = i;
			break;
		}
	}
	// supprime la classe pour virer l'opacité:1
	if(easein_index>0) {
		debugConsoleLog("... " + did + " css remove " + i);
		document.getElementById(did).classList.remove(i);
	}
	// ajoute la classe de fadeout
	document.getElementById(did).classList.add('une_phrase_easeout_'+duree+'s');
	// après laquelle on supprimer le div du DOM
	setTimeout("removeDiv('"+did+"')", (duree)*1000);
}
// Effectue le fadein d'un élt qui vient en principe d'ê créé
// puis lancera le fadeout après un temps
function ecrit_fondu(did)  {
	// Fade In
	debugConsoleLog("\\\\\\ fade in " + did);
	var duree = floor(random(2, 10.5));
	document.getElementById(did).classList.add('une_phrase_easein_'+duree+'s');
	// Fade Out + tard
	var plusTard = floor(random(dureeAffichageFonduMin, dureeAffichageFonduMax));
	setTimeout("hideDiv('"+did+"')", plusTard);
}
