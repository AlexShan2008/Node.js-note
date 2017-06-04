const http =require('http');
const url = require('url');

http.createServer(function (req,res) {
    let urlObj =url.parse(req.url,true);
    let {pathname,query}=urlObj;

    if(pathname === '/write'){//写cookie
        //设置响应头的cookie。
        // res.setHeader('Set-Cookie','name=zfpx');//第二个参数可以是数组['age=18','name=zfpx']
        res.setHeader('Set-Cookie',['age=18','name=zfpx']);//如果传1个，可以写字符串，多个写成数组。
        res.end("OK");
    }else if(pathname === '/read'){//读cookie
        //取请求头中字段的时候，都要用小写字母来取。
        let cookie = req.headers.cookie;
        console.log(cookie);
        res.end(cookie);
    }else{
        res.end('Not Found');
    }
}).listen(3000,function () {
    console.log(3000);
});