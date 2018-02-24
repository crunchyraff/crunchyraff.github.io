var greetList;
n = 0;
mainText = document.querySelector('#main-text');
var today = new Date();
var dd = checkTime(today.getDate());
var mm = checkTime(today.getMonth()+1); //January is 0!
var yyyy = today.getFullYear();

function init() {
    document.getElementById('date').innerHTML = mm + '/' + dd + '/' + yyyy;
    greetList = [];
    i = null;
    loadJSON(function(response) {
        greetList = JSON.parse(response);
        cycleText();
    });

    startTime();            
}

function toggle() {
    var obj = document.querySelector('#info-main')
    if(obj.classList.contains('shown')) {
        obj.classList.remove('shown');
    }
    else {
        obj.classList.add('shown');
    }
}

function startTime() {            
    var h = checkTime(today.getHours());
    var m = checkTime(today.getMinutes());
    // var s = today.getSeconds();
    // s = checkTime(s);
    document.getElementById('clock').innerHTML =
    // h + ":" + m + ":" + s;
    h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


function cycleText()
{
    // i = Math.floor((Math.random() * greetList.length));
    i = randomNoRepeat(greetList.length, i);
    n = n + 1;
    if(!mainText.classList.contains('hide-text')) {
        mainText.classList.add('hide-text');
    }
    setTimeout(()=> {
        mainText.innerHTML = greetList[i];
        mainText.classList.remove('hide-text');            
    }, 1500);
    
    var t = setTimeout(cycleText, 10000);
}

function randomNoRepeat(i, x) {
    if(i > 1) {
        n = Math.floor((Math.random() * i));
        return n == x ? randomNoRepeat(i, x) : n;
    }
}

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'res/greets.json', true);
        xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}