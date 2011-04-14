function appendOption(container, language) {
    $(container).append("<input type='radio' name='longradio' id='" + language.code + "' value='" + language.name + "' /> <label for='" + language.code + "' title='" + language.title + "'>" + language.name + "</label>");
}
$(document).ready(function() {
    $.each(primaryIndicLanguages, function(i, v) {
        appendOption("#primaryIndicChoices", v);
    });
    $.each(secondaryIndicLanguages, function(i, v) {
        appendOption("#secondaryIndicChoices", v);
    });
    $(".choiceSet").buttonset();
    var lang = localStorage["language"];
    $(".choiceSet input[type='radio']").change(function() {
        lang = $(this).attr('id');
        localStorage["language"] = lang;
        $("#notice").clearQueue();
        $("#notice").text("Language changed to " + $(this).attr('value') + "");

        $("#notice").fadeIn().delay(3000).fadeOut();
    });
    $("#" + lang).attr("checked", "checked").button("refresh");
    $("label").removeClass("ui-corner-left").removeClass("ui-corner-right");
});
