
$(function(){
	$("#login").validate()
})

class Login{
	constructor(){
		this.url = "http://localhost:8888/login";
		
		this.init()
	}
	init(){
		var that = this;
		$("#btn").click(function(){
			that.load()
		})
	}
	load(){
		$.ajax({
			type:"get",
			url:this.url,
			data:{
				user:$("#user").val(),
				pass:$("#pass").val()
			},
			success:function(res){
				console.log(res);
//				switch(res){
//					case "0":
//						$("#result").html("用户名或密码错误");
//						$("#user").css({background:"pink"});
//						$("#pass").css({background:"pink"})
//						setTimeout(()=>{
//							$("#user").css({background:"none"})
//							$("#pass").css({background:"none"})		
//						},1000)
//						break;
//					case "1":
//						$("#result").html("请重新输入");break;
//					default:
//						window.location.href="index.html";break;
//				}
			}
		});
	}
}
new Login;
