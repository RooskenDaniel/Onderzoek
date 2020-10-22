var ingedrukteRoden = [];
var starttijd;
var win = false;

function start()
{
	win = false;
	ingedrukteRoden = [];
	document.getElementById("info").innerHTML = "Druk zo snel mogelijk op alle rode vierkanten";
	//hier worden de blokjes gemaakt
	var blokjesArray = [];
	for (i = 0; i < 25; i++)
	{
		var kleur = randomKleur()
		blokjesArray[i] = kleur;
		console.log('blokjesArray[' + i + '] = ' + kleur);
	}
	console.log('blokjesArray: ' + blokjesArray);

	//de rode blokjes gaan er later overheen
	rooienArray = drieRooien();
	console.log('rooienArray in arrayMaken: ' + rooienArray);
	for (j = 0; j < 3; j++)
	{
		blokjesArray[rooienArray[j]] = "red";
		console.log('blokjesArray #' + rooienArray[j] + ' is vervangen door red');
	}
	console.log('blokjesArray na de rode invasie: ' + blokjesArray);

	//hier wordt alles ingekleurd
	for (k = 0; k < 25; k++)
	{
		var stijl = ('background-color:' + blokjesArray[k])
		document.getElementById(k).style = stijl;
	}

	//Er wordt een event aan de roden toegevoegd
	for (j = 0; j < 3; j++)
	{
		document.getElementById(rooienArray[j]).addEventListener("click", opRoodGedrukt)
	}
	starttijd = new Date();
}

function randomKleur()
{
	Kleurlegenda = ["blue", "orange", "purple", "yellow", "green"];
	var getal = randomNummerTussenNulEnInput(5);
	kleur = Kleurlegenda[getal];
	console.log('De kleur ' + kleur + ' is random gekozen');
	return kleur;
}

function randomNummerTussenNulEnInput(max)
{
	var getal = Math.floor(Math.random() * max);
	console.log('Het getal ' + getal + ' is random gekozen');
	return getal;
}


function drieRooien()
{
	rooienArray = []
	do
	{
		for (i = 0; i < 3; i++)
		{
			rooienArray[i] = randomNummerTussenNulEnInput(25);
			console.log('rooienArray in drie rooien: ' + rooienArray);
		}
	} while (rooienArray[0] == rooienArray[1] || rooienArray[0] == rooienArray[2] || rooienArray[1] == rooienArray[2])
	return rooienArray;
}

function opRoodGedrukt()
{
	console.log('Er is op een rode gedrukt: ' + this.getAttribute("id"));
	for (i = 0; i < 3; i++)
	{
		if (ingedrukteRoden[i] != this.getAttribute("id"))
		{
			ingedrukteRoden.push(this.getAttribute("id"));
			{ break; }
		}
	}
	if (ingedrukteRoden[2] !== undefined && win == false)
	{
		win = true;
		var eindtijd = new Date();
		var verstrekenTijd = eindtijd - starttijd;
		verstrekenTijd /= 1000;
		var koffie = 0;
		var urlString = window.location.href;
		var url = new URL(urlString);
		koffie = url.searchParams.get('koffie');
		koffieInt = parseInt(koffie)

		$.getJSON('https://json.extendsclass.com/bin/7466aaa74c7a', function(jd)
		{
			console.log("de getjson wordt uitgevoerd");
			const request = new XMLHttpRequest();
			request.open("PUT", "https://json.extendsclass.com/bin/7466aaa74c7a", true);
			request.setRequestHeader("Content-type", "application/json");
			request.setRequestHeader("Security-key", "Your security key");
			request.onreadystatechange = () => {};
			jsonString = JSON.stringify(jd);
			jsonZonderBlokHaak = jsonString.slice(0, -1);

			if (Number.isInteger(koffieInt))
			{
				request.send(jsonZonderBlokHaak + ',{"' + koffieInt + '":"' + verstrekenTijd + '"}]');
			}
			else
			{
				koffieInt = 0;
				request.send(jsonZonderBlokHaak + ',{"' + koffieInt + '":"' + verstrekenTijd + '"}]');
			}
		});

		document.getElementById("info").innerHTML = "Je hebt de test volbalcht in " + verstrekenTijd + " secondon. Druk op start om nog eens te spelen";
		console.log(verstrekenTijd);
		console.log(ingedrukteRoden[2]);
		console.log('gefeliciteerd, je hebt gewonnen');
	}
}