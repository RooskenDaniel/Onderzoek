function flipCard()
{
  this.classList.toggle('flip');
}

function maakSpeelveld()
{
	var ht = veldMaken(3);
	document.getElementById("box").innerHTML = ht;
	var cards = document.querySelectorAll('.kaartje');
	cards.forEach(function(card)
	{
		$(card).on('click', flipCard);
	},)
}

function veldMaken(aantal)
{
	var kaartjeDiv = '<div class="kaartjebox"> <div class = "kaartje"><div class="front-face"></div><div class="back-face"></div></div></div>';
	var rij = '<div class ="rij">' + kaartjeDiv.repeat(aantal) + '</div>';
	var veld = rij.repeat(aantal);
	return(veld);
}

/*window.onload = function()
{
	maakSpeelveld();
}*/