/*
 * Generate Navigations
 * support multi-language
 */
function initNavigator() {
	var new_mf_sidebar = document.createElement("div");
	var new_mf_profile = document.createElement("div");
	var new_mf_portrait = document.createElement("a");
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
	new_mf_profile.className = "clearfix";
	new_mf_portrait.id = "mf_portrait";
	new_mf_portrait.href = "http://tonghuashuo.github.io";
	new_mf_ghid.id = "mf_ghid";
	new_mf_ghid.href = "https://github.com/tonghuashuo";
	new_mf_ghid.target = "_blank";
	new_mf_ghid.innerHTML = "@tonghuashuo";
	new_mf_category.id = "mf_category";
	new_mf_category.className = "clearfix";
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
	var base = url.indexOf("tonghuashuo.github.io");
	var sub = url.substr(base).split("/");
	var level = sub.length - 2;

	var sub_str = "";
	for(var i=0; i<level; i++) {
		sub_str += "../";
	}

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
	document.getElementById(channel).className = "active";
}

initNavigator();
