var wikiResults = $(".l[href*='en.wikipedia.org/wiki/']");
wikiResults.each(function(index) {
    chrome.extension.sendRequest({
        'action' : 'getLocalName', 
        'title': $(this).attr("href").replace("http://en.wikipedia.org/wiki/", "")
    }, 
        function(data) { appendLinks(wikiResults[index], data.title, data.lang);} );
});

function appendLinks(element, data, lang) {
$(element).after("<a class='extra-wikilink' href='http://" + lang + ".wikipedia.org/wiki/" + data + "'>" + data + "</a>");
}


