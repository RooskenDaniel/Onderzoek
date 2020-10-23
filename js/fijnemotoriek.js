var verlies;
var winst;
var starttijd;

function maakDoolhof()
{
	var doolhof = '';
	for (r = 0; r < 11; r++)
	{
		for (k = 0; k < 25; k++)
		{
			doolhof += nieuwBlokje(r, k)
		}
	}

	document.getElementById("doolhof").innerHTML = doolhof;
	document.getElementById("r1 k1").className = "blokje roze";
	
	var padje = ["r1 k2","r1 k3", "r1 k4", "r1 k5", "r1 k6", "r1 k7", "r2 k6", "r2 k7", "r2 k8", "r2 k9", "r2 k10", "r2 k11", "r2 k12", "r2 k13", "r2 k14", "r2 k15", "r2 k16", "r2 k17", "r3 k15", "r3 k16", "r3 k17", "r4 k15", "r4 k16", "r4 k17", "r4 k14", "r4 k13", "r4 k12", "r4 k11", "r4 k10", "r5 k10", "r5 k9", "r6 k9", "r5 k8", "r4 k8", "r4 k7", "r4 k6", "r4 k5", "r5 k5", "r6 k5", "r7 k5", "r8 k5", "r9 k5", "r8 k6", "r9 k6", "r8 k7", "r9 k7", "r8 k8", "r9 k8", "r8 k9", "r9 k9", "r8 k10", "r9 k10", "r8 k11", "r9 k11", "r8 k12", "r9 k12", "r8 k13", "r9 k13", "r8 k14", "r9 k14", "r8 k15", "r9 k15", "r8 k16", "r9 k16", "r8 k17", "r9 k17", "r8 k18", "r9 k18", "r8 k19", "r9 k19", "r8 k20", "r9 k20", "r8 k21", "r9 k21", "r8 k22", "r9 k22", "r8 k23", "r9 k23", "r7 k23", "r6 k23", "r5 k23", "r4 k23", "r3 k23", "r2 k23" , "r1 k23", "r1 k22", "r1 k21", "r1 k20", "r1 k19", "r2 k19", "r3 k19", "r3 k20"];

	for (var i = 0; i < padje.length; i++)
	{
    	document.getElementById(padje[i]).className = "blokje zwart";
	}
	document.getElementById("r3 k21").className = "blokje geel";

	document.getElementById("r1 k1").addEventListener("mouseover", startHetSpel)
}

function nieuwBlokje(rij, kolom)
{
	var blokje = '<div class="blokje blauw" id="r' + rij + ' k' + kolom + '"></div>';
	return blokje;
}

function startHetSpel()
{
	verlies = false;
	winst = false;
	console.log("Het spel is gestart");
	document.getElementById("pinfo").innerHTML = "<p>De tijd loopt, ga zo snel mogelijk naar het gele vierkanje zonder het blauwe aan te raken</p>";
	var alleBlauwen = document.getElementsByClassName('blokje blauw');
	for (i = 0; i < alleBlauwen.length; i++)
	{
		alleBlauwen[i].addEventListener("mouseover", verliesf);
	}
	document.getElementById("r3 k21").addEventListener("mouseover", winstf)
	starttijd = new Date();
}

function verliesf()
{
	if (winst == false)
	{
		document.getElementById("pinfo").innerHTML = "<p>Ah, je hebt verloren, hover nog eens met je muis over het roze vierkanje om het opnieuw te proberen</p>";
		verlies = true;
		console.log('verlies: ' + verlies);
	}
	else
	{
		console.log('Je zou anders hebben verloren maar je hebt al gewonnen');
	}
}

function winstf()
{
	if (verlies == false)
	{
		winst = true;
		console.log("winst: " + winst);
		var eindtijd = new Date();
		var verstrekenTijd = eindtijd - starttijd;
		verstrekenTijd /= 1000;
		document.getElementById("pinfo").innerHTML = "<p>Het is je gelukt in een tijd van " + verstrekenTijd + " seconden</p>";



		var koffie = 0;
		var urlString = window.location.href;
		var url = new URL(urlString);
		koffie = url.searchParams.get('koffie');
		koffieInt = parseInt(koffie)

		$.getJSON('https://json.extendsclass.com/bin/1650645c04a4', function(jd)
		{
			console.log("de getjson wordt uitgevoerd");
			const request = new XMLHttpRequest();
			request.open("PUT", "https://json.extendsclass.com/bin/1650645c04a4", true);
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
	}
	else
	{
		console.log('Je zou anders hebben gewonnen maar je hebt al  verloren');
	}
}