let http =require('http');
let url =require('url');
let querystring =require('querystring');

//cookie 是浏览器缓存，每个浏览器都不一样；

http.createServer(function (req,res) {
    let {pathname,query} = url.parse(req.url,true);

    res.setHeader('Content-Type','text/html;charset=utf8');

    if(pathname === '/visit'){
        let cookie = req.headers.cookie; // name=zfpx;age=9;visit=1;
        let cookieObj =querystring.parse(cookie,'; ');
        let visit =cookieObj.visit;
        if(visit){
            visit++;
        }else{
            visit =1;
        }
        res.setHeader('Set-Cookie',`visit=${visit}`);
        res.end(`欢迎你第${visit}次光临！`)
    }else{
        res.end('Not Found')
    }


}).listen(8000,function () {
    console.log(8000);
});
