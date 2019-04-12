



//轮播图
;(function($){
	"use strict";
	
	$.fn.extend({
		banner:function(options){
			this.LOCAL = {
				isList : options.isList ? options.isList : false,
				autoPlay : options.autoPlay ? options.autoPlay : false,
				delayTime : options.delayTime ? options.delayTime : 0,
				moveTime : options.moveTime ? options.moveTime : 300,
				index : 0,
				iPrev : options.items.length-1
			}
			var that = this;
			
			//list 模块
			if(this.LOCAL.isList){
				var str = "";
				for(var i=0;i<options.items.length;i++){
					str += `<li></li>`
				}
				$(".btns").append($("<ul>").html(str).addClass("btnBox")).css({textAlign:"center"});
				$(".btnBox li").eq(0).addClass("active");
			}
			
			//自动播放模块
			this.LOCAL.autoRight = function(){
				if(that.LOCAL.index == options.items.length-1){
					that.LOCAL.index = 0;
					that.LOCAL.iPrev = options.items.length-1;
				}else{
					that.LOCAL.index++;
					that.LOCAL.iPrev = that.LOCAL.index-1;
				}
				that.LOCAL.imgOpcity()
			}
			
			
			//左右按键绑定事件
			if(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0){
				options.left.on("click",function(){
					clearInterval(that.LOCAL.timer);
					that.LOCAL.timer = setInterval(()=>{
						that.LOCAL.autoRight();
					},that.LOCAL.delayTime)

					if(that.LOCAL.index == 0){
						that.LOCAL.index = options.items.length-1;
						that.LOCAL.iPrev = 0;
					}else{
						that.LOCAL.index--;
						that.LOCAL.iPrev = that.LOCAL.index + 1;
					}
					that.LOCAL.imgOpcity()
				})
				options.right.on("click",this.LOCAL.autoRight)
			}
			
			//变色
			this.LOCAL.imgOpcity = function(){
				options.items.eq(that.LOCAL.index).stop().fadeIn(400).siblings().stop().fadeOut(400);
				$(".btns .btnBox li").eq(that.LOCAL.index).addClass("active").siblings().removeClass();	
			}
			
			//list点击
			$(".btnBox").on("click","li",function(){
				that.LOCAL.index = $(this).index()
				that.LOCAL.imgOpcity()
			})
			
			
			//自动播放
			if(this.LOCAL.autoPlay){
				this.LOCAL.timer = setInterval(()=>{
					this.LOCAL.autoRight();
				},this.LOCAL.delayTime)
				
				$(".banner").hover(function(){
					clearInterval(that.LOCAL.timer)
				},function(){
					that.LOCAL.timer = setInterval(()=>{
						that.LOCAL.autoRight()
					},that.LOCAL.delayTime)
				})
				
			}
			
			
		}
				
	})
})(jQuery)



/*轮播图*/
$(".banner").banner({
	items:$(".banner .imgBox li"), //必传，需要移动的图片数组
	left:$("#leftBtn"),//选传，左按钮
	right:$("#rightBtn"),//选传，右按钮
	isList:true, //选传，是否需要生成list
	autoPlay:true, //是否需要自动播放
	delayTime:4000, //自动轮播时，图片的间隔时间
	moveTime:300 	//图片移动时间
})