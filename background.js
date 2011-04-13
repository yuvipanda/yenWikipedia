function getLocalName(title, lang, callback) {
    var url = "http://en.wikipedia.org/w/api.php?action=query&titles=" + title + "&prop=langlinks&lllimit=500&format=xml";
    $.get(url, dataType="xml", function(data) {
        $(data).find("ll[lang='" + lang + "']").each(function() {
            callback($(this).text());
        });
    });

}

function onRequest(request, sender, callback) {
    if (request.action == 'getLocalName') {
        getLocalName(request.title, request.lang, callback);
    }
};

chrome.extension.onRequest.addListener(onRequest);
