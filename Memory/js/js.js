const cards = document.querySelectorAll('.kaartje');

function flipCard()
{
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));

function maakSpeelveld()
{
	var ht = rijMaken();
	document.getElementById("box").innerHTML = ht;
}

function rijMaken()
{
	var kaartjeDiv = '<div class="kaartjebox"> <div class = "kaartje"><div class="front-face"></div><div class="back-face"></div></div></div>';
	var rij = '<div class ="rij">' + kaartjeDiv.repeat(3) + '</div>';
	return(rij);
}