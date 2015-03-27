window.onload = init();

var BASE_LOCATION = "http://tonghuashuo.github.io";

function init() {
	console.log("================================");
	console.log("Aha!");
	console.log("You found me !");
	console.log("There are only 10 people in this");
	console.log("world know i'm here. You are one");
	console.log("of them. That makes us friends. ");
	console.log("If you gonna contact me. Tell me");
	console.log("you found me from console.      ");
	console.log("================================");

	var mf_sidebar 	= document.getElementById("mf_sidebar");
	var mf_portrait = document.getElementById("mf_portrait");
	var mf_ghid 	= document.getElementById("mf_ghid");
	var mf_category = document.getElementById("mf_category");

	var card_waterfall = document.getElementById("mf_content").childNodes;

	mf_portrait.onclick = function() {
		if (document.getElementsByTagName('html')[0].hasAttribute("lang")) {
			var lang = document.getElementsByTagName('html')[0].getAttribute("lang");
			if(lang == "zh-CN") {
				window.location.href = BASE_LOCATION + "/cn/blog.html";
			} else {
				window.location.href = BASE_LOCATION + "/en/blog.html";
			}
		} else {
			alert("attribute 'lang' not found");
			window.location.href = BASE_LOCATION;
		}
	}

	goMobile();

	window.onresize = function() {
		goMobile();
	}

	function goMobile() {
		if (window.innerWidth > 960) {
			// PC Style
			mf_sidebar.style.height = window.innerHeight+"px";
		} else {
			// Mobile Style
			mf_sidebar.style.height = "48px";
			if(window.innerWidth <= 630) {
				if(card_waterfall[3] && card_waterfall[3].className && (card_waterfall[3].className == "card project" || card_waterfall[3].className == "card friend")) {
					for (var i=3; i<card_waterfall.length - 1; i+=2) {
						card_waterfall[i].style.width = (window.innerWidth - 30) + "px";
						card_waterfall[i].childNodes[1].style.width = (window.innerWidth - 30) + "px";
						card_waterfall[i].childNodes[7].childNodes[0].style.width = (window.innerWidth - 30) + "px";
						// console.log(card_waterfall[i].childNodes[7].childNodes[0]);
					}
				}
			} else {
				if(card_waterfall[3] && card_waterfall[3].className && (card_waterfall[3].className == "card project" || card_waterfall[3].className == "card friend")) {
					for (var i=3; i<card_waterfall.length - 1; i+=2) {
						card_waterfall[i].style.width = "280px";
						card_waterfall[i].childNodes[1].style.width = "280px";
						card_waterfall[i].childNodes[7].childNodes[0].style.width = "280px";
					}
				}
			}
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