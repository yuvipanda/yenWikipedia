$(document).ready(function() {
    $("#lang").val(localStorage["language"]);
    $("#save").click(function() {
        localStorage["language"] = $("#lang").val();
    });
});
