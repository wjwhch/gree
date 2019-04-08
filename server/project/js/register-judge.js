
$(function(){
	$("#login").validate()
})

class Login{
	constructor(){
		this.url = "http://localhost:8888/register";
		
		this.init()
	}
	init(){
		var that = this;
		$("#btn").click(function(){
			if($("#pass").val() == $("#pass2").val()){
				that.load()				
			}
		})
	}
	load(){
		$.ajax({
			type:"post",
			url:this.url,
			data:{
				user:$("#user").val(),
				pass:$("#pass").val()
			},
			success:function(res){
				console.log(res)
//				switch(res.code){
//					case "0":
//						$(".judge").html("用户名重复");
//						$("#user").css({background:"pink"});
//						$("#pass").css({background:"pink"});
//						$("#pass2").css({background:"pink"});
//						setTimeout(()=>{
//							$("#user").css({background:"none"})
//							$("#pass").css({background:"none"})		
//							$("#pass2").css({background:"none"})		
//						},1000)
//						break;
//					case "2":
//						;break;
//					default:
//						window.location.href="index.html";break;
//				}
			}
		});
	}
}
new Login;
