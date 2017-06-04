/**
 * Created by ShanGuo on 2017/5/13.
 */
let add = (a,b)=>console.log(a+b);
let sub = (a,b)=>(a-b);

// module.exports={
//     //批量导出。
//     name:'shantong',
//     age:'18'
// };

//另一种导出方式，不能批量导出，只能挂载单一方法；
exports.sayHi =()=>console.log('exports 导出的方法');

//其实导出的都是该对象下的模块对象；导出什么取决于module.exports的空间指向。如何单独用
// exports={
//     //此方法并不能正确导出模块。相当于新开辟了一个新的对象空间。
//     name:"shantong",
//     age:'18'
// };
//
// exports = module.exports = { };

module.exports={
    add:add,
    sub:sub
};


