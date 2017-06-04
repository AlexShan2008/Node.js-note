/**
 * Created by ShanGuo on 2017/5/13.
 */
console.log("Hello World!");

// console.log(window);//浏览器；undefined;

console.log(global);//相当于浏览器中的window。

console.log(this);//{ } this指向一个空对象。

function JS(exports, moduleexports, __dirname, __filename){
    //将每一个JS文件都放在了闭包中，只是对外暴露了一些接口，所以每一个JS文件都是一个模块，所以输入this的时候，并不能指向global，而是指向对应的模块。
}

