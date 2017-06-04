const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const SESSION_KEY = 'connect.sid';
let sessions = {};//存放所有的会话数据；


app.use(cookieParser());
/**
 * 1、第一次访问的时候，咖啡厅会送1000元的余额；
 * 2、以后每次访问都会扣减100元，直至扣光为止。
 *
 */

app.get('/visit', function (req, res) {
    //判断客户端是否有此sessionId
    let sessionId = req.cookies[SESSION_KEY];
    if (sessionId) {
        let sessionObj =sessions[sessionId];//不一定存在，有可能客户端篡改，或者服务端数据丢失都可能。
        if(sessionObj){
            sessionObj.balance -=100;
            res.send(`亲，欢迎光临，您储值卡余额${sessionObj.balance}元。`)
        }else{
            newCard();
        }
    } else {
        newCard();
    }
    function newCard() {
        //    第一次，没有sessionId;要保证唯一，保证安全；
        let newSessionId = Date.now() + '' + Math.random();
        //服务器端开辟一块内存，用于记录卡号的数据；
        sessions[newSessionId] = {balance: 1000};
        res.cookie(SESSION_KEY, newSessionId);//将cookie写入客户端；
        res.send(`亲，欢迎光临，送你一张价值1000元的储值卡。`)
    }

});

app.listen(3000);