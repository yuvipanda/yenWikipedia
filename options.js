function appendOption(container, language) {
    $(container).append("<input type='radio' name='longradio' id='" + language.code + "' /> <label for='" + language.code + "' title='" + language.title + "'>" + language.name + "</label>");
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
    });
    $("#" + lang).attr("checked", "checked").button("refresh");
});
