/*导航栏 滑动*/
$(".bottomMargin .nav ul").on("mouseover","li",function(eve){
	var e = eve || window.event;
	e.stopPropagation();
	$(".ban").stop().animate({left:$(this).index()*$(this).width()},100,)
}).on("mouseout",function(){
	$(".ban").stop().animate({left:-100})
})

/*左右按键底部list出现*/
$("#contentWarp").hover(function(){
	$(".btns").fadeIn(400)
},function(){
	$(".btns").fadeOut(400)
})

/*三级菜单*/
$(".allGoods").on("mouseover",$(".catalog"),function(){
	$(".catalogs").css({display:"block"})
}).on("mouseout",$(".catalogs"),function(){
	$(".catalogs").stop().css({display:"none"})
})
$(".catalogs dl").hover(function(){
	$(this).stop().animate({width:$(".contain").width()},function(){
		if($(this).children("dd").length <= 10){
			$(this).animate({height:$(this).children("dt").height()+$(this).children("dd").height()})
		}else{
			$(this).animate({height:$(this).children("dt").height()+$(this).children("dd").height()*Math.ceil($(this).children("dd").length/10)})
		}
	}).siblings().css({borderRight:"1px solid #fafafa"})
},function(){
	$(this).stop().animate({height:$(this).children("dt").height()},function(){
		$(this).stop().animate({width:$(".allGoods").width()})
	})
})


		
/*搜索下拉jsonp*/
function jsonp(url,callback,data){
			var str= "";
			for(var i in data){
				str = str + i + "=" + data[i] + "&";
			}
			str = str.slice(0,str.length-1);
			url = url + "?" + str;
			
//			通过顶层对象window,在局部环境中绑定一个全局函数
			window[data[data._name]] = function(res){
				callback(res)
			}
			
			var script = document.createElement("script");
			script.src = url;
			document.body.appendChild(script)
		}

/*商品列表页*/
$(".catalogs").on("click","a",function(){
	this.goodsBox = [{
		id : this.getAttribute("data")
	}]
	setCookie("goodsBox",JSON.stringify(this.goodsBox))
})



