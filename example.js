var HTMLParser = require("htmlparser").HTMLParser,
    sizzle = require("sizzle").sizzle;

var html = '<html><p id="header"><b>nice</b></p><div id="test" class="big">hello</div><div>second</div></html>',
    parser = new HTMLParser(),
    document = parser.parse(html),
    $ = sizzle(document);

$("div").forEach(function(el) {
    print(el.innerHTML);
});
