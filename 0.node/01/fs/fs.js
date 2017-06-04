let fs = require('fs');//内置模块；
//读取文件；
//同步读取,阻塞后边代码；
// let resHtml = fs.readFileSync('./index.html','utf8');//设置文件格式；默认读取出来的是buffer二进制格式。
// console.log(resHtml);
// console.log(123);//先输出网页，后输出123.同步阻塞。

/**
 * 异步读取；
 * callBack 时间点不确定。
 * @param error 错误信息 读取成功则返回null。
 */
let resHtml = fs.readFile('./index.html', 'utf8', function (error, result) {
    if (error) {
        throw Error(error);
    } else {
        console.log(result)
    }
});

console.log("后面的代码");//会先执行输出。
console.log(resHtml);//undefined.

/**
 * 对文件进行写入内容，异步写入；只能是字符串或者buffer格式的。
 * @param1 fd文件路径；
 * @param2 data写入的内容；
 * @param3 flag：可选：w写入内容会覆盖掉之前原有的内容，a追加内容。
 */

fs.writeFile('./data.txt', 'Hello node.js，单通', {flag: 'w'}, function (err) {
    console.log(err);
});

let obj = {
    "name": "zhufeng",
    "id": 1
};

let data2 = fs.readFileSync('./data2.txt', 'utf8');//

fs.writeFile('./data.txt', data2, {flag: 'a'}, function (error) {
    if (error) {
        console.log(error);
    } else {
        alert("success");
    }
});

fs.writeFile('./data.txt', JSON.stringify(obj), {flag: 'a'}, function (error) {
    if (error) {
        console.log(error);
    } else {
        alert("success");
    }
});

