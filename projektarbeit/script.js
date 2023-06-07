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
    $.getJSON("http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedBerufId)
        .done(function (data) {
            $.each(data, function (key, klasse) {
                if (klasse.klasse_id == localStorage.getItem("selectedKlasseId")) {
                    $("#klasse").append("<option value='" + klasse.klasse_id + "' selected>" + klasse.klasse_name + "</option>");
                    getTafel(klasse.klasse_id);
                } else {
                    $("#klasse").append("<option value='" + klasse.klasse_id + "'>" + klasse.klasse_name + "</option>");
                }
            })
        }).fail(function () {
            console.log("Request Failed");
        });
}

function getTafel(selectedKlasseId) {
    $.getJSON("https://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedKlasseId)
        .done(function (data) {
            $.each(data, function (key, tafel) {
                $("#" + tafel.tafel_wochentag).append(getLektion(tafel.tafel_von, tafel.tafel_bis, tafel.tafel_longfach, tafel.tafel_lehrer, tafel.tafel_raum));
            })
        }).fail(function () {
            console.log("Request Failed");
        });
}

function resetTafel() {
    $("#tafel").children().empty();
}

function getLektion(beginTime, endTime, name, lehrer, zimmer) {
    const lektion = "<div class='card'>" +
                        "<div class='card-header text-center'>" +
                            beginTime.substr(0, beginTime.length - 3) + "-" + endTime.substr(0, beginTime.length -3) +
                        "</div>" +
                        "<div class='card-body'>" +
                            "<h6 class='card-title text-center'>" + name + "</h6>" +
                            "<ul class='list-group pt-2'>" +
                                "<li class='list-group-item'>" + lehrer + "</li>" +
                                "<li class='list-group-item'>" + zimmer + "</li>" +
                            "</ul>" +
                        "</div>" +
                    "</div>" +
                    "<br>"
    return lektion;
}

$("#beruf").on("change", function(){
    localStorage.setItem("selectedBerufId", this.value);
    localStorage.removeItem("selectedKlasseId");
    resetTafel();
    getKlassen(this.value);
});

$("#klasse").on("change", function(){
    localStorage.setItem("selectedKlasseId", this.value);
    resetTafel();
    getTafel(this.value);
});