var defaultLanguage = 'ta';
var expiryTime = 31 * 60 * 60 * 24; // 31 Days expiry time

function doFoundCallback(object, lang, callback) {
    callback({'title': object[lang],'lang': lang});
}

function objectifyLinks(data, callback) {
    object = {};
    $(data).find("ll").each(function() {
        object[$(this).attr("lang")] = $(this).text();
        callback(object);
    });
}

function getLocalName(title, callback) {
    var lang = localStorage['language'];
    if (!lang) {
        lang = 'ta';
    }
    if (lscache.get(title)) {
        object = lscache.get(title);
        doFoundCallback(object, lang, callback);
    } else {
        var url = "http://en.wikipedia.org/w/api.php?action=query&titles=" + title + "&prop=langlinks&lllimit=500&format=xml";
        $.get(url, dataType="xml", function(data) {
            objectifyLinks(data, function(object) { 
                lscache.set(title, object, expiryTime); 
                doFoundCallback(object, lang, callback);
            });
        });
    }
}

function onRequest(request, sender, callback) {
    if (request.action == 'getLocalName') {
        getLocalName(request.title, callback);
    }
};

chrome.extension.onRequest.addListener(onRequest);

if (! localStorage['firstRun']) {
chrome.tabs.create({url:"options.html"});
localStorage['firstRun'] = 'true';
}

