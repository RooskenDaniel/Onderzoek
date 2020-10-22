/* NOTE: the attribute "dn" is used to hide an element (see CSS style declaration)
That means following: 
    example.setAttribute("dn","") hides, 
    example.removeAttribute("dn") shows
an element */

var timer; // stores timeout of waiting time
var reaction; // stores time it took you to react on green color
var highscore = 0; // stores your personal highscore
var init = true; // controls if codes executes first time


window.onload=()=>{ // fires when all elements have been initialized


    // Get required elements 

    var entire = document.getElementsByClassName("entire")[0];
    var entirebtn = entire.getElementsByTagName("button")[0];
    
    var wait = document.getElementsByClassName("wait")[0];
    
    var tap = document.getElementsByClassName("tap")[0];
    
    var toofast = document.getElementsByClassName("toofast")[0];
    var toofastbtn = toofast.getElementsByTagName("button")[0];
    
    var result = document.getElementsByClassName("result")[0];
    var resultbtn = result.getElementsByTagName("button")[0];
    var resultf = result.getElementsByTagName("res")[0];
    
    var highscoref = document.getElementsByClassName("highscore")[0].getElementsByTagName("res")[0];

    
    // set onclick handlers 
    
    entirebtn.onclick=()=>{
      entire.setAttribute("dn","");
      wait.removeAttribute("dn");
      timer = setTimeout(()=>{
         wait.setAttribute("dn","");
         tap.removeAttribute("dn");
         reaction = new Date(); // start time
      },Math.floor((Math.random() * 8) + 4)*Math.floor((Math.random() * 999) + 501));
    } // setTimeout to show green screen with random waiting time
    
    wait.onclick=()=>{ // if red screen is clicked, show "too fast" screen
      clearTimeout(timer); // cancel green screen showing timeout
      wait.setAttribute("dn","");
      toofast.removeAttribute("dn");
    }
    
    tap.onclick=()=>{
      var now = new Date(); // end time
      reaction = now.getTime() - reaction.getTime(); // calculate difference of timestamps (in ms)
      console.log(reaction, "ms");

      var koffie = 0;
      var urlString = window.location.href;
      var url = new URL(urlString);
      koffie = url.searchParams.get('koffie');
      koffieInt = parseInt(koffie)

      $.getJSON('https://json.extendsclass.com/bin/b270de2e37a3', function(jd)
      {
        console.log("de getjson wordt uitgevoerd");
        const request = new XMLHttpRequest();
        request.open("PUT", "https://json.extendsclass.com/bin/b270de2e37a3", true);
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("Security-key", "Your security key");
        request.onreadystatechange = () => {};
        jsonString = JSON.stringify(jd);
        jsonZonderBlokHaak = jsonString.slice(0, -1);
        
        if (Number.isInteger(koffieInt))
        {
            request.send(jsonZonderBlokHaak + ',{"' + koffieInt + '":"' + reaction + '"}]');
        }
        else
        {
            koffieInt = 0;
            request.send(jsonZonderBlokHaak + ',{"' + koffieInt + '":"' + reaction + '"}]');
        }
        
      });

      tap.setAttribute("dn","");
      result.removeAttribute("dn");
      resultf.innerHTML = reaction; // write current reaction time to screen
      if(highscore>reaction||init){ // fires if current result is better (or the code executes the first time)
        highscore = reaction;
        highscoref.innerHTML = highscore; 
        result.getElementsByTagName("hs")[0].removeAttribute("dn");
      }
      init = false; // now first execution has been completed and init is false
    }
    
    resultbtn.onclick=()=>{
      result.setAttribute("dn","");
      if(entire.hasAttribute("dn")){
        entire.removeAttribute("dn");
      }
      result.getElementsByTagName("hs")[0].setAttribute("dn","");
    }

    toofastbtn.onclick=()=>{
      toofast.setAttribute("dn","");
      if(entire.hasAttribute("dn")){
        entire.removeAttribute("dn");
      }
    }
}