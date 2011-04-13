var wikiResults = $(".l[href*='en.wikipedia.org/wiki/']");
wikiResults.each(function(index) {
    chrome.extension.sendRequest({
        'action' : 'getLocalName', 
        'title': $(this).attr("href").replace("http://en.wikipedia.org/wiki/", "")
    }, 
        function(link) { appendLinks(wikiResults[index], link);} );
});

function appendLinks(element, data) {
$(element).after("<a class='extra-wikilink' href='http://ta.wikipedia.org/wiki/" + data + "'>" + data + "</a>");
}


