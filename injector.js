// Note: Somewhat frankencode. Organically grown mess. Need to refactor
var GOOGLE="google", DUCKDUCKGO="duckduckgo", UNKNOWN="unknown";
function getSearchEngine() {
    if (window.location.host.match(/www\.google\./)) {
        return GOOGLE;
    } else if (window.location.host.match(/duckduckgo\.com/)) {
        return DUCKDUCKGO;
    }
}
function doReplace() {
    var wikiResults = $(".l[href*='en.wikipedia.org/wiki/']");
    wikiResults.each(function(index) {
        chrome.extension.sendRequest({
            'action' : 'getLocalName', 
            'title': $(this).attr("href").replace("http://en.wikipedia.org/wiki/", "")
        }, 
        function(data) { appendLinks(wikiResults[index], data.title, data.lang);} );
    });
}

function appendLinks(element, data, lang) {
    var dataAttrib = "data-wiki-" + lang;
    if (! $(element).attr(dataAttrib)) {
        $(element).attr(dataAttrib, 'data');
        $(element).after("<a class='extra-wikilink' href='http://" + lang + ".wikipedia.org/wiki/" + data + "'>" + data + "</a>");

    }
}

// Calls a function once per event 'burst'.
// Stolen from http://stackoverflow.com/questions/1448652/run-function-once-per-event-burst-with-jquery
// Note: This calls at the beginning, I want at end. FIXME
function throttle(call, timeout) {
    var my = function() {
        if (!my.handle) {
            my.handle = setTimeout(my.rightNow, timeout);
        }
    };
    my.rightNow = function() {
        if (my.handle) {
            clearTimeout(my.handle);
            my.handle = null;
        }
        call();
    };
    return my;
};

function bindInstant() {
    if ($("#search").length) {
        initEvents();
    }    
}

var throttledDoReplace = throttle(doReplace, 500);
var throttledbindInstant = throttle(bindInstant, 500);
var mainBound = false;

var currentEngine = getSearchEngine();
var searchBody, main;
var sitePrefix;

$(document).ready(function() {
    if (currentEngine == GOOGLE) {
        searchBody = "#search";
        main = "#main";
    } else if (currentEngine == DUCKDUCKGO) {
        searchBody = "#r12w";
        main = "#c2";
    }
    // They don't really do anything, yet. Support for Secure?
    if (window.location.protocol == 'http:') {
        sitePrefix = 'http://en.wikipedia.org/';
    } else if (window.location.protocol == 'https:') {
        sitePrefix = 'https://secure.wikimedia.org/wikipedia/en/';
    }
    if(! $(searchBody).length) {
        mainBound = true;
        $(main).bind('DOMSubtreeModified', throttledbindInstant);
    }
    else {
        initEvents();
    }
});

function initEvents() {
    if (mainBound) {
        $(main).unbind("DOMSubtreeModified", bindInstant);
    }
    $(searchBody).bind('DOMSubtreeModified', function() {
        throttledDoReplace();
    });

    // Initial call, to handle first load
    doReplace();
}
