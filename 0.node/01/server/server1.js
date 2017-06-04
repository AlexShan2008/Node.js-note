/**
 * Created by ShanGuo on 2017/5/13.
 */
let http = require('http');
let fs = require('fs');
let mime = require('mime');
let url = require('url');//内置，用来解析url。
let qs = require('querystring');//用来解析jquery AJAX的数据格式；传给后台的数据name=shantong&id=1;

/**
 * @param1 { object}  req 代表客户端请求对象；
 * @param2 { object}  res 代表服务端响应对象；
 */
http.createServer(function (req, res) {
    //ES6解构赋值；
    let {pathname, query} = url.parse(req.url, true);
    // let urlObj = url.parse(req.url,true);
    // let pathname = urlObj.pathname;
    // let query = urlObj.query;

    //处理html请求；
    if (pathname === '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        let resHtml = fs.readFileSync('./getData.html');
        res.end(resHtml);
        return;
    }

    // if (pathname === '/favicon.ico') {
    //     res.setHeader('Content-Type', 'image/jpeg;charset=utf-8');
    //     let resImg = fs.readFileSync('./imgs/favicon.ico');
    //     res.end(resImg);
    //     return;
    // }

    //判断是get还是post请求；req.method;


    //get请求；

    // if (pathname === '/getData') {
    //     res.setHeader('Content-Type', 'application/json;charset=utf-8');
    //     let resJson = fs.readFileSync('./data.json');
    //     res.end(resJson);
    //     return;
    // }

    //POST请求；
    if (pathname === '/getData') {
        if (req.method === "GET") {
            console.log(query);
            console.log("这个是get请求");
        } else if (req.method === "POST") {
            console.log("这个是POST请求");
            let str = "";
            req.on("data", function (data) {
                str += data;
            });
            req.on("end", function () {
                let objData = qs.parse(str);
                console.log(str);
                console.log(objData);
            });

        }

        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        //把json文件的数据，传给前端；
        let resJson = fs.readFileSync('./data.json');
        res.end(resJson);
        return;
    }


    //处理静态资源请求；
    let flag = fs.existsSync('.' + pathname);

    if (flag) {
        res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf-8');
        let resText = fs.readFileSync('.' + pathname);
        res.end(resText);
    } else {
        res.statusCode = 404;
        res.end("404 NOT FOUND")
    }


}).listen(8090, function () {
    console.log("监听8090端口");
});