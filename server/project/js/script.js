
$(".bottomMargin ul li").mouseover(function(){
	$("#bottomMargin .ban").css({left:$(this).css("left")})
	console.log($(this))
})
