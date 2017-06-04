/**
 * Created by ShanGuo on 2017/5/14.
 */
let http = require('http');
let url = require('url');
let fs =require('fs');

http.createServer(function (req,res) {
    let {pathname,query} = url.parse(req.url);

    //导入index.html首页；
    if (pathname === "/") {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        let resHtml = fs.readFileSync('./index.html');
        res.end(resHtml);
        return;
    }

    if(pathname === "/getTime"){
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        let time = new Date().toLocaleDateString();
        res.end(time);
    }

}).listen(3000,function () {
    console.log("监听3000端口");
});