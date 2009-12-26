var JInputSource = Packages.org.xml.sax.InputSource,
    JStringReader = Packages.java.io.StringReader,
    JHtmlDocumentBuilder = Packages.nu.validator.htmlparser.dom.HtmlDocumentBuilder;

var jparser = new JHtmlDocumentBuilder();

var extend = function(Klass, Zuper) {
    Klass.prototype = Object.create(Zuper.prototype);
    Klass.prototype.constructor = Klass;
}

/**
 * A HTML5 parser.
 * 
 * Based on:
 * http://about.validator.nu/htmlparser/
 */
var HTMLParser = exports.HTMLParser = function(options) {
}

HTMLParser.prototype.parseRaw = function(html) {
    return jparser.parse(new JInputSource(new JStringReader(html)));
}

HTMLParser.prototype.parse = function(html) {
    return new HTMLDocument(this.parseRaw(html));
}

/**
 * An HTML Node.
 */
var HTMLNode = function(jnode) {
    this._raw = jnode;
}

Object.defineProperty(HTMLNode.prototype, "nodeName", {
    get: function() {
        return String(this._raw.getNodeName());
    }
});

Object.defineProperty(HTMLNode.prototype, "nodeType", {
    get: function() {
        return Number(this._raw.getNodeType());
    }
});

Object.defineProperty(HTMLNode.prototype, "nodeValue", {
    get: function() {
        return String(this._raw.getNodeValue());
    }
});

/**
 * HTML Document.
 */
var HTMLDocument = function(jdocument) {
    this._raw = jdocument;
}

extend(HTMLDocument, HTMLNode);

HTMLDocument.prototype.createElement = function(tagName) {
    return new HTMLElement(this._raw.createElement(tagName));
}

HTMLDocument.prototype.createComment = function(data) {
    return new HTMLElement(this._raw.createComment(data));
}

HTMLDocument.prototype.getElementById = function(id) {
    return new HTMLElement(this._raw.getElementById(id));
}

HTMLDocument.prototype.getElementsByTagName = function(tagname) {
    return _nodelistToArray(this._raw.getElementsByTagName(tagname));
}

Object.defineProperty(HTMLDocument.prototype, "documentElement", {
    get: function() {
        return new HTMLElement(this._raw.getDocumentElement());
    }
});

/**
 * HTML Element.
 */
var HTMLElement = function(jelement) {
    this._raw = jelement;
}

extend(HTMLElement, HTMLNode);

HTMLElement.prototype.appendChild = function(newChild) {
    return new HTMLElement(this._raw.appendChild(newChild._raw));
}

Object.defineProperty(HTMLElement.prototype, "checked", {
    get: function() {
        return this.hasAttribute("checked");
    }
});

Object.defineProperty(HTMLElement.prototype, "childNodes", {
    get: function() {
        return _nodelistToArray(this._raw.getChildNodes());
    }
});

Object.defineProperty(HTMLElement.prototype, "className", {
    get: function() {
        return this.getAttribute("class");
    }
});

HTMLElement.prototype.compareDocumentPosition = function(other) {
    return Number(this._raw.compareDocumentPosition(other));
}

Object.defineProperty(HTMLElement.prototype, "disabled", {
    get: function() {
        return this.hasAttribute("disabled");
    }
});

Object.defineProperty(HTMLElement.prototype, "firstChild", {
    get: function() {
        var c = this._raw.getFirstChild();
        return c ? new HTMLElement(c) : null;
    }
});

HTMLElement.prototype.getAttribute = function(name) {
    return String(this._raw.getAttribute(name));
}

HTMLElement.prototype.getAttributeNode = function(name) {
    var n = this._raw.getAttributeNode(name);
    return n ? new HTMLElement(n) : null;
}

HTMLElement.prototype.getElementsByTagName = function(tagname) {
    return _nodelistToArray(this._raw.getElementsByTagName(tagname));
}

HTMLElement.prototype.hasAttribute = function(name) {
    return this._raw.hasAttribute(name);
}

Object.defineProperty(HTMLElement.prototype, "innerHTML", {
    get: function() {
        return String(this._raw.getTextContent());
    },
    set: function(content) {
        return String(this._raw.setTextContent(content));
    }    
});

HTMLElement.prototype.insertBefore = function(newChild, refChild) {
    return new HTMLElement(this._raw.insertBefore(newChild._raw, refChild._raw));
}

Object.defineProperty(HTMLElement.prototype, "lastChild", {
    get: function() {
        var c = this._raw.getLastChild();
        return c ? new HTMLElement(c) : null;
    }
});

Object.defineProperty(HTMLElement.prototype, "nextSibling", {
    get: function() {
        return new HTMLElement(this._raw.getNextSibling());
    }
});

Object.defineProperty(HTMLElement.prototype, "ownerDocument", {
    get: function() {
        return new HTMLElement(this._raw.getOwnerDocument());
    }
});

Object.defineProperty(HTMLElement.prototype, "parentNode", {
    get: function() {
        return new HTMLElement(this._raw.getParentNode());
    }
});

Object.defineProperty(HTMLElement.prototype, "previousSibling", {
    get: function() {
        return new HTMLElement(this._raw.getPreviousSibling());
    }
});

HTMLElement.prototype.removeChild = function(oldChild) {
    return new HTMLElement(this._raw.removeChild(oldChild._raw));
}

Object.defineProperty(HTMLElement.prototype, "selected", {
    get: function() {
        return this.hasAttribute("selected");
    }
});

Object.defineProperty(HTMLElement.prototype, "textContent", {
    get: function() {
        return String(this._raw.getTextContent());
    }
});

Object.defineProperty(HTMLElement.prototype, "type", {
    get: function() {
        return String(this.getAttribute("type"));
    }
});

var _nodelistToArray = function(nodelist) {
    var arr = [];

    for (var i = 0; i < nodelist.getLength(); i++) {
        arr.push(new HTMLElement(nodelist.item(i)));
    }
 
    return arr;
}

/**
 */
exports.parse = function(html, options) {
    return (new HTMLParser(options)).parse(html);
}
