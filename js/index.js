window.onload = init();

var BASE_LOCATION = "http://tonghuashuo.github.io";

function init() {
	var mf_sidebar 	= document.getElementById("mf_sidebar");
	var mf_portrait = document.getElementById("mf_portrait");
	var mf_ghid 	= document.getElementById("mf_ghid");
	var mf_category = document.getElementById("mf_category");
	
	mf_portrait.onclick = function() {
		window.location.href = BASE_LOCATION;
	}

	// console.log("calling goMobile() on init");
	goMobile();

	window.onresize = function() {
		// console.log("calling goMobile() on resize");
		goMobile();
	}

	function goMobile() {
		// console.log("goMobile() called");
		if (window.innerWidth >960) {
			// PC Style
			mf_sidebar.style.height = window.innerHeight+"px";
		} else {
			// Mobile Style
			mf_sidebar.style.height = "48px";
		}
	}

	/** 
	 * node is the DOM element to get style from
	 * returns a key-value set of computed style
	 */
	function getCurrentStyle(node) {
	    var style = null;
	    
	    if(window.getComputedStyle) {
	        style = window.getComputedStyle(node, null);	// Not IE
	    }else{
	        style = node.currentStyle;	// IE
	    }
	    
	    return style;
	}
}