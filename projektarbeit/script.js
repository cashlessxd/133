$(document).ready(function() {
    $.getJSON("http://sandbox.gibm.ch/berufe.php")
        .done(function (data) {
            $.each(data, function (key, filiale) {
                $("#beruf").append("<option value='" + filiale.id  + "'>" + filiale.stadt + ", " + filiale.strasse + "</option>")
            })
        }).fail(function () {
        console.log("Request Failed");
    });
})