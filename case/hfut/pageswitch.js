// By Washington

(function($) {

	// 默认选项
	var defaults = {
		'container' : '#container',				// 容器
		'sections' : '.section',				// 子容器
		'easing' : 'ease',						// 特效方式，ease-in,ease-out,linear
		'duration' : 1000,						// 每次动画执行的时间
		'pagination' : true,					// 是否显示分页
		'loop' : false,							// 是否循环
		'keyboard' : true,						// 是否支持键盘
		'direction' : 'vertical',				// 滑动的方向 horizontal,vertical,
		'onpageSwitch' : function(pagenum){}	// 具体跳转到某一页
	};

	var win = $(window),
		container,sections;

	var opts = {},			// 配置选项
		canScroll = true;	// 滚动锁，防止连续滚动

	var arrElement = [];	// 用于缓存.section元素集合，避免频繁操作DOM
	var iIndex = 0;			// 配合arrElement进行.section的定位

	// 触摸点坐标，左上角为原点，向右、向下分别为x、y正向
	var startPos = { x: 0, y: 0 };
	var mov 	 = { x: 0, y: 0 };
	var endPos   = { x: 0, y: 0 };

	var sec_welcome = $("#sec_welcome"),
		logo = $("#logo"),
		title = $("#sec_welcome h1"),		
		swipeUpToFlip = $("#swipeUpToFlip"),
		canvas = $("canvas");

	// var scrollAmount = 0;	// 第几次滚动，测试用

	// 主函数
	var SP = $.fn.switchPage = function(options) {
		opts = $.extend({}, defaults , options||{});

		container = $(opts.container),
		sections = container.find(opts.sections);

		// 缓存DOM结构，避免频繁操作DOM
		sections.each(function() {
			arrElement.push($(this));
		});

		return this.each(function() {
			if(opts.direction == "horizontal") {
				initLayout();
			}

			if(opts.pagination) {
				initPagination();
			}

			if(opts.keyboard) {
				keyDown();
			}
		});
	}

	// 公用方法，可通过类似$.fn.switchPage.moveSectionUp();进行调用
	// 滚轮向上滑动事件（查看上一页，页面向下滚动）
	SP.moveSectionUp = function() {
		if(iIndex){
			iIndex--;
		}else if(opts.loop){
			iIndex = arrElement.length-1;
		}
		// console.log("arrElement[" + iIndex + "] " + arrElement[iIndex]);
		scrollPage(arrElement[iIndex]);
		console.log("scroll to page " + iIndex);
	};

	// 滚轮向下滑动事件（查看下一页，页面向上滚动）
	SP.moveSectionDown = function(){
		if(iIndex<(arrElement.length-1)){
			iIndex++;
		}else if(opts.loop){
			iIndex = 0;
		}
		// console.log("arrElement[" + iIndex + "] " + arrElement[iIndex]);
		scrollPage(arrElement[iIndex]);
		console.log("scroll to page " + iIndex);
	};

	// 滚动到指定页面，仅限测试用
	SP.moveToSection = function(index) {
		if(index>=0 && index<=(arrElement.length-1)){
			iIndex = index;
		}else{
			console.err("index out of range");
			return;
		}
		scrollPage(arrElement[iIndex]);
	}

	// 私有方法，仅限组件内部调用
	// 页面滚动事件
	function scrollPage(element){
		var dest = element.position();	// 获取目标元素相对于浏览器窗口的offset，绝对值通常等于浏览器窗口高度
		// console.log("dest.left:"+dest.left+" dest.top:"+dest.top);
		if(typeof dest === 'undefined'){ return; }
		initEffects(dest,element);
	}

	// 重写鼠标滑动事件
	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);	// DOMMouseScroll是火狐专用的，其它联通IE6都用mousewheel
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;	// 后者为兼容火狐
		var delta = Math.max(-1, Math.min(1, value));
		// console.log("====== "+ ++scrollAmount + " ======\nvalue:"+value+"  delta:"+delta+"  canScroll:"+canScroll);
		if(canScroll){
			if (delta < 0) {
				SP.moveSectionDown();
			}else {
				SP.moveSectionUp();
			}
		}
		return false;
	}

	// 重写触屏滚动事件
	$(".section").bind('touchstart',touchstartHandler);
	$(".section").bind('touchmove',touchmoveHandler);
	$(".section").bind('touchend',touchendHandler);
	function touchstartHandler(e) {
		e.preventDefault();
		var touch = e.originalEvent.touches[0];	// 获取第一个触点，多点触控时会同时有多个触点

		endPos.x = startPos.x = touch.pageX;
		endPos.y = startPos.y = touch.pageY;

		console.log("==================================");
		console.log("Touch start at ( " + startPos.x + ", " + startPos.y + " )");
		// document.addEventListener('touchmove',touchmoveHandler, false);
		// document.addEventListener('touchend',touchendHandler, false);
	}
	function touchmoveHandler(e) {
		e.preventDefault();
		
		// 当屏幕有多个touch或者页面被缩放过，就不执行move操作
		if (e.originalEvent.touches.length > 1 || e.scale && e.scale !== 1) return;
	
	    var touch = e.originalEvent.touches[0];
	    endPos.x = touch.pageX;
	    endPos.y = touch.pageY;
	 
		// console.log("moving to ( " + endPos.x + ", " + endPos.y + " )");
	}
	function touchendHandler(e) {
		e.preventDefault();
		console.log("Touch ended at ( " + endPos.x + ", " + endPos.y + " )");

	    mov.x = endPos.x - startPos.x;
	    mov.y = endPos.y - startPos.y;
		
	    // 执行操作，使元素移动
		if(opts.direction == "horizontal"){
			var w_limit = $(window).width()/4;	// 最短水平滑动距离
			if(mov.x<0 && Math.abs(mov.x)>w_limit) {
				SP.moveSectionDown();
			} else if (mov.y>w_limit) {
				SP.moveSectionUp();
			} else {
				console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ", w_limit: " + w_limit + ")");
			}
		} else {
			var h_limit = $(window).height()/4;	// 最短垂直滑动距离
			if(mov.y<0 && Math.abs(mov.y)>h_limit) {
				SP.moveSectionDown();
			} else if (mov.y>h_limit) {
				SP.moveSectionUp();
			} else {
				console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ")");
			}
		}

		// reBuild();
	}
	
	$("#con_qqgroup").bind('click', function(){
		window.open("http://tonghuashuo.github.io/case/hfut/img/QR.jpg"); 
	});
	
	// handle the tap event
	$("#scoreQuery").bind('touchstart', touchstartHandler);
	$("#con_qqgroup").bind('touchstart', touchstartHandler);
	$("#con_qqgroup").bind('touchmove', touchmoveHandler);
	
	$("#scoreQuery").bind('touchstart', touchstartHandler);
	$("#con_site").bind('touchstart', touchstartHandler);
	$("#con_site").bind('touchmove', touchmoveHandler);

	$("#scoreQuery").bind('touchend',function(e){
		e.preventDefault();
		console.log("Touch ended at ( " + endPos.x + ", " + endPos.y + " )");

	    mov.x = endPos.x - startPos.x;
	    mov.y = endPos.y - startPos.y;
	    var h_limit = $(window).height()/4;	// 最短滑动距离
		
	    // 执行操作，使元素移动
		if( mov.x * mov.x + mov.y * mov.y <= 25) {
			console.log("scoreQuery touched");
			window.open("http://xbkzs.hfut.edu.cn/search/showd_fs_detail2.php"); 
		} else {
			if(opts.direction == "horizontal"){
				var w_limit = $(window).width()/4;	// 最短水平滑动距离
				if(mov.x<0 && Math.abs(mov.x)>w_limit) {
					SP.moveSectionDown();
				} else if (mov.y>w_limit) {
					SP.moveSectionUp();
				} else {
					console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ", w_limit: " + w_limit + ")");
				}
			} else {
				var h_limit = $(window).height()/4;	// 最短垂直滑动距离
				if(mov.y<0 && Math.abs(mov.y)>h_limit) {
					SP.moveSectionDown();
				} else if (mov.y>h_limit) {
					SP.moveSectionUp();
				} else {
					console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ")");
				}
			}
		}
	});

	$("#con_qqgroup").bind('touchend',function(e){
		e.preventDefault();
		console.log("Touch ended at ( " + endPos.x + ", " + endPos.y + " )");

	    mov.x = endPos.x - startPos.x;
	    mov.y = endPos.y - startPos.y;
	    var h_limit = $(window).height()/4;	// 最短滑动距离
		
	    // 执行操作，使元素移动
		if( mov.x * mov.x + mov.y * mov.y <= 25) {
			console.log("con_qqgroup touched");
			window.open("http://tonghuashuo.github.io/case/hfut/img/QR.jpg"); 
		} else {
			if(opts.direction == "horizontal"){
				var w_limit = $(window).width()/4;	// 最短水平滑动距离
				if(mov.x<0 && Math.abs(mov.x)>w_limit) {
					SP.moveSectionDown();
				} else if (mov.y>w_limit) {
					SP.moveSectionUp();
				} else {
					console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ", w_limit: " + w_limit + ")");
				}
			} else {
				var h_limit = $(window).height()/4;	// 最短垂直滑动距离
				if(mov.y<0 && Math.abs(mov.y)>h_limit) {
					SP.moveSectionDown();
				} else if (mov.y>h_limit) {
					SP.moveSectionUp();
				} else {
					console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ")");
				}
			}
		}
	});
	$("#con_site").bind('touchend',function(e){
		e.preventDefault();
		console.log("Touch ended at ( " + endPos.x + ", " + endPos.y + " )");

	    mov.x = endPos.x - startPos.x;
	    mov.y = endPos.y - startPos.y;
	    var h_limit = $(window).height()/4;	// 最短滑动距离
		
	    // 执行操作，使元素移动
		if( mov.x * mov.x + mov.y * mov.y <= 25) {
			console.log("con_site touched");
			window.open("http://rjxy.hfut.edu.cn");
		} else {
			if(opts.direction == "horizontal"){
				var w_limit = $(window).width()/4;	// 最短水平滑动距离
				if(mov.x<0 && Math.abs(mov.x)>w_limit) {
					SP.moveSectionDown();
				} else if (mov.y>w_limit) {
					SP.moveSectionUp();
				} else {
					console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ", w_limit: " + w_limit + ")");
				}
			} else {
				var h_limit = $(window).height()/4;	// 最短垂直滑动距离
				if(mov.y<0 && Math.abs(mov.y)>h_limit) {
					SP.moveSectionDown();
				} else if (mov.y>h_limit) {
					SP.moveSectionUp();
				} else {
					console.log("Nothing done. (mov.x: " + mov.x + ", mov.y: " + mov.y + ", h_limit: " + h_limit + ")");
				}
			}
		}
	});

	// 横向布局初始化
	function initLayout(){
		var length = sections.length,
			width = (length*100)+"%",
			cellWidth = (100/length).toFixed(2)+"%";
		container.width(width).addClass("left");
		sections.width(cellWidth).addClass("left");
	}

	// 初始化分页
	function initPagination(){
		var length = sections.length;
		if(length){

		}
		var pageHtml = '<ul id="pages"><li class="active" index="0"></li>';
		for(var i=1;i<length;i++){
			pageHtml += '<li index="'+i+'"></li>';
		}
		pageHtml += '</ul>';
		$("body").append(pageHtml);

		var ul_height = $("#pages").height();
		var win_height = $(window).height();
		$("#pages").css('top', (win_height-ul_height)/2+"px");

		$('#pages li').click( function() {
			iIndex = $(this).attr('index');
			// console.log(iIndex);
			scrollPage(arrElement[iIndex]);
		});
	}

	// 分页事件
	function paginationHandler(){
		var pages = $("#pages li");
		pages.eq(iIndex).addClass("active").siblings().removeClass("active");
	}

	// 是否支持css的某个属性
	function isSuportCss(property){
		var body = $("body")[0];
		for(var i=0; i<property.length;i++){
			if(property[i] in body.style){
				return true;
			}
		}
		return false;
	}

	// 渲染效果
	// element是当前对象，dest是当前对象相对其父元素的位置
	function initEffects(dest,element){
		var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
			transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

		canScroll = false;
		if(isSuportCss(transform) && isSuportCss(transition)){
			// console.log("running effect: transition");
			var traslate = "";
			if(opts.direction == "horizontal"){
				traslate = "-"+dest.left+"px, 0px, 0px";
			}else{
				traslate = "0px, -"+dest.top+"px, 0px";
			}
			container.css({
				"transition":"all "+opts.duration+"ms "+opts.easing,
				"transform":"translate3d("+traslate+")"
			});
			// console.log("css applied");
			container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(){
				canScroll = true;
				// console.log("support and canScroll:"+canScroll);
			});
		}else{
			// console.log("running effect: animate");
			var cssObj = (opts.direction == "horizontal")?{left: -dest.left}:{top: -dest.top};
			container.animate(cssObj, opts.duration, function(){
				canScroll = true;
				// console.log("not support and canScroll:"+canScroll);
			});
		}
		element.addClass("active").siblings().removeClass("active");
		if(opts.pagination){
			paginationHandler();
		}
	}

	// 窗口Resize
	var resizeId;
	win.ready(uiAlign);
	win.resize(function(){
		clearTimeout(resizeId);
		resizeId = setTimeout(function(){
			reBuild();
			uiAlign();
		},200);
	});

	// 用于定位页面元素
	function uiAlign() {
		var currentHeight = win.height(),
			currentWidth = win.width();

		// logo
		var logo_w = logo.width();
		var logo_h = logo.height();
		var logo_mb = Number(logo.css('margin-bottom').slice(0, -2));
		var sec_pl = Number(sec_welcome.css('padding-left').slice(0, -2));
		var sec_pr = Number(sec_welcome.css('padding-right').slice(0, -2));
		var sec_pt = Number(sec_welcome.css('padding-top').slice(0, -2));
		var sec_pb = Number(sec_welcome.css('padding-bottom').slice(0, -2));
		var title_h = title.height();
		var logo_ml = (currentWidth - sec_pl - sec_pr - logo_w)/2 + "px";
		var logo_mt = (currentHeight - sec_pt - sec_pb - logo_h - logo_mb - title_h)/2*0.618 + "px";
		logo.css('margin-left', logo_ml);
		logo.css('margin-top', logo_mt);

		// swipeUpToFlip
		var swipe_w = swipeUpToFlip.width();
		var swipe_l = (currentWidth - swipe_w)/2 + "px";
		swipeUpToFlip.css('left', swipe_l);

		// canvas
		var canvas_w = currentWidth - sec_pl - sec_pr;
		canvas.attr({width: canvas_w});

		// mobile
		if(currentWidth < 768) {
			canvas.attr({height: 160});
			swipeUpToFlip.text("向上滑动滚屏");
		} else {
			canvas.attr({height: 300});
			swipeUpToFlip.text("滚轮向下翻页");
		}



	}

	// 重新定位页面
	function reBuild(){
		// console.log("rebuild");
		var currentHeight = win.height(),
			currentWidth = win.width();

		var element = arrElement[iIndex];
		if(opts.direction == "horizontal"){
			var offsetLeft = element.offset().left;
			if(Math.abs(offsetLeft)>currentWidth/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
			}
		}else{
			var offsetTop = element.offset().top;
			if(Math.abs(offsetTop)>currentHeight/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
			}
		}
		if(iIndex){
			paginationHandler();
			var cuerrentElement = arrElement[iIndex],
				dest = cuerrentElement.position();
			initEffects(dest,cuerrentElement);
		}

		var ul_height = $("#pages").height();
		var win_height = $(window).height();
		$("#pages").css('top', (win_height-ul_height)/2+"px");
	}

	// 绑定键盘事件
	function keyDown(){
		var keydownId;
		win.keydown(function(e){
			clearTimeout(keydownId);
			keydownId = setTimeout(function(){
				var keyCode = e.keyCode;
				if(keyCode == 37||keyCode == 38){
					SP.moveSectionUp();
				}else if(keyCode == 39||keyCode == 40){
					SP.moveSectionDown();
				}
			},150);
		});
	}
})(jQuery);