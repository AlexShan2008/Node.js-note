/**
 * Created by ShanGuo on 2017/5/13.
 */
let qs = require('querystring');

let str = 'name=liwenli&id=1';
let obj ={
    name:'shantong',
    id:1
};

console.log(qs.parse(str,'&'));//指定分隔符,默认是&分隔符。
console.log(qs.stringify(obj,"*"));//把JSON对象转换成制定数据类型。