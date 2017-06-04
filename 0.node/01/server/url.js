/**
 * Created by ShanGuo on 2017/5/13.
 */
let url = require('url');

let urlStr = "http://localhost:63342/node/01/server/index.html?_ijt=fss89e59noup6nghms7gp6cfnm";

let urlObj = url.parse(urlStr, true);//将url解析成对象的形式。true 数据类型为obj，键值对的形式，否则默认为字符串的形式。
console.log(urlObj);
