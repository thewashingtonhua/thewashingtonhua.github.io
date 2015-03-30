window.onload = init;

var BASE_LOCATION = "http://tonghuashuo.github.io";

function init() {
	/*console.log("================================");
	console.log("Aha!");
	console.log("You found me !");
	console.log("There are only 10 people in this");
	console.log("world know i'm here. You are one");
	console.log("of them. That makes us friends. ");
	console.log("If you gonna contact me. Tell me");
	console.log("you found me from console.      ");
	console.log("================================");*/

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
	fixTitleHeight();

	window.onresize = function() {
		goMobile();
		fixTitleHeight();
	};

	function goMobile() {
		// console.log("window.innerWidth: " + window.innerWidth);
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

	function fixTitleHeight() {
		var blogs = document.getElementsByClassName("blog");
		var banner = document.getElementsByClassName("banner")[0];
		if (banner) var bannerHeight = Number(getCurrentStyle(banner)["height"].slice(0, -2));

		for (var i=0, len=blogs.length; i<len; i++) {
		// for (var i=0; i<1; i++) {
			var title = blogs[i].getElementsByClassName("title")[0];
			var a = blogs[i].getElementsByTagName("a")[0];
			var h3 = blogs[i].getElementsByTagName("h3")[0];
			
			var tpt  = Number(getCurrentStyle(title)["padding-top"].slice(0, -2));
			var tpb  = Number(getCurrentStyle(title)["padding-bottom"].slice(0, -2));
			var ah   = Number(getCurrentStyle(a)["height"].slice(0, -2));
			var apt  = Number(getCurrentStyle(a)["padding-top"].slice(0, -2));
			var apb  = Number(getCurrentStyle(a)["padding-bottom"].slice(0, -2));
			var amt  = Number(getCurrentStyle(a)["margin-top"].slice(0, -2));
			var amb  = Number(getCurrentStyle(a)["margin-bottom"].slice(0, -2));
			var h3h  = Number(getCurrentStyle(h3)["height"].slice(0, -2));
			var h3pt = Number(getCurrentStyle(h3)["padding-top"].slice(0, -2));
			var h3pb = Number(getCurrentStyle(h3)["padding-bottom"].slice(0, -2));
			var h3mt = Number(getCurrentStyle(h3)["margin-top"].slice(0, -2));
			var h3mb = Number(getCurrentStyle(h3)["margin-bottom"].slice(0, -2));

			// console.log("tpt:" + tpt + "   tpb:" + tpb);
			// console.log("ah:" + ah + "   apt:" + apt + "   apb:" + apb + "   amt:" + amt + "   amt:" + amt);
			// console.log("h3h:" + h3h + "   h3pt:" + h3pt + "   h3pb:" + h3pb + "   h3mt:" + h3mt + "   h3mb:" + h3mb);

			// var totalheight = tpt + tpb + ah + apt + apb + amt + amb + h3h + h3pt + h3pb + h3mt + h3mb;
			// console.log("totalheight: " + totalheight);
			var totalheight = ah + apt + apb + amt + amb + h3h + h3pt + h3pb + h3mt + h3mb;
			title.style.height = totalheight + "px";
			title.style.marginTop = (bannerHeight - totalheight - tpt - tpb) + "px";
			// console.log("margin-top: " + title.style.marginTop);
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