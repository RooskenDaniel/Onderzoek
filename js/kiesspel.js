var koffie = 0;
var urlString = window.location.href;
var url = new URL(urlString);
koffie = url.searchParams.get('koffie');
console.log(koffie);
document.getElementById("memory").href = 'memory.html?koffie=' + koffie;
document.getElementById("reflectie").href = 'reflectie.html?koffie=' + koffie;
document.getElementById("reactie").href = 'reactie.html?koffie=' + koffie;