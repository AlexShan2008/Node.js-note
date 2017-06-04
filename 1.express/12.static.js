const express = require('express');
const app = express();
const path = require('path');


//root是静态文件的根目录； static 原理；
// /css/index.css
function static(root) {
    return function (req, res, next) {
        //http://localhost:3000/css/index.css
        //root       http://localhost:3000
        //req.path   /css/index.css
        let realPath = path.join(root, req.path);
        fs.exists(realPath, function (exists) {
            if (exists) {
                res.sendFile(realPath)
            } else {
                next();
            }
        })
    }
}

//下面的中间件来解决静态资源的加载；
app.use(express.static(path.resolve('public')));//设置静态资源的地址，可以指定多个静态资源目录；
app.use(express.static(path.resolve('build')));//设置静态资源的地址，可以指定多个静态资源目录；
app.get('/', function (req, res) {
    // res.sendFile('./index.html',{root:__dirname})//path 必须是绝对路径；把文件发给客户端
    res.sendFile(path.resolve('./index.html'))//path 必须是绝对路径；把文件发给客户端
});
app.listen(3000);