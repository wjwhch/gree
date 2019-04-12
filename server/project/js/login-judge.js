
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
				var str = JSON.parse(res);
				switch(str.code){
					case 0:
						$(".loginJudge").html("用户名或密码错误");
						$(".landboxinput").css({background:"pink"});
//						$("#pass").css({background:"pink"});
//						$("#pass2").css({background:"pink"});
						setTimeout(()=>{
							$(".landboxinput").css({background:"none"})
							$(".judge").html("");
//							$("#pass").css({background:"none"})		
//							$("#pass2").css({background:"none"})		
						},2000)
						break;
					case 1:
						$("#result").html("请重新输入");
						window.location.href="index.html";break;
				}
			}
		});
	}
}
new Login;
