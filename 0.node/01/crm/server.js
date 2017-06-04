/**
 * Created by ShanGuo on 2017/5/13.
 */
let http = require('http');
let url = require('url');
let fs = require('fs');
let mime = require('mime');
let qs = require('querystring');
let resResult = {'success': "用户数据请求成功！"};
let reqResult = {
    "error": 0,
    "msg": "",
    "data": ""
};

http.createServer(function (req, res) {
    let {pathname, query} = url.parse(req.url, true);
    // let pathname = url.parse(req.url).pathname;
    // let query = url.parse(req.url).query;

    //导入index.html首页；
    if (pathname === "/") {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        let resHtml = fs.readFileSync('./index.html');
        res.end(resHtml);
        return;
    }

    //读取所有用户的信息；
    let userList = fs.readFileSync('./users.json', 'utf8');//string


    //获取所有用户数据接口；
    if (pathname === '/getUserData') {
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.end(userList);
        return;
    }

    //添加用户数据的接口；
    //因为是用户信息，所以用post方式；
    if (pathname === '/addUserData') {
        let str = "";
        req.on('data', function (data) {
            //接收前段用POST发送的数据。
            str += data;
        });

        req.on("end", function () {
            //str:   name=sun&tel=123456
            let userObj = qs.parse(str);//将接收到的用户信息解析成JSON对象；
            //userObj   { name: 'sun', tel: '123456' }
            userList = JSON.parse(userList);//把数据类型转换为object；

            let lastInd = userList.data.length - 1;//找到最后一个数据的索引值；

            userObj.id = userList.data[lastInd].id + 1;
            userList.data.push(userObj);//将数据添加到数据中；

            let resFlag = fs.writeFileSync('./users.json', JSON.stringify(userList));//同步；


            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(resResult));

            //同步没有返回结果，异步才有；
            if (!resFlag) {
                reqResult.msg = "用户信息修改成功";
                res.end(JSON.stringify(reqResult));
            } else {
                reqResult.error = 1;
                reqResult.msg = "用户信息修改失败";
                res.end(JSON.stringify(reqResult));
            }
        });
        return;
    }


    //获取单个用户信息；
    if (pathname === '/getUserInfo') {
        let uid = query.id;

        let userData = JSON.parse(userList).data;//userList是JSON字符串，需要解析成JSON。

        for (let i = 0, len = userData.length; i < len; i++) {
            let curData = userData[i];
            let curId = curData.id.toString();
            if (curId === uid) {
                reqResult.data = curData;
                break;
            }
        }

        reqResult.msg = "用户信息修改成功";
        res.setHeader('Content-Type', 'application/plain;charset=utf-8');
        res.end(JSON.stringify(reqResult));

        return;
    }


    //修改用户信息；
    if (pathname === '/updateUserInfo') {
        let str = "";
        req.on('data', function (data) {
            //接收前段用POST发送的数据。
            str += data;
        });

        req.on("end", function () {
            let userObj = qs.parse(str);
            let uid = Number(userObj.id);

            userList = JSON.parse(userList);

            let userData = userList.data;
            let curData = {};

            for (let i = 0, len = userData.length; i < len; i++) {
                if (uid === userData[i].id) {
                    userData[i].name = userObj.name;
                    userData[i].tel = userObj.tel;
                }
            }

            userList = JSON.stringify(userList);
            fs.writeFileSync('./users.json', userList);

            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            reqResult.msg = '用户信息修改成功';
            res.end(JSON.stringify(reqResult));
        });
        return;
    }


    //删除用户数据的接口，因为是get请求，所以收到的信息就query；
    if (pathname === '/removeUserInfo') {

        let rid = query.rid;

        userList =JSON.parse(userList);//转成成json对象；
        let userData = userList.data;


        for (let i = 0, len = userData.length; i < len; i++) {
            let uid = userData[i].id.toString();
            if (uid === rid) {
                userData.splice(i, 1);
                break;
            }
        }

        userList =JSON.stringify(userList);//转成成json字符串；
        fs.writeFileSync('./users.json',userList );

        reqResult.msg = "用户删除成功";

        res.setHeader('Content-Type', 'application/plain;charset=utf-8');
        res.end(JSON.stringify(reqResult));
        return;
    }

    //批量处理静态资源文件，如image、css、js文件；
    let flag = fs.existsSync('.' + pathname);
    if (flag) {
        res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf-8');
        let resContext = fs.readFileSync('.' + pathname);
        res.end(resContext)
    } else {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.statusCode = 404;
        res.end("404 NOT FOUND")
    }

}).listen(9080, function () {
    console.log("监听9080");
});