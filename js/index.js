window.onload = init();

function init() {
	var mf_sidebar 	= document.getElementById("mf_sidebar");
	var mf_portrait = document.getElementById("mf_portrait");
	var mf_ghid 	= document.getElementById("mf_ghid");
	
	console.log("calling goMobile() on init");
	goMobile();

	window.onresize = function() {
		console.log("calling goMobile() on resize");
		goMobile();
	}

	function goMobile() {
		console.log("goMobile() called");
		if (window.innerWidth >960) {
			// PC Style
			mf_sidebar.style.height 	 = window.innerHeight+"px";
			mf_portrait.style.marginLeft = "90px";
			mf_ghid.style.marginLeft = "0px";
		} else {
			// Mobile Style
			mf_sidebar.style.height = "300px";
			
			var mf_portrait_style 		= getCurrentStyle(mf_portrait);
			var mf_portrait_style_width = mf_portrait_style['width'];
			mf_portrait_style_width 	= mf_portrait_style_width.substring(0, mf_portrait_style_width.length-2);

			var mf_ghid_style	  		= getCurrentStyle(mf_ghid);
			var mf_ghid_style_width 	= mf_ghid_style['width'];
			mf_ghid_style_width 		= mf_ghid_style_width.substring(0, mf_ghid_style_width.length-2);

			console.log("window.innerWidth: " + window.innerWidth);
			console.log("mf_portrait_style_width: "		+ mf_portrait_style_width);
			console.log("mf_ghid_style_width: " 		+ mf_ghid_style_width);

			mf_portrait.style.marginLeft = (window.innerWidth - mf_portrait_style_width ) / 2 + "px";
			mf_ghid.style.marginLeft 	 = (window.innerWidth - mf_ghid_style_width ) 	 / 2 + "px";
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