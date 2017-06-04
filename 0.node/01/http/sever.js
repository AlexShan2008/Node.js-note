// http 内置模块，搭建server
let http = require('http');
let fs = require('fs');
let mime = require('mime');//第三方模块；
// console.log(mime);

/**
 * req 代表客户端请求对象；
 * res 代表的是服务端响应对象；
 * http 默认端口80
 *127.0.0.1本地localhost IP地址
 * 可以在浏览器中打开网址：
 * 1、127.0.0.1:8000
 * 2、localhost:8000
 */
http.createServer(function (req, res) {
    // console.log(req.url);
    let pathname = req.url;
    let flag = fs.existsSync('.'+pathname);
    if(flag) {
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html;charset=utf=8');//告诉客户端返回的文件类型；mime类型；image/image
            //请求的是根路径；
            let resHtml = fs.readFileSync('./index.html');
            res.end(resHtml);
        }
        // res.end("Hello server!");//结束响应。只能放字符串或者buffer。\

        //其他位于服务端的静态资源处理；
        if (req.url === './index1.js') {
            res.setHeader('Content-Type', 'application/javascript;charset=utf-8');
            let resJs = fs.readFileSync('./index1.js');
            res.end(resJs);
        }

        if (req.url === './index.css') {
            res.setHeader('Content-Type', 'text/css;charset=utf-8');
            let resCss = fs.readFileSync('./index.css');
            res.end(resCss);
        }
    }else{
    //处理不存在的资源；
        res.statusCode =404;
        res.end('404 NOT FOUND');
    }


}).listen(8000, function () {
    console.log("监听8000端口");
});