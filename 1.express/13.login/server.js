const express = require('express');
const app = express();
const path = require('path');
let bodyParser = require('body-parser'); // npm install  body-parser  -S  第三方中间件；

app.set("view engine", 'html');
app.set('template', path.resolve('template'));
app.engine('html', require('ejs').__express);//更改模板后缀；

app.use(bodyParser.urlencoded({extend: true}));//调用第三方中间件；
app.use(bodyParser.json());

//res.sendFile  res.redirect 都包含res.end

let users = [];

//注册页面
app.get('/user/signup', function (req, res) {
    res.render('signup', {title: "signup"});
});
//登录页面
app.get('/user/signin', function (req, res) {
    res.render('signup', {title: "signin"});
});

//用户注册时，POST方式提交；
app.post('/user/signup', function (req, res) {
    //获得请求体对象；
    let user = req.body;
    users.push(user);

    //重定向；
    res.redirect('/user/signin');
});

//用户登录；
app.post('/user/signin', function (req, res) {
    let user = req.body;
    let oldUser = users.find(function (item) {
        return user.username === item.username && user.password === item.password
    });

    if(oldUser){
        res.redirect('/welcome');
    }else{
        res.redirect('/user/signin');
    }

    //    for 循环 或者forEach 会报错，因为多次重定向；

});

//欢迎页；
app.get('/welcome',function (req,res) {
    res.send("welcome")
});
app.listen(8080);