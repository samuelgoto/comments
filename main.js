/**
 * This is the main kiwi script.
 * 
 * It assumes that all of the rangy files have been declared before this file.
 */

var highlighter;

window.onload = function() {
    rangy.init();
    
    highlighter = rangy.createHighlighter();
    
    highlighter.addClassApplier(rangy.createCssClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"],
         elementProperties: {
            href: "#",
            onclick: function() {
                var highlight = highlighter.getHighlightForElement(this);
                alert("Opening comment:" + highlight.id);
                return false;
            }
        }
    }));

    var serialized = decodeURIComponent(
	window.location.hash.slice(window.location.hash.indexOf("=") + 1));
    if (serialized) {
        highlighter.deserialize(serialized);
    }
};

window.onmouseup = function(e) {
    highlighter.highlightSelection("highlight");
    // TODO(goto): there is probably an API in rangy for this.
    if (window.getSelection) {
	window.getSelection().removeAllRanges();
    } else if (document.selection) {
	document.selection.empty();
    }

    window.location.hash = "highlights=" + encodeURIComponent(
      highlighter.serialize());
}

