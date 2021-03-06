var SVG = function(){
	this.element = document.getElementsByTagName("svg")[0];
	this.namespace = "http://www.w3.org/2000/svg";
	this.width = this.element.clientWidth || this.element.parentNode.clientWidth;
	this.height = this.element.clientHeight ||  this.element.parentNode.clientHeight;
	this.padding = 20;
}

SVG.prototype.addGUI = function(){
	//Create a new user interface and append it to the my-gui-container div
	gui = new dat.GUI({autoPlace: false});
	document.getElementById('my-gui-container').appendChild(gui.domElement);
	return gui;
}

SVG.prototype.initCodepenButton = function(script){
	var codepenHTML = "<svg width='400px' height='400px'></svg>";
	var codepenCSS = "html,body{\n\theight:100%;\n}\nsvg{\n\tdisplay:block;\n\tmargin:0 auto;\n\tbackground: url('http://unitedshapes.com/images/graph-paper/graph-paper.png');\n}";
	var codepenJavascript = 'var SVG = function(){\n';
	codepenJavascript += '\tthis.element = document.getElementsByTagName("svg")[0];\n';
	codepenJavascript += '\tthis.namespace = "http://www.w3.org/2000/svg";\n';
	// codepenJavascript += '\t//We set the width and height below.\n';
	// codepenJavascript += '\t//Firefox returns zero for element\'s Width & Height so that\'s why we check the parent node.\n';
	codepenJavascript += '\tthis.width = 400;';
	codepenJavascript += '\n\tthis.height = 400;';
	codepenJavascript += '\n}\n\n';
	codepenJavascript += '/****Let\'s initialise our SVG ready to draw our shape****/\n';
	codepenJavascript += 'var svg = new SVG();\n\n';
	codepenJavascript += '/****This sets up the user interface - we\'ve included the script for this as an external library for the codepen****/\n';
	codepenJavascript += 'var gui = new dat.GUI();\n\n';
	codepenJavascript += '/****Here\'s where the code to create the shape begins!****/\n';
	var codepenExternalJavascript = "//cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js";

	var data = {
		html: codepenHTML,
		css: codepenCSS,
		js: codepenJavascript+script,
		js_external: codepenExternalJavascript
	};

	var JSONstring = JSON.stringify(data)
					// Need to replace quotes with HTML entities or else the JSON won't work properly
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&apos;");

	var form = '<form id="codepen" action="http://codepen.io/pen/define" method="POST" target="_blank">'
				+ '<input type="hidden" name="data" value=\''
				+ JSONstring
				+ '\'>'
				+ '<input type="submit" value="Edit on CodePen">'
				+ '</form>';

	$("#my-gui-container").append(form);
}

//Code below deals with Android V3 and below bug where overflow-x:scroll doesn't work
var ua = navigator.userAgent;
if( ua.indexOf("Android") >= 0 )
{
  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8));
  if (androidversion < 3.0)
  {
      $('pre').css("word-wrap","break-word");
  }
}

$(function() {
	svg = new SVG();
	var gui = svg.addGUI();
	$.getScript('/javascript/shapes/'+shapeName+'.js', function(script){
		svg.initCodepenButton(script);
	});
});

var staticShape = '<div class="shape-static">';
staticShape += '<img src="/images/shapes/png/'+shapeName+'.png" alt="{{page.title}}">';
staticShape += '<p class="lte_ie8">If you\'d like to play with an interactive SVG version of this shape, please upgrade your copy of Internet Explorer to <a href="http://www.microsoft.com/en-gb/download/internet-explorer.aspx" target="_blank">version 9 or above</a>, or try out <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank">Firefox</a>.'
staticShape += '</p><div class="clear"></div></div>';

if (!svgeezy.supportsSvg()){
    $(".shape").after(staticShape);
    $(".shape").hide();
}