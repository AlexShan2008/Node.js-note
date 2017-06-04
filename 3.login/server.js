const express = require('express');
//express 只带一个中间件static
const app =express();
const path = require('path');
const bodyParser =require('body-parser');//把请求体转成对象；
const cookieParser =require('cookie-parser');
app.use(cookieParser());
//用户名和密码都是admin时候就认为登录成功；
//当客户端以GET方式访问/user/signup的时候由回调函数进行处理。

app.set('view engine','html');
app.set('views',path.resolve('template'));

app.engine('html',require('ejs').__express);

app.use(bodyParser.urlencoded({extended:true}));

app.get('/user/signin',function (req,res) {
    res.render('signin',{title:'登录'})//打开signin.html
});

app.post('/user/signin',function (req,res) {
    let user =req.body;
    if(user.username ==='admin'&& user.password === 'admin'){
        res.cookie('username',user.username);//把用户名保存到本地；便于后期使用；
        res.redirect('/welcome');
    }else{
        res.redirect('back')
    }

    // res.render('success',{title:"登录成功",content:'welcome'})
});

app.get("/welcome",function (req,res) {
    let user = req.cookies.username;
    res.send(`欢迎${user}光临`);
});

app.listen(8080);