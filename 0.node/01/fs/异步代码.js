/**
 * Created by ShanGuo on 2017/5/13.
 */
//只要是回调函数，都是异步的。
//通常异步代码都有回调函数，没有返回值，在回调函数中返回结果。
//node中回调函数里，通常第一个参数是error，第二个参数是result.

//定时器
setTimeout(function(){
    console.log('timer');
},0);

console.log('后面代码');

function fe(result) {
    console.log(result)
}

function fn(callBack) {
    setTimeout(function () {
        callBack('我是fe')
    },1000)
}

fn(fe);

//事件