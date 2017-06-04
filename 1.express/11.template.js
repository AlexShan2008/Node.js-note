/**
 * 模板
 * 渲染模板时候，需要本地依赖ejs 模块
 * npm install ejs -S
 * 默认模板文件夹的文件是views
 * 设定模板存放的根目录
 * @type {*}
 */
const express = require('express');
const app = express();
let path = require('path');


//设置模板请求；
app.set('view engine', 'html');//默认是ejs
//设定模板存放的根目录；views和上面的view 是对应的；不能改变
app.set('template', path.resolve('template'));//更改模板文件夹的名称；
app.engine('html', require('ejs').__express);//更改模板后缀；

app.use(function (req,res,next) {
    res.locals.website = "珠峰培训";//渲染模板的真正数据对象；共有的，所有模板都有的；
    res.locals.Beijing = "Beijing";//渲染模板的真正数据对象；共有的，所有模板都有的；
    next();
});
app.get('/', function (req, res) {
    // render 负责把模板文件和数据对象进行混合，并响应输出。
    res.render('home', {//第一个参数是模板的相对路径，不用写后缀；第二个参数是数据对象；
        title: "首页"
    });
});
app.get('/user', function (req, res) {
    // render 负责把模板文件和数据对象进行混合，并响应输出。

    res.render('user', {
        title: '用户主页'
        // website: '珠峰培训'
    });//第一个参数是模板的相对路径，不用写后缀；第二个参数是数据对象；

});
app.listen(8080);