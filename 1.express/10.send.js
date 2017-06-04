const express = require('express');
const app = express();
let STATUS_CODES =require('http').STATUS_CODES;
let users = [];

app.use(function (req, res, next) {
    res.send = function (params) {
        res.setHeader('Content-Type','text/html;charset=utf8');
        // switch (typeof params) {
        switch (Object.prototype.toString.call(params)) {
            case '[object object]':
                params = JSON.stringify(params);
                break;
            case '[object Number]':
                res.statusCode = params;

        }
    }
});
app.get('/signup', function (req, res) {
    let username = req.query.username;
    users.push(username);

    res.send(users);//可以接受任意类型的内容；
    // res.end(users) ;只能接受字符串或者buffer;
});
app.listen(8080);

