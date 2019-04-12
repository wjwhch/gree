
class CarList{
	constructor(options){
		this.url = "http://127.0.0.1:8020/gulp/server/project/libs/goods.json";
		this.load();
		this.goods = JSON.parse(getCookie("goods"));
		this.goodsList = document.querySelector(".goodsList");
		this.allCheck = document.getElementById("allCheck");
		this.check = document.getElementsByName("ck");
		this.del = document.getElementById("delChoose");
		this.delAll = document.getElementById("delAll");
	}

	load(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				that.res = res;
				that.display()
			}
		});
		$(".selectorderitem").attr("checked",false)
	}
	display(){
		this.goods.forEach((v)=>{
			this.code = v.code;
		})
		console.log(this.goods)
		var resArr = Object.keys(this.res[0])
		var resV = Object.values(this.res[0])
		var str = "";
		for(var i=0;i<this.goods.length;i++){
			for(var j=0;j<resArr.length;j++){
				if(this.goods[i].code == resArr[j]){
					var src = resV[j];
					
					var num = this.goods[i].num;
					this.price = src[0].price;
					
					str += `<ul class="ulList clear">
								<li class="carCheckbox">
									<input class="selectorderitem" type="checkbox" name="ck">
								</li>
								<li class="carGoods"><a href="#" class="imgA"><img src=${src[0].url}/></a><a href="#" class="imgB">${src[0].des}</a></li>
								<li class="carPrice"><span class="danjia">${src[0].price}</span></li>
								<li class="carPromotion">-</li>
								<li class="carAddress">有货</li>
								<li class="carQuantity">
									<div class="clear" data="${src[0].id}">
										<span class="reduceDisable">-</span>
										<input type="text" class="numberIn" value=${num}>
										<span class="increase" id="creaseIn">+</span>
									</div>
								</li>
								
								<li class="carOperation"><em>删除</em></li></ul>`
				}
			}
		}
		$(".goodsList").html(str)
		this.init();
		this.addEvent();
	}
	
	addEvent(){
		var that = this;
		this.ulList = document.querySelectorAll(".ulList")
		for(var i=0;i<this.ulList.length;i++){
			this.ulList[i].addEventListener("click",function(eve){
				var e = eve || window.event;
				var target= e.target || e.srcElement;
				if(target.className == "reduceDisable"){
					if(this.children[5].children[0].children[1].value > 1){
						this.children[5].children[0].children[1].value = this.children[5].children[0].children[1].value - 1
					}
				}
				if(target.className == "increase"){
					this.children[5].children[0].children[1].value = this.children[5].children[0].children[1].value-0 + 1
				}
				that.id = this.children[5].children[0].getAttribute("data");
				
				that.setCookie((index)=>{
					that.goods[index].num = this.children[5].children[0].children[1].value;
				});
				that.addInit();
				if(target.tagName == "EM"){
					that.id = target.parentNode.parentNode.children[5].children[0].getAttribute("data");
					target.parentNode.parentNode.remove();
					that.setCookie((index)=>{
						that.goods.splice(index,1);
					});
				}
			})
		}
		this.del.onclick = function(){
			for(var i = 0;i<that.check.length;i++){
				if(that.check[i].checked == true){
					that.id = that.check[i].parentNode.parentNode.children[5].children[0].getAttribute("data")
					that.check[i].parentNode.parentNode.remove();
					that.setCookie((index)=>{
						that.goods.splice(index,1);
					})
				}
			}
			that.addInit();
		}
		this.delAll.onclick = function(){
			for(var n=that.ulList.length-1;n>=0;n--){
				that.ulList[n].remove();
				setCookie("goods",JSON.stringify(that.goods.splice(0,that.goods.length-1)))
			}
			that.addInit();
		}
	}	
	
	init(){
		this.goodsList.addEventListener("click",(e)=>{
			if(e.target.type == "checkbox"){
				this.addInit();
			}
		});
		this.allCheck.addEventListener("click",(e)=>{
			if(e.target.type == "checkbox"){
				if(e.target.checked == true){
					for(var i =0; i<this.check.length;i++){
						this.check[i].checked = true;
					}
				}else if(e.target.checked == false){
					for(var i =0; i<this.check.length;i++){
						this.check[i].checked = false;
					}
				}
			}
			this.addInit();
		})
		
	}
	setCookie(callback){
		for(var i=0;i<this.goods.length;i++){
			if(this.goods[i].id == this.id){
				callback(i);
			}
		}	
		setCookie("goods",JSON.stringify(this.goods))
	}
	
	addInit(){
		var plus = 0;
		for(var i=0;i<this.check.length;i++){
			if(this.check[i].checked == true){
				var price = this.check[i].parentNode.parentNode.children[2].children[0].innerHTML.slice(1)
				plus = plus + this.check[i].parentNode.parentNode.children[5].children[0].children[1].value*price;
			}
		}
		$("#ordertotalprice").html(plus);
		
		var num = 0;
		for(var i=0;i<this.check.length;i++){
			if(this.check[i].checked == true){
				num = num + this.check[i].parentNode.parentNode.children[5].children[0].children[1].value/1;
			}
		}
		$("#productQuantity").html(num);
		
	}
}
new CarList;








