HTML Parser
===========

The  HTML Parser is an implementation of the HTML5 parsing algorithm packaged for [CommonJS](http://www.commonjs.org). It is based on the excellent [Validator.nu HTML parser](http://about.validator.nu/htmlparser/).

The parser is compatible with [Sizzle](http://sizzlejs.com/) which is included in the distribution for convenience.

This is part of the [Nitro](http://www.nitrojs.org/) ecosystem of Web Application development tools.


Usage
-----

    var HTMLParser = require("htmlparser").HTMLParser,
        sizzle = require("sizzle").sizzle;

    var html = '<html><p id="header"><b>nice</b></p><div id="test" class="big">hello</div><div>second</div></html>',
        parser = new HTMLParser(),
        document = parser.parse(html),
        $ = sizzle(document);

    $("div").forEach(function(el) {
        print(el.innerHTML);
    });

    print(document.toHTML());
    print(document);


Credits
-------

* George Moschovitis <george.moschovitis@gmail.com>
* Bryan Berry <bryan@olenepal.org>

Java HTML Parser

* Copyright (c) 2005, 2006, 2007 Henri Sivonen
* Copyright (c) 2007-2008 Mozilla Foundation
* Portions of comments Copyright 2004-2007 Apple Computer, Inc., Mozilla Foundation, and Opera Software ASA.


License
-------

Copyright (c) 2009-2010 George Moschovitis, [http://www.gmosx.com](http://www.gmosx.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
