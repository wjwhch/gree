let http = require("http");

let fs = require("fs");

let querystring = require("querystring");

let url = require("url");

let arr = [];

//开启服务
http.createServer((req,res)=>{
	if(req.url != "favicon.ico"){
		var urlObj = url.parse(req.url,true);
		switch(urlObj.pathname){
			case "/login":
				login(req,res,urlObj);
				break;
			case "/register":
				register(req,res);
				break;
			default:
				fs.readFile("project"+req.url,(error,data)=>{
					if(error == null){
						res.write(data)
					}else{
						res.write("404")
					}
					res.end();
				})
		}
	}
}).listen("8888","localhost",()=>{
	console.log(1)
})

function login(req,res,url){
	var onoff = true;
	for(i=0;i<arr.length;i++){
		if(arr[i].user == url.query.user && arr[i].pass == url.query.pass){
			res.write('{"msg":"登录成功","code":1}');
			onoff = false;
			break;
		}
	}
	if(onoff){
		res.write('{"msg":"用户名或密码不对","code":0}')
	}
	res.end()
}


function register(req,res){
	var str = "";
	var i = 0;
	req.on("data",(msg)=>{
		str += msg;
		i++;
	})
	req.on("end",()=>{
		var obj = querystring.parse(str);
		var onoff = true;
		for(var i=0;i<arr.length;i++){
			if(arr[i].user == obj.user){
				res.write('{"msg":"重名","code":0}')
				onoff = false;
			}
		}
		if(onoff){
			res.write('{"msg":"成功","code":1}');
			arr.push(obj)
		}
		res.end();
	})
}



