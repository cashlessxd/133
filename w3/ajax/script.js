document.addEventListener('DOMContentLoaded', function(){
    const url = "https://gibm.becknet.ch/warenhaus/getFiliale.php";
    const elementId = "filialen";
    load(url, elementId);
}, false);

document.getElementById("filialen").addEventListener('change', function(){
    const value = document.getElementById("filialen").value;
    const url = "https://gibm.becknet.ch/warenhaus/getFiliale.php?filiale="+value;
    const elementId = "info";
    load(url, elementId);
}, false);

function load(url, elementId) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            document.getElementById(elementId).innerHTML = "<option hidden>Bitte auswählen...</option>" + xmlhttp.responseText;
        } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
            console.log("Something went wrong");
            console.log("Status: " + xmlhttp.status);
        }
    };
    xmlhttp.open("GET", url , true);
    xmlhttp.send();
}