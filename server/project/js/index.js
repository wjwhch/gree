/*页面渲染*/
class Page{
	constructor(options){
		this.url = options.url;
		this.load()
	}
	load(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
//				console.log(res);
				that.res = res;
				that.init();
//				console.log(res[0].hotGoods)
			}
		});
	}
	init(){
		var hotstr = "";
		for(var i=0;i<this.res[0].hotGoods.length;i++){
			hotstr += `<li index=${this.res[0].hotGoods[i].code}>
						<a href="goodsmsg.html" target="_blank">
							<img src="${this.res[0].hotGoods[i].url}">
							<span>${this.res[0].hotGoods[i].price}</span>
						</a>
					</li>`	
		}
		$("#hotSale ul").html(hotstr)
		
		var pyAirsstr = "";
		pyAirsstr = `<dt><a href="goodsmsg.html" target="_blank"><img src="${this.res[0].pyAir[0].url}"></a></dt>`;
		for(var i=1;i<this.res[0].pyAir.length;i++){
			pyAirsstr += `<dd index=${this.res[0].pyAir[i].code}>
							<a href="goodsmsg.html" target="_blank">
								<img src="${this.res[0].pyAir[i].url}"/>
								<span>${this.res[0].pyAir[i].price}</span>
							</a>
						</dd>`
		}
		
		var mgAirstr = "";
		mgAirstr = `<dt><a href="goodsmsg.html" target="_blank"><img src="${this.res[0].mgAir[0].url}"></a></dt>`;
		for(var i=1;i<this.res[0].mgAir.length;i++){
			mgAirstr += `<dd index=${this.res[0].mgAir[i].code}>
							<a href="goodsmsg.html" target="_blank">
								<img src="${this.res[0].mgAir[i].url}"/>
								<span>${this.res[0].mgAir[i].price}</span>
							</a>
						</dd>`
		}
		
		var hbyAirstr = "";
		hbyAirstr = `<dt><a href="goodsmsg.html" target="_blank"><img src="${this.res[0].hbyAir[0].url}"></a></dt>`;
		for(var i=1;i<this.res[0].hbyAir.length;i++){
			hbyAirstr += `<dd index=${this.res[0].hbyAir[i].code}>
							<a href="goodsmsg.html" target="_blank">
								<img src="${this.res[0].hbyAir[i].url}"/>
								<span>${this.res[0].hbyAir[i].price}</span>
							</a>
						</dd>`
		}
		
		
		$(".pyAir").html(pyAirsstr+mgAirstr+hbyAirstr);
	}
}
new Page({
	url:"http://127.0.0.1:8020/gulp/server/project/libs/goods.json"
})





/*商品详情页渲染*/
class List{
	constructor(options){
		this.adiv = document.getElementsByClassName("houseBody");
		this.hotSale = document.getElementById("hotSale")
		this.addEvent();
	}
	addEvent(){
		var that = this;
		for(var i=0;i<this.adiv.length;i++){
			this.adiv[i].addEventListener("click",function(eve){
				var e=eve||window.event;
				var target = e.target||e.srcElement;
				if(target.nodeName == "IMG"){
					that.code = target.parentNode.parentNode.getAttribute("index");
					that.setCookie();
				}
				
			})
		}
		this.hotSale.addEventListener("click",function(eve){
				var e=eve||window.event;
				var target = e.target||e.srcElement;
				if(target.nodeName == "IMG"){
					that.code = target.parentNode.parentNode.getAttribute("index");
					that.setCookie();
				}
		})
		console.log(that.code)
		
	}
	setCookie(){
		this.degital = getCookie("degital");
		if(this.degital == ""){
			this.degital=[{
				code:this.code
			}];
		}else{
			this.degital = JSON.parse(this.degital);
			this.degital.forEach((v)=>{
				v.code = this.code;
			})
		}
		setCookie("degital",JSON.stringify(this.degital));
	}
}

new List;

