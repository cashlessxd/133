var fontFamily = "Arial"; //Schriftfarbe
var fontSize = "24"; //Schriftgrösse
var fontColor = "#ffffcc"; //Schriftfarbe
var backgroundColor = "#000066"; //Hintergrundfarbe
var width = 150; //breite der Box
var clockStyle = 0; //24 Stunden => 0; 12 Stunden mit AM/PM => 1
var clockAppendix = ""; //AM / PM // empty

document.write('<div id="LiveClock" style="width:' + width + 'px; background-color:' + backgroundColor + '"></div>');

function showClock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (clockStyle) {
        clockAppendix = "AM";
        if (hours > 12) {
            clockAppendix = "PM";
            hours = hours - 12;
        }
        if (hours == 0) {
            hours = 12;
        }
    } else {
        clockAppendix = "";
    }
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }

    var clock = '';
    clock += '<p style="color:' + fontColor + '; font-family:' + fontFamily + '; font-size:' + fontSize + 'pt;">';
    clock += hours + ':' + minutes + ':' + seconds + ' ' + clockAppendix;
    clock += '</p>';

    var element = document.getElementById("LiveClock");
    element.innerHTML = clock;
    setTimeout("showClock()", 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    showClock();
}, false);