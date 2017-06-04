/**
 * Created by ShanGuo on 2017/5/13.
 */
let http = require('http');
let fs = require('fs');
let mime = require('mime');

/**
 * @param1 { object}  req 代表客户端请求对象；
 * @param2 { object}  res 代表服务端响应对象；
 */
http.createServer(function (req, res) {
    let baseUrl = req.url;
    console.log(baseUrl);

    //处理html请求；
    if (baseUrl === '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        let resHtml = fs.readFileSync('./index.html');
        res.end(resHtml);
        return;
    }

    //处理静态资源请求；
    let flag = fs.existsSync('.' + baseUrl);//检测文件路径；

    if (flag) {
        res.setHeader('Content-Type', mime.lookup(baseUrl) + ';charset=utf-8');
        let resText = fs.readFileSync('.' + baseUrl);
        res.end(resText);
    } else {
        res.statusCode = 404;
        res.end("404 NOT FOUND")
    }


}).listen(3000, function () {
    console.log("监听3000端口");
});