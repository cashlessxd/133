$(document).ready(function() {
    $.getJSON("http://sandbox.gibm.ch/berufe.php")
        .done(function (data) {
            $.each(data, function (key, beruf) {
                if (beruf.beruf_id == localStorage.getItem("selectedBerufId")) {
                    $("#beruf").append("<option value='" + beruf.beruf_id  + "' selected>" + beruf.beruf_name + "</option>");
                } else {
                    $("#beruf").append("<option value='" + beruf.beruf_id  + "'>" + beruf.beruf_name + "</option>");
                }
            })
        }).fail(function () {
        console.log("Request Failed");
    });
})

$("#beruf").on("change", function(){
    localStorage.setItem("selectedBerufId", this.value); 
});