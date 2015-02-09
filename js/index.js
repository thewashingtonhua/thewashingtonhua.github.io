window.onload = init();

function init() {
	var mf_sidebar = document.getElementById("mf_sidebar");
	mf_sidebar.style.height = window.innerHeight+"px";

	window.onresize = function() {
		mf_sidebar.style.height = window.innerHeight+"px";
	}
}