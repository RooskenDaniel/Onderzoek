function getRandomColor() {

    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color; 
}


var clickedTime; 
var createdTime; 
var reactionTime; 

function makeBox() {
        var time=Math.random();
        time=time*10000;
    
    setTimeout(function() {
    
        if (Math.random()>0.5) {
        
            document.getElementById("box").style.borderRadius="100px";
            
            } else {
            
                document.getElementById("box").style.borderRadius="0";
            }
            
        var top= Math.random();
            top= top*300;
        var left= Math.random();
            left= left*500; 
            
        document.getElementById("box").style.top = top + "px";
        document.getElementById("box").style.left = left + "px"; 
    
        document.getElementById("box").style.backgroundColor=getRandomColor();
    
        document.getElementById("box").style.display="block";
        
        createdTime=Date.now();
        
    }, time); 
}

document.getElementById("box").onclick=function() {

    clickedTime=Date.now();
    
    reactionTime=(clickedTime-createdTime)/1000;
    console.log(reactionTime);

    var koffie = 0;
    var urlString = window.location.href;
    var url = new URL(urlString);
    koffie = url.searchParams.get('koffie');

    $.getJSON('https://json.extendsclass.com/bin/676b8306466d', function(jd)
    {
        console.log("de getjson wordt uitgevoerd");
        const request = new XMLHttpRequest();
        request.open("PUT", "https://json.extendsclass.com/bin/676b8306466d", true);
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("Security-key", "Your security key");
        request.onreadystatechange = () => {};
        jsonString = JSON.stringify(jd);
        jsonZonderBlokHaak = jsonString.slice(0, -1);
        
        if (Number.isInteger(koffie))
        {
            request.send(jsonZonderBlokHaak + ',{"' + koffie + '":"' + reactionTime + '"}]');
        }
        else
        {
            koffie = 0;
            request.send(jsonZonderBlokHaak + ',{"' + koffie + '":"' + reactionTime + '"}]');
        }
    });



    
    document.getElementById("printReactionTime").innerHTML="Your Reaction Time is: " + reactionTime + "seconds";
    
    this.style.display="none";
    
    makeBox();        
}

makeBox(); 