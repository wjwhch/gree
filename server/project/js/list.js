class goodsBox{
	constructor(){
		this.init();
		
	}
	
	init(){
		var that = this;
		$.ajax({
			url:"http://127.0.0.1:8020/gulp/server/project/libs/goods.json",
			success:function(res){
				that.res = res;
				that.load();
			}
		});
	}
	
	load(){
		this.goodsBox = JSON.parse(getCookie("goodsBox"));

		var resArr = Object.keys(this.res[0])
		var resV = Object.values(this.res[0])
		var str = "";
		
		for(var i = 0;i<this.goodsBox.length;i++){
			for(var j=0;j<resArr.length;j++){
				if(this.goodsBox[i].id == resArr[j]){
					for(var h = 1;h<resV[j].length;h++){
						var src = resV[j][h];
						str += `
									<li>
										<a href="goodsmsg.html" target="_blank"><img src=${src.url}></a>
										<p><a href="goodsmsg.html" target="_blank">${src.des}</a></p>
										<span>${src.price}</span>
										<b data=${resV[j][0].id} class="listId">加入购物车</b>
									</li>
								`
					}
				}
			}
		}
		$(".goodsBox ul").html(str);
		this.addEvent();
	}
	addEvent(){
		var that = this;
		$(".goodsBox").on("click","img",function(){
			this.degital = [{
				code:that.goodsBox[0].id
			}]
			setCookie("degital",JSON.stringify(this.degital))
		})
		
		$(".listId").click(function(){
			that.goods = getCookie("goods");
			if(that.goods == ""){
				that.goods = [{
					code:that.goodsBox[0].id,
					num:1,
					id:$(".listId").attr("data")
				}]
			}else{
				that.goods = JSON.parse(that.goods)
				var onoff = true;
				that.goods.forEach((v)=>{
					if(v.code == that.goodsBox[0].id){
						v.num++;
						onoff = false;
					}
				})
				if(onoff){
					that.goods.push({
						code:that.goodsBox[0].id,
						num:1,
						id:$(".listId").attr("data")
					})
				}
			}
			setCookie("goods",JSON.stringify(that.goods))
		})
	}
}

new goodsBox;