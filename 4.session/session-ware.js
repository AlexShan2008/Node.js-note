const express = require('express');
//会话的中间件；
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'zfpx',//加密的秘钥；
    resave: true,//每次响应的时候都重新保存session
    saveUninitialized: true//保存未初始化的session
}));
//req.session就是会话对象，也就是客户端在服务器端的对应记录对象；
app.get('/write', function (req, res) {
    req.session.username = 'admin';
    res.send('write ok')
});
app.get('/read', function (req, res) {
    res.send(req.session.username)
});
app.listen(8080);