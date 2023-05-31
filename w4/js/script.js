$(document).ready(function(){
    $("h1").addClass("red");
    $("h2.blue").addClass("green");
    $("h3#second").addClass("red");
    $("p:first").text("lol");
    $("p:last").wrapInner("<em></em>");
    $("ul").append('<li id="four">test</li>');
    $("li#four").attr("id", "five");
    $('li').each(function () {
        $(this).append('<em>' + this.id + '</em>');
    });
    $("li").css("font-size", "30px");
    $('li').on('click', function () {
        $(this).remove();
    });
    $("form").on("submit", function (event) {
        event.preventDefault();
        $('ul').append("<li>" + $("input").first().val() + "</li>");
    });
});