window.onload = init;

function init() {
	var search_text 	= document.getElementById("search_text");
	var search_result 	= document.getElementById("search_result");
	var result_category	= document.getElementById("result_category");
	var result_preview 	= document.getElementById("result_preview");

	var txt = "";

	search_text.onkeyup = search_handler;

	function search_handler(){
		txt = search_text.value;
		if(txt.length>0) {
			search_result.style.display = "block";
			search_text.style.borderRadius = "4px 4px 0 0";
		} else {
			search_result.style.display = "none";
			search_text.style.borderRadius = "4px";
		}
		
	}
}