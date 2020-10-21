function maakSpeelveld()
{
	var ht = veldMaken();
	document.getElementById("box").innerHTML = ht;
}

function veldMaken()
{
	var kaartjeDiv = '<div class="kaartjebox"> <div class = "kaartje"><div class="front-face"></div><div class="back-face"></div></div></div>';
	var rij = '<div class ="rij">' + kaartjeDiv.repeat(3) + '</div>';
	var veld = rij.repeat(3);
	return(veld);
}

maakSpeelveld();