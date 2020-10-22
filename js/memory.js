var kleurArray = [];
var aantalZwarten = 0;
var aantalJuisten = 0;
var verlies = false;
var level = 0;

function flipCard(card)
{
	var kleur = kleurArray[card.getAttribute("id")];
	if (card.getAttribute("class") == 'kaartje' && verlies == false)
	{
		card.classList.toggle('flip' + kleur);
		if (kleur == 'Zwart')
		{
			aantalJuisten++;
			if (aantalJuisten == aantalZwarten)
			{
				console.log("Gefeliciteerd, je hebt dit level gewonnen");
				level++;
				verlies = true;
				laadbalkWeggaan()
				setTimeout(allesBlauwMaken, 500);
				setTimeout(maakSpeelveld, 1000);
			}
			console.log(card.getAttribute("class"));
		}
		else
		{
			var koffie = 0;
			var urlString = window.location.href;
			var url = new URL(urlString);
			koffie = url.searchParams.get('koffie');
			//localStorage.setItem("./json/memory.json", json);

			$.getJSON('https://json.extendsclass.com/bin/60ca0abe3b8e', function(jd)
            {
            	console.log("de getjson wordt uitgevoerd");
                const request = new XMLHttpRequest();
				request.open("PUT", "https://json.extendsclass.com/bin/60ca0abe3b8e", true);
				request.setRequestHeader("Content-type", "application/json");
				request.setRequestHeader("Security-key", "Your security key");
				request.onreadystatechange = () => {};
				jsonString = JSON.stringify(jd);
				jsonZonderBlokHaak = jsonString.slice(0, -1);
				if (Number.isInteger(koffie))
				{
					if (Number.isInteger(level))
					{
						request.send(jsonZonderBlokHaak + ',{"' + koffie + '":"' + level + '"}]');
					}
				}
				else
				{
					koffie = 0;
					if (Number.isInteger(level))
					{
						request.send(jsonZonderBlokHaak + ',{"' + koffie + '":"' + level + '"}]');
					}
				}
				
             });
			/*
			const request = new XMLHttpRequest();
			request.open("GET", "https://json.extendsclass.com/bin/:id", true);
			request.onreadystatechange = () => {
			alert(request.responseText);
			};
			request.send();*/
			

			
			/*$.getJSON('https://json.extendsclass.com/bin/60ca0abe3b8e', function(data)
			{
				console.log("testi");
				console.log(data);
    // JSON result in `data` variable
			});*/

			/*
			const request = new XMLHttpRequest();
			request.open("PUT", "https://json.extendsclass.com/bin/60ca0abe3b8e", true);
			request.setRequestHeader("Content-type", "application/json");
			request.setRequestHeader("Security-key", "Your security key");
			request.onreadystatechange = () => {
			};
			request.send('[{"99":"99"}]');
			*/
	
			/*
			const request = new XMLHttpRequest();
			request.open("PATCH", "https://json.extendsclass.com/bin/60ca0abe3b8e", true);
			request.setRequestHeader("Content-type", "application/merge-patch+json");
			request.onreadystatechange = () => {
			};
			request.send('[{"koffie": 9,"level": 3}]');*/

			console.log("helaas je hebt verloren");
			var levelVoorGebruiker = level + 1;
			document.getElementById("pinfo").innerHTML = "Je hebt verloren. Level: " + levelVoorGebruiker.toString();
			verlies = true;
			setTimeout(alleZwartenDraaien, 1000, "Groen");
		}
		console.log(kleur + "e kaart is omgedraaid")
	}
}

function allesBlauwMaken()
{
	const cards = document.querySelectorAll('.kaartje');
	cards.forEach
	(
		function(card)
		{
			var kleur = kleurArray[card.getAttribute("id")];
			if (kleur == "Zwart")
			{
				card.classList.toggle('flipZwart');
			}
		}
	)
}

function alleZwartenDraaien(kleurWatHetWordt)
{
	const cards = document.querySelectorAll('.kaartje');
	cards.forEach
	(
		function(card)
		{
			var kleur = kleurArray[card.getAttribute("id")];
			var IsAlZwart = card.getAttribute("class");
			if (kleur == 'Zwart')
			{
				card.classList.toggle('flip' + kleurWatHetWordt);
				if (kleurWatHetWordt == 'Groen' && IsAlZwart != 'kaartje')
				{
					card.classList.toggle('flip' + kleurWatHetWordt);
					console.log("Alle zwarte kaarten zijn naar groen gedraaid");
				}
			}
		}
	)
	console.log("Alle zwarte kaarten zijn omgedraaid");
}

function kleurArrayMaken(aantal)
{
	var j
	for (j = 0; j < (aantal * aantal); j++)
	{
		kleurArray[j] = randomKleur();
	}
	console.log("kleurArray aangemaakt: " + kleurArray)
}

function maakSpeelveld()
{
	var aantalKaartenWortel = (((level - (level % 3)) / 3) + 3);
	verlies = false;
	kleurArrayMaken(aantalKaartenWortel);
	veldMaken(aantalKaartenWortel);
	setTimeout(laadbalkWeggaan, 500);
	setTimeout(alleZwartenDraaien, 500, "Zwart");
	setTimeout(alleZwartenDraaien, 5500, "Zwart");
	setTimeout(kaartKunnenOmdraaien, 5500);
	console.log("Het hele speelveld is gemaakt");
}

function laadbalkWeggaan()
{
	var balk = document.getElementById("laadbalk");
	balk.classList.toggle("weggaan");
	console.log("Laadbalk werkt");
}

function kaartKunnenOmdraaien()
{
	const cards = document.querySelectorAll('.kaartje');
	cards.forEach(function(card)
	{
		$(card).on('click', card, function()
			{
				flipCard(card);
			});
	},)
	console.log("Kaarten kunnen vanaf nu worden omgedraaid")
}

function veldMaken(aantal)
{
	var kaartjeDivBegin = '<div class="kaartjebox"> <div id = "';
	var KaartjeDivEind = '" class = "kaartje"><div class="front-face"></div><div class="back-face"></div></div></div>';
	var rijDivBegin = '<div class ="rij" style="width:';
	var rijWidth = aantal * 210;
	var rijDivMidden = 'px;">';
	var rijDivEind = '</div>';
	var boxDiv = '';

	
	var j;
	for (j = 0; j < aantal; j++)
	{
		boxDiv += rijDivBegin;
		boxDiv += rijWidth.toString();
		boxDiv += rijDivMidden;
		var i;
		for (i = 0; i < aantal; i++)
		{
			boxDiv += kaartjeDivBegin;
			boxDiv += ((aantal*j) + i);
			boxDiv += KaartjeDivEind;
		}
		boxDiv += rijDivEind;
	}
	document.getElementById("box").innerHTML = boxDiv;
	var levelVoorGebruiker = level + 1;
	document.getElementById("pinfo").innerHTML = "Level: " + levelVoorGebruiker.toString();
	document.getElementById("box").style = 'width:' + rijWidth + 'px; height:' + rijWidth + 'px;';
	console.log("De kaarten zijn gekmaakt");
}

function randomKleur()
{
	for (j = 0; j < 3; j++)
	{
		var random_boolean = Math.random() >= 0.5;
		if (random_boolean == false)
		{
			aantalZwarten++;
			return("Zwart")
			
		}
		else
		{
			return("Blauw")
		}
	}
	console.log("De willekeurige kleuren zijn uitgedeeld");
}