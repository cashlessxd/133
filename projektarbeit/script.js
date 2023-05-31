$(document).ready(function() {
    $("#beruf").append("<option selected disabled>Beruf auswählen</option>");
    $.getJSON("http://sandbox.gibm.ch/berufe.php")
        .done(function (data) {
            $.each(data, function (key, beruf) {
                if (beruf.beruf_id == localStorage.getItem("selectedBerufId")) {
                    $("#beruf").append("<option value='" + beruf.beruf_id + "' selected>" + beruf.beruf_name + "</option>");
                    getKlassen(beruf.beruf_id);
                } else {
                    $("#beruf").append("<option value='" + beruf.beruf_id + "'>" + beruf.beruf_name + "</option>");
                }
            })
        }).fail(function () {
            console.log("Request Failed");
        });
})

function getKlassen(selectedBerufId) {
    $("#klasse-container").removeAttr("hidden");
    $("#klasse").empty();
    $("#klasse").append("<option selected disabled>Klasse auswählen</option>");
    localStorage.removeItem("selectedKlasseId");
    $.getJSON("http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedBerufId)
        .done(function (data) {
            $.each(data, function (key, klasse) {
                if (klasse.klasse_id == localStorage.getItem("selectedKlasseId")) {
                    $("#klasse").append("<option value='" + klasse.klasse_id + "' selected>" + klasse.klasse_name + "</option>");
                } else {
                    $("#klasse").append("<option value='" + klasse.klasse_id + "'>" + klasse.klasse_name + "</option>");
                }
            })
        }).fail(function () {
            console.log("Request Failed");
        });
}

$("#beruf").on("change", function(){
    localStorage.setItem("selectedBerufId", this.value);
    getKlassen(this.value);
});

$("#klasse").on("change", function(){
    localStorage.setItem("selectedKlasseId", this.value); 
});