
$(function(){
	$("#login").validate()
});

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
				var str = JSON.parse(res);
				switch(str.code){
					case 0:
						$(".judge").html("用户名重复");
						$("#user").css({background:"pink"});
//						$("#pass").css({background:"pink"});
//						$("#pass2").css({background:"pink"});
						setTimeout(()=>{
							$("#user").css({background:"none"})
							$(".judge").html("");
//							$("#pass").css({background:"none"})		
//							$("#pass2").css({background:"none"})		
						},2000)
						break;
					case 1:
						$(".alertBox").css({display:"block"})
						$(".alertBox span").html(str.msg);break;
						setTimeout(()=>{
							location.href="http://localhost:8888/index"
						},3000)
					default:
						
//						window.location.href="index.html";break;
				}
			}
		});
	}
}
new Login;

//弹出框确定按钮
$(".alertBox input").click(function(){
	$(".alertBox").css({display:"none"})
})





