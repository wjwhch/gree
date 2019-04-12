//;(function($){
//	"use strict";
//	
//	
//	$.fn.extend({
//		search:function(options){
//			this.LOCAL = {
//				url : options.url,
//				data : options.data == undefined ? {} : options.data
//			}
//			
//			var that = this;
//			//JsonP接口
//			this.LOCAL.jsonp = function(){
//				var str = "";
//				for(var i in that.LOCAL.data){
//					str = str + i + "=" + that.LOCAL.data[i] + "&";
//				}
//				str = str.slice(0,str.length-1);
//				that.LOCAL.url = that.LOCAL.url + "?" + str;
//				
//				that.LOCAL[that.LOCAL.data[that.LOCAL.data._name]] = function(res){
//					that.load(res)
//				}
//				
//				var script = document.createElement("script");
//				script.src = that.LOCAL.url;
//				document.body.appendChild(script)
//			}
//			
//			//搜索程序模块
//			this.LOCAL.load = function(res){
//				var str ="";
//				res.s.forEach(function(v){
//					str += `<li>${v}</li>`
//				})
//				$(".underBox").html(str)
//			}
//		}
//		
//
//	})
//	
//
//})(jQuery)

	function Search(){
			this.txt = document.getElementById("txt");
			this.ul = document.querySelector(".underBox");
			this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
			
			this.addEvent();
		}
		
		Search.prototype.addEvent = function(){
			var that = this;
			this.txt.onkeyup = function(){
				that.val = this.value;
				that.load();
			}
		}
		
		Search.prototype.load = function(){
			var that = this;
			jsonp(this.url,function(res){
				that.res = res;
				that.display();
			},{
				_name:"cb",
				cb:"hc",
				wd:this.val
			})
			
		}
		
		Search.prototype.display = function(){
			var str = "";
			this.res.s.forEach(function(v){
				str += `<li>${v}</li>`
			})
			this.ul.innerHTML = str;
		}
		
		var a = new Search();