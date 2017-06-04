const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');//中间件；
//使用中间件后，会在req上加cookies属性；
//cookie 不安全，本地可以篡改。document.cookie  可以读取cookie;
// 添加httpOnly:true以后document.cookie就不能读取。
app.use(cookieParser());

//中间件需要调用，通过传参改变执行环境；
// function cookieParser() {
//     return function ware(req,res,next) {
//
//     }
// }
app.get('/write', function (req, res) {

    // res.cookie('name', 'zfpx');//    res.setHeader('Set-Cookie','name=zfpx');
    // expires: new Date(Date.now() + 1000)  指定cookie过期时间，保存1000 ms。
    res.cookie('color', 'green', {expires: new Date(Date.now() + 10000),httpOnly:true});// domain 指的是用户再次访问指定域名时，会带上此cookie。不写domain时候代表localhost  127.0.0.1
    //path  指客户端再次向哪个路径发请求的时候才会带上cookie,如果不写，默认就是/   匹配是前缀  /read/write 也能访问到cookie.
    // res.cookie('name','SHANGUO',{path:'/read'});
    res.send('OK')

});
app.get('/read', function (req, res) {
    res.send(req.cookies);//cookie-parser的方法；
});

app.listen(3000);