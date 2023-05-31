$(document).ready(function () {
    const selectedFiliale = localStorage.getItem("selectedFiliale");
    if (selectedFiliale) {
        $.getJSON("https://gibm.becknet.ch/warenhaus/getFiliale.php?format=JSON&filiale=" + selectedFiliale)
        .done(function (data) {
            var data = data[0];
            $('#filialeninfo').html("<table><tr><th>Stadt</th><th>Strasse</th><th>&Ouml;ffnungszeiten</th></tr><tr><td>"
                + data.stadt + "</td><td>" + data.strasse + "</td> <td>" + data.oeffnungszeiten + "</td></tr></table>");
        });    
    }
    $.getJSON("https://gibm.becknet.ch/warenhaus/getFiliale.php?format=JSON")
        .done(function (data) {
            $.each(data, function (key, filiale) {
                $("select").append("<option value='" + filiale.id  + "'>" + filiale.stadt + ", " + filiale.strasse + "</option>")
            })
        }).fail(function () {
        console.log("Request Failed");
    });
})

function getFiliale(id) {
    $(document).ready(function () {
        $.getJSON("https://gibm.becknet.ch/warenhaus/getFiliale.php?format=JSON&filiale=" + id)
        .done(function (data) {
            var data = data[0];
            $('#filialeninfo').html("<table><tr><th>Stadt</th><th>Strasse</th><th>&Ouml;ffnungszeiten</th></tr><tr><td>"
                + data.stadt + "</td><td>" + data.strasse + "</td> <td>" + data.oeffnungszeiten + "</td></tr></table>");
            localStorage.setItem("selectedFiliale", id);
        });    
    })
}
