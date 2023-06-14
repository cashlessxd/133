let dateManipulator = 0;

$(document).ready(function() {
    setDate(dateManipulator);
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
                    getTafel(klasse.klasse_id, getDate());
                } else {
                    $("#klasse").append("<option value='" + klasse.klasse_id + "'>" + klasse.klasse_name + "</option>");
                }
            })
        }).fail(function () {
            console.log("Request Failed");
        });
}

function getTafel(selectedKlasseId, date) {
    $("#tafel").fadeOut(function() {
        $.getJSON("https://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedKlasseId + "&woche=" + date)
            .done(function (data) {
                $.each(data, function (key, tafel) {
                    $("#" + tafel.tafel_wochentag).append(getLektion(tafel.tafel_von, tafel.tafel_bis, tafel.tafel_longfach, tafel.tafel_lehrer, tafel.tafel_raum));
                })
                setSmallScreenTafelTage();
            }).fail(function () {
                console.log("Request Failed");
            });
    });
    $("#tafel").fadeIn(200);
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

function getDate() {
    const week = moment().add(dateManipulator, "w").week();
    const year = moment().add(dateManipulator, "w").year();
    return week + "-" + year; 
}

function setDate() {
    $("#week").empty();
    $("#week").append("KW " + getDate() + (dateManipulator == 0 ? " (diese Woche)" : ""));
}

function manipulateDate(manipulator) {
    dateManipulator += manipulator;
    setDate();
    resetTafel();
    getTafel(localStorage.getItem("selectedKlasseId"), getDate());
}

function setSmallScreenTafelTage() {
    days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    for (let i = 0; i < days.length; i++) {
        if ($("#" + (i + 1)).children().length) {
            $("#" + (i + 1)).prepend('<h4 class="small-screen text-center p-4">' + days[i] + '</h4>');
        }        
    }
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
    getTafel(this.value, getDate());
});

$("#reset-webstorage").on("click", function() {
    localStorage.clear();
});

$("#add-week-one").on("click", function() {
    manipulateDate(1); 
});

$("#add-week-five").on("click", function() {
    manipulateDate(5);
});

$("#subtr-week-one").on("click", function() {
    manipulateDate(-1);
});

$("#subtr-week-five").on("click", function() {
    manipulateDate(-5);
});