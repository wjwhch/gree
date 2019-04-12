/*接受cookie渲染商品*/

class msgList{
	constructor(options){
		this.url = options.url;
		this.init();
	}
	init(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				console.log(res)
				that.res = res;
				that.display()
			}
		})
		this.degital = JSON.parse(getCookie("degital"));
		this.degital.forEach((v)=>{
			this.code = v.code
		})
	}
	display(){
		var str = "";
		var desstr = "";
		console.log(this.code);
		for(var i=1;i<this.res[0][this.code].length;i++){
			str += `<li><img src=${this.res[0][this.code][i].url}/></li>`;
		}
		desstr += `<h1>${this.res[0][this.code][0].name}</h1>
					<h2>${this.res[0][this.code][0].des}</h2>
					<dl class="mt20"></dl>
					<dl><dt>商城价:</dt><dd class="scjia" data="${this.res[0][this.code][0].id}"><strong>${this.res[0][this.code][0].price}</strong></dd></dl>
					<dl class="mt20">
						<dt>购买数量：</dt>
						<dd>
							<span class="reduce reduceDisable" id="reduceNum">-</span> <input id="buyNum" class="numberIn" value="1"> <span class="increase">+</span>
						</dd>
					</dl>
					<div class="clearfix">
				        <a class="buyNowBtn" href="car.html" target="_blank">立即购买</a>
						<a class="addCartBtn" href="car.html" target="_blank">加入购物车</a>
					</div>`;
					
		$(".change ul").html(str);
		$(".detil").html(desstr)
		new Letbig;
		new Car({
			code:this.code,
		});
	}
}
new msgList({
	url:"http://127.0.0.1:8020/gulp/server/project/libs/goods.json"
})



/*放大镜*/
class Letbig{
	constructor(){
		this.bImg = document.querySelector(".bbox img");
		this.sImg = document.querySelector(".sbox img");
		this.sbox = document.querySelector(".sbox");
		this.bbox = document.querySelector(".bbox");
		this.span = document.querySelector(".sbox span");
		this.oul = document.querySelector(".change ul");
		this.right = document.querySelector(".changeRight");
		this.left = document.querySelector(".changeLeft");
		this.changeImg = document.querySelectorAll(".change img")

		this.choose();
		this.addEvent();
		this.init();
	}
	init(){
		this.sImg.src = this.changeImg[0].src;
		this.bImg.src = this.sImg.src;	
	}
	
	choose(){
		var that = this;

			this.oul.onclick = function(eve){
				var e = eve || window.event;
				var target = e.target || e.srcElement;
				if(target.nodeName == "IMG"){
					that.sImg.src = target.src;
					that.bImg.src = target.src;
				}	
			}	

		
//		console.log(this)
	}
	
	addEvent(){
		var that = this;
		this.sbox.onmousemove = function(eve){
			var e = eve || window.event;
			that.span.style.display = "block";
			that.bbox.style.display = "block";
			that.spanMove(e);
		}
		this.sbox.onmouseout = function(){
			that.span.style.display = "none";
			that.bbox.style.display = "none";
		}
	}
	
	spanMove(e){
		var l = e.offsetX - this.span.offsetWidth/2;
		var t = e.offsetY -this.span.offsetHeight/2;
		if(l<=0) l = 0;
		if(t<=0) t = 0;
		if(l>=this.sbox.offsetWidth-this.span.offsetWidth) l = this.sbox.offsetWidth-this.span.offsetWidth;
		if(t>=this.sbox.offsetHeight-this.span.offsetHeight) t = this.sbox.offsetHeight-this.span.offsetHeight;

		this.span.style.left = l + "px";
		this.span.style.top = t + "px";
		
		this.x = l/(this.sbox.offsetWidth - this.span.offsetWidth);
		this.y = t/(this.sbox.offsetHeight- this.span.offsetHeight);
		
		this.bboxMove(e)
	}
	
	bboxMove(e){
		this.bImg.style.left = -this.x*(this.bImg.offsetWidth - this.bbox.offsetWidth) + "px";
		this.bImg.style.top = -this.y*(this.bImg.offsetHeight - this.bbox.offsetHeight) + "px";
	}
}

//加商品减商品，加入购物车，购买;
class Car{
	constructor(options){
		this.code = options.code;
		this.star();
	}
	star(){
		var that = this;
		$("#reduceNum").click(function(){
			if($("#buyNum").val() > 1){
				$("#buyNum").val($("#buyNum").val() - 1)
			}	
		})
		$(".increase").click(function(){
			$("#buyNum").val($("#buyNum").val()- 0 + 1)
		})
		$(".buyNowBtn").click(function(){
			that.goods = getCookie("goods");
			if(that.goods == ""){
				that.goods = [{
					code:that.code,
					num:$("#buyNum").val(),
					id:$(".scjia").attr("data")
				}]
			}else{
				that.goods = JSON.parse(that.goods)
				var onoff = true;
				that.goods.forEach((v)=>{
					if(v.code == that.code){
						v.num = $("#buyNum").val() - 0 + (v.num - 0)
						onoff = false;
					}
				})
				if(onoff){
					that.goods.push({
						code:that.code,
						num:$("#buyNum").val(),
						id:$(".scjia").attr("data")
					})
				}
			}
			setCookie("goods",JSON.stringify(that.goods))
			console.log(that.goods)
		})
	}
}













