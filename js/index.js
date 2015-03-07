window.onload = init();

var BASE_LOCATION = "http://tonghuashuo.github.io";

function init() {
	console.log("================================");
	console.log("Aha!");
	console.log("You found me !");
	console.log("There are only 10 people in this");
	console.log("world know i'm here. You are one");
	console.log("of them. That makes us friends. ");
	console.log("================================");

	var mf_sidebar 	= document.getElementById("mf_sidebar");
	var mf_portrait = document.getElementById("mf_portrait");
	var mf_ghid 	= document.getElementById("mf_ghid");
	var mf_category = document.getElementById("mf_category");

	var friend_card = document.getElementById("mf_content").childNodes;

	mf_portrait.onclick = function() {
		window.location.href = BASE_LOCATION;
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
				if(friend_card[3] && friend_card[3].className && friend_card[3].className == "card friend") {
					for (var i=3; i<friend_card.length - 1; i+=2) {
						friend_card[i].style.width = (window.innerWidth - 30) + "px";
						friend_card[i].childNodes[1].style.width = (window.innerWidth - 30) + "px";
						friend_card[i].childNodes[7].childNodes[0].style.width = (window.innerWidth - 30) + "px";
						console.log(friend_card[i].childNodes[7].childNodes[0]);
					}
				}
			} else {
				if(friend_card[3] && friend_card[3].className && friend_card[3].className == "card friend") {
					for (var i=3; i<friend_card.length - 1; i+=2) {
						friend_card[i].style.width = "280px";
						friend_card[i].childNodes[1].style.width = "280px";
						friend_card[i].childNodes[7].childNodes[0].style.width = "280px";
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