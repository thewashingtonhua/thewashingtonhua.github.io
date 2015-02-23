window.onload = init();

function init() {
	var mf_sidebar 	= document.getElementById("mf_sidebar");
	var mf_portrait = document.getElementById("mf_portrait");
	var mf_ghid 	= document.getElementById("mf_ghid");
	var mf_category = document.getElementById("mf_category");
	
	goMobile();

	window.onresize = goMobile();

	function goMobile() {
		console.log("goMobile() called");
		if (window.innerWidth >960) {
			// PC Style
			mf_sidebar.style.height = window.innerHeight+"px";
		} else {
			// Mobile Style
			mf_sidebar.style.height = "48px";
			// console.log(window.innerWidth);
			// console.log(getCurrentStyle(mf_sidebar)['height']);
			// mf_category.style.width = (window.innerWidth - getCurrentStyle(mf_sidebar)['height']) + "px";
			// console.log("mf_category.style.width: " + mf_category.style.width);
			// console.log("getCurrentStyle(mf_category)['width']: " + getCurrentStyle(mf_category)['width']);
			// console.log(mf_category.getElementsByTagName("li"));
			// alert(mf_category.getElementsByTagName("li"));
		}
	}

	// node is the DOM element whose CSS style you wanna retrive
	// function returns a key-value set of computed CSS properties of the given node
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