// By Washington

(function($) {
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

	var opts = {},
		canScroll = true;

	var iIndex = 0;	// 配合arrElement进行section的定位

	var arrElement = [];

	// var scrollAmount = 0;

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
	// 滚轮向上滑动事件（页面向下滚动）
	SP.moveSectionUp = function() {
		if(iIndex){
			iIndex--;
		}else if(opts.loop){
			iIndex = arrElement.length-1;
		}
		// console.log("arrElement[" + iIndex + "] " + arrElement[iIndex]);
		scrollPage(arrElement[iIndex]);
	};

	// 滚轮向下滑动事件（下面向上滚动）
	SP.moveSectionDown = function(){
		if(iIndex<(arrElement.length-1)){
			iIndex++;
		}else if(opts.loop){
			iIndex = 0;
		}
		// console.log("arrElement[" + iIndex + "] " + arrElement[iIndex]);
		scrollPage(arrElement[iIndex]);
	};

	// 私有方法，仅限组件内部调用
	// 页面滚动事件
	function scrollPage(element){
		var dest = element.position();	// 获取目标元素相对于浏览器窗口的offset
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
	win.resize(function(){
		clearTimeout(resizeId);
		resizeId = setTimeout(function(){
			reBuild();
		},200);
	});

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