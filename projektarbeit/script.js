// Um wie viel die aktuelle Kalenderwoche verschoben wird vom Benutzer (Kalenderwochen wechseln)
let dateManipulator = 0;

// OnInit => Initialdaten werden geladen, Dropdown wird befüllt, Datum wird gesetzt
$(document).ready(function() {
    setDarkmode();
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

// Holt Klassen und Befüllt entsprechendes Dropdown
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

// Holt den Stundenplan und gibt befüllt diesen in die DOM
function getTafel(selectedKlasseId, date) {
    $("#tafel").fadeOut(function() {
        $.getJSON("https://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedKlasseId + "&woche=" + date)
            .done(function (data) {
                if (data[0]) {
                    $("#daten-voll").attr("hidden", false);
                    $("#daten-leer").attr("hidden", true);
                } else {
                    $("#daten-voll").attr("hidden", true);
                    $("#daten-leer").attr("hidden", false);
                }
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

// Leert den Stundenplan
function resetTafel() {
    $("#tafel").children().empty();
}

// Erstellt den HTML-Teil für eine Lektion im Stundenplan
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

// Holt momentane Kalenderwoche
function getDate() {
    const week = moment().add(dateManipulator, "w").week();
    const year = moment().add(dateManipulator, "w").year();
    return week + "-" + year; 
}

// Setzt Kalenderwoche in die DOM ein
function setDate() {
    $("#week").empty();
    $("#week").append("KW " + getDate() + (dateManipulator == 0 ? " (diese Woche)" : ""));
}

// Holt Stundenplan neu und aktualisiert die Kalenderwoche nachdem sie gewechselt wurde
function manipulateDate(manipulator) {
    dateManipulator += manipulator;
    setDate();
    resetTafel();
    getTafel(localStorage.getItem("selectedKlasseId"), getDate());
}

// Zuständig für Titel (Wochentag) im Handyformat
function setSmallScreenTafelTage() {
    days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    for (let i = 0; i < days.length; i++) {
        if ($("#" + (i + 1)).children().length) {
            $("#" + (i + 1)).prepend('<h4 class="small-screen text-center p-4">' + days[i] + '</h4>');
        }        
    }
}

function setDarkmode() {
    if (localStorage.getItem("displayMode")) {
        $("html").attr("data-bs-theme", function(){
            return localStorage.getItem("displayMode") == "light" ? "light" : "dark";
        });
    } else {
        $("html").attr("data-bs-theme", "light");
        localStorage.setItem("displayMode", "light");
    }
}

// Wechsel Beruf => Localstorage management und holt aktualisierte Daten
$("#beruf").on("change", function(){
    localStorage.setItem("selectedBerufId", this.value);
    localStorage.removeItem("selectedKlasseId");
    resetTafel();
    getKlassen(this.value);
    $("#daten-voll").attr("hidden", true);
    $("#daten-leer").attr("hidden", true);
});

// Wechsel Klasse => Localstorage management und holt aktualisierte Daten
$("#klasse").on("change", function(){
    localStorage.setItem("selectedKlasseId", this.value);
    resetTafel();
    getTafel(this.value, getDate());
});

// Leert Localstorage auf Anfrage vom Benutzer
$("#reset-webstorage").on("click", function() {
    localStorage.clear();
    location.reload();
});

// Darkmode aktivieren / deaktivieren
$("#darkmode").on("click", function() {
    $("html").attr("data-bs-theme", function(_, attr){
        displayMode = attr == "dark" ? "light" : "dark";
        localStorage.setItem("displayMode", displayMode);
        return displayMode;
    });
});

// 1 Kalenderwoche addieren
$("#add-week-one").on("click", function() {
    manipulateDate(1); 
});

// 5 Kalenderwochen addieren
$("#add-week-five").on("click", function() {
    manipulateDate(5);
});

// 1 Kalenderwoche subtrahieren
$("#subtr-week-one").on("click", function() {
    manipulateDate(-1);
});

// 5 Kalenderwochen subtrahieren
$("#subtr-week-five").on("click", function() {
    manipulateDate(-5);
});