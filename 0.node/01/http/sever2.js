// http 内置模块，搭建server
let http = require('http');
let fs = require('fs');
let mime = require('mime');//第三方模块；

http.createServer(function (req, res) {
    // console.log(req.url);
    let pathname = req.url;
    let flag = fs.existsSync('.' + pathname);
    if (flag) {
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html;charset=utf=8');//告诉客户端返回的文件类型；mime类型；image/image
            let resHtml = fs.readFileSync('./index.html');
            res.end(resHtml);
            return;
        }
        //其他位于服务端的静态资源处理；
        if (req.url === pathname) {
            res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf-8');
            let resJs = fs.readFileSync('.' + pathname);
            res.end(resJs);
        }
    } else {//处理不存在的资源；
        res.statusCode = 404;
        res.end('404 NOT FOUND');
    }


}).listen(9090, function () {
    console.log("监听9090端口");
});