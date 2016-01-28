//window.onload = init;
(function(){
    init();
}());
var BASE_LOCATION = "http://tonghuashuo.github.io";

function init() {
	
//	printConsoleGreetings();
	initNavigator();
//	initFooter();

	var mf_sidebar 	= document.getElementById("mf_sidebar");
	var mf_portrait = document.getElementById("mf_portrait");
	var mf_ghid 	= document.getElementById("mf_ghid");
	var mf_category = document.getElementById("mf_category");

	var card_waterfall = document.getElementById("mf_content").childNodes;

	goMobile();
	fixTitleHeight();

	window.onresize = function() {
		goMobile();
		fixTitleHeight();
	};

    /**
     * Enable responsive card size
     */
	function goMobile() {
		if (window.innerWidth > 1010) {
			// PC Style
			mf_sidebar.style.height = window.innerHeight+"px";
		} else {
			// Mobile Style
			mf_sidebar.style.height = "48px";
			if(window.innerWidth <= 360) {
				if(card_waterfall[3] && card_waterfall[3].className && (card_waterfall[3].className == "card project" || card_waterfall[3].className == "card friend")) {
					for (var i=3; i<card_waterfall.length - 1; i+=2) {
						card_waterfall[i].style.width = 
						card_waterfall[i].childNodes[1].style.width = 
						card_waterfall[i].childNodes[7].childNodes[0].style.width = window.innerWidth + "px";
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
     * Title might wrap if too long
     * this function dynamically calculate height for title
     */
	function fixTitleHeight() {
		var blogs = document.getElementsByClassName("blog");
		var banner = document.getElementsByClassName("banner")[0];
        
		// The following codes only work for blog category.
		// Only blog category has banner.
		if (banner) 
            var bannerHeight = Number(getCurrentStyle(banner)["height"].slice(0, -2));

		for (var i=0, len=blogs.length; i<len; i++) {
		// for (var i=0; i<1; i++) {
			var title = blogs[i].getElementsByClassName("title")[0];
			var a = blogs[i].getElementsByTagName("a")[0];
			var p = blogs[i].getElementsByTagName("p")[0];
			
			var tpt  = Number(getCurrentStyle(title)["padding-top"].slice(0, -2));
			var tpb  = Number(getCurrentStyle(title)["padding-bottom"].slice(0, -2));
			var ah   = Number(getCurrentStyle(a)["height"].slice(0, -2));
			var apt  = Number(getCurrentStyle(a)["padding-top"].slice(0, -2));
			var apb  = Number(getCurrentStyle(a)["padding-bottom"].slice(0, -2));
			var amt  = Number(getCurrentStyle(a)["margin-top"].slice(0, -2));
			var amb  = Number(getCurrentStyle(a)["margin-bottom"].slice(0, -2));
			var ph  = Number(getCurrentStyle(p)["height"].slice(0, -2));
			var ppt = Number(getCurrentStyle(p)["padding-top"].slice(0, -2));
			var ppb = Number(getCurrentStyle(p)["padding-bottom"].slice(0, -2));
			var pmt = Number(getCurrentStyle(p)["margin-top"].slice(0, -2));
			var pmb = Number(getCurrentStyle(p)["margin-bottom"].slice(0, -2));

			// console.log("tpt:" + tpt + "   tpb:" + tpb);
			// console.log("ah:" + ah + "   apt:" + apt + "   apb:" + apb + "   amt:" + amt + "   amt:" + amt);
			// console.log("ph:" + ph + "   ppt:" + ppt + "   ppb:" + ppb + "   pmt:" + pmt + "   pmb:" + pmb);

			// var totalheight = tpt + tpb + ah + apt + apb + amt + amb + ph + ppt + ppb + pmt + pmb;
			// console.log("totalheight: " + totalheight);
			var totalheight = ah + apt + apb + amt + amb + ph + ppt + ppb + pmt + pmb;
			title.style.height = totalheight + "px";
			title.style.marginTop = (bannerHeight - totalheight - tpt - tpb) + "px";
			// console.log("margin-top: " + title.style.marginTop);
		}
	}

    /**
     * Click on portrait to go to dashboard
     */
	mf_portrait.onclick = function() {
		var lang = getLang();
		if(lang) {
			if(lang == "zh-CN") {
				window.location.href = BASE_LOCATION + "/cn/blog.html";
			} else {
				window.location.href = BASE_LOCATION + "/en/blog.html";
			}
		} else {
			window.location.href = BASE_LOCATION;
			console.err("attribute 'lang' not found");
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

/*
 * get ducument language
 */
function getLang() {
	if (document.getElementsByTagName('html')[0].hasAttribute("lang")) {
		return document.getElementsByTagName('html')[0].getAttribute("lang");
	}
	return "zh-CN";
}

/*
 * output greetings in console
 */
function printConsoleGreetings() {
	console.log("================================");
	console.log("Aha! You found me !");
	console.log("There are only 10 people in this");
	console.log("world know i'm here. You are one");
	console.log("of them. That makes us friends. ");
	console.log("If you gonna contact me. Tell me");
	console.log("you found me in the console.    ");
	console.log("================================");
}

/*
 * Generate Navigations
 * support multi-language
 */
function initNavigator() {
	var new_mf_sidebar = document.createElement("div");
	var new_mf_profile = document.createElement("div");
	var new_mf_portrait = document.createElement("div");
	var new_mf_ghid = document.createElement("a");
	var new_mf_category = document.createElement("ul");
	var blog_li = document.createElement("li");
	var blog_a = document.createElement("a");
	var project_li = document.createElement("li");
	var project_a = document.createElement("a");
	var lab_li = document.createElement("li");
	var lab_a = document.createElement("a");
	var friend_li = document.createElement("li");
	var friend_a = document.createElement("a");
	var about_li = document.createElement("li");
	var about_a = document.createElement("a");

	new_mf_sidebar.id = "mf_sidebar";
	new_mf_profile.id = "mf_profile";
	new_mf_portrait.id = "mf_portrait";
	new_mf_ghid.id = "mf_ghid";
	new_mf_ghid.href = "https://github.com/tonghuashuo";
	new_mf_ghid.target = "_blank";
	new_mf_ghid.innerHTML = "@tonghuashuo";
	new_mf_category.id = "mf_category";
	blog_li.id = "blog";
	project_li.id = "project";
	lab_li.id = "lab";
	friend_li.id = "friend";
	about_li.id = "about";

	new_mf_profile.appendChild(new_mf_portrait);
	new_mf_profile.appendChild(new_mf_ghid);

	blog_li.appendChild(blog_a);
	project_li.appendChild(project_a);
	lab_li.appendChild(lab_a);
	friend_li.appendChild(friend_a);
	about_li.appendChild(about_a);
	new_mf_category.appendChild(blog_li);
	new_mf_category.appendChild(project_li);
	new_mf_category.appendChild(lab_li);
	new_mf_category.appendChild(friend_li);
	new_mf_category.appendChild(about_li);

	new_mf_sidebar.appendChild(new_mf_profile);
	new_mf_sidebar.appendChild(new_mf_category);

	var new_mf_content = document.getElementById("mf_content");

	document.body.insertBefore(new_mf_sidebar, new_mf_content);

	var url = window.location.href;
//	console.log("url: " + url);
	var base = url.indexOf("tonghuashuo.github.io");
	var sub = url.substr(base).split("/");
	var level = sub.length - 2;
//    console.log("sub: " + sub);
//	console.log("level: " + level);

	var sub_str = "";
	for(var i=0; i<level; i++) {
		sub_str += "../";
	}
//    console.log("sub_str: " + sub_str);

	blog_a.href = sub_str + "blog.html";
	project_a.href = sub_str + "project.html";
	lab_a.href = sub_str + "lab.html";
	friend_a.href = sub_str + "friend.html";
	about_a.href = sub_str + "about.html";
	
    blog_a.innerHTML = "博客";
    project_a.innerHTML = "项目";
    lab_a.innerHTML = "实验室";
    friend_a.innerHTML = "朋友";
    about_a.innerHTML = "关于";

	if(level) {
		var channel = sub[1];
	} else {
		var channel = sub[1].slice(0, -5);
	}
	// console.log("channel: " + channel);
	// console.log(document.getElementById(channel));
	document.getElementById(channel).className = "active";
}

/*
 * Auto-generate link for multi-language
 */
function initFooter() {
	var footer = document.createElement("footer");

	footer.innerHTML = '<p><a id="toCN">简体中文</a>|<a id="toEN">English</a></p>';
	// <p><a target="_blank" href="http://jigsaw.w3.org/css-validator/check/referer"><img style="border:0;width:88px;height:31px" src="http://jigsaw.w3.org/css-validator/images/vcss-blue" alt="Valid CSS!" /></a></p>';
	document.getElementById("mf_content").appendChild(footer);

	var url = window.location.href;
	var base = url.indexOf("tonghuashuo.github.io");
	var sub = url.substr(base).split("/");
	var level = sub.length;

	// console.log("url: " + url);
	// console.log("sub: " + sub);
	// console.log("level: " + level);

	var sub_str = "";
	for(var i=2; i<level; i++) {
		sub_str += "../";
	}

	var toCN = document.getElementById("toCN");
	var toEN = document.getElementById("toEN");

	var target_cn = sub_str + "cn";
	var target_en = sub_str + "en";
	for(var i=2; i<level; i++) {
		target_cn += "/" + sub[i];
		target_en += "/" + sub[i];
	}
	// console.log(target_cn);
	// console.log(target_en);

	toCN.href = target_cn;
	toEN.href = target_en;
}

