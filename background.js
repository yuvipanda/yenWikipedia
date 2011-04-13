var defaultLanguage = 'ta';

function getLocalName(title, callback) {
    var url = "http://en.wikipedia.org/w/api.php?action=query&titles=" + title + "&prop=langlinks&lllimit=500&format=xml";
    var lang = localStorage['language'];
    if (!lang) {
        lang = 'ta';
    }
    $.get(url, dataType="xml", function(data) {
        $(data).find("ll[lang='" + lang + "']").each(function() {
            callback({'title': $(this).text(),'lang': lang});
        });
    });

}

function onRequest(request, sender, callback) {
    if (request.action == 'getLocalName') {
        getLocalName(request.title, callback);
    }
};

chrome.extension.onRequest.addListener(onRequest);
