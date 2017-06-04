const mongoose = require('mongoose');
//1.连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/node');//localhost

//2.定义集合的骨架模型  key就是文档的属性名  值就是属性的类型,schema不能操作数据库；
//外键就是别人家，别的集合的主键。
let UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, {collection: 'users'});//collection 强行指定集合的名称；

//3.定义模型，模型才能操作数据库；
//默认集合的名称   模型名=>lowercase  user=> 复数users
let User = mongoose.model("User", UserSchema);
//向数据库的集合中插入一个文档db.stu.insert({name:"zfpx"})//异步添加，
//第一个参数可以是数组；
// User.create([{name: 'zfpx1', age: 1},{name: 'zfpx2', age: 2},{name: 'zfpx3', age: 3},{name: 'zfpx3', age: 3}], function (err, doc) {
//     //数据的类型要和schema的指定数据类型向对应。
//     //如果给的字段多余给定的schema字段，不会传染数据库。
//     console.log(err);
// //    doc是保存成功之后的文档对象；
// //     console.log(doc);//{ __v: 0, name: 'zfpx', age: 10, _id: 5933bd43731ff01eb85eea86 }  __v 版本号
// });

// 修改数据库；默认只修改匹配的第一条数据；{multi:true} 删除全部匹配的数据；
// User.update({age:3},{name:'zfpx33'},{multi:true},function (err,result) {
//     console.log(result);
// });


//删除数据
//默认删除所有匹配的数据；
// User.remove({age:3},function (err,result) {
//     console.log(err);
//     console.log(result);
// });

//数据操作  1分插入  9分查询
//不管是否找到匹配数据，都会返回数组；没有匹配返回空数组。可以判断docs.length>0 判断匹配数据。
// User.find({age:1},function (err,docs) {
//     console.log(err);
//     console.log(docs);//返回数组
// });

//查询age=1 \\ age=2。{$or:[{age:1},{age:2}]}
//大于0小于3 {age:{$gt:0,$lt:3}}
//大于0小于3 {age:{$in:[1,2]}}
//  name:/zfpx[12]/     name://zfpx(1\2)/
//

// User.find({$or:[{age:1},{age:2}]},function (err,docs) {
//     console.log(err);
//     console.log(docs);//返回数组
// });

// User.find({name:/zfpx[12]/ },function (err,docs) {
//     console.log(err);
//     console.log(docs);//返回数组
// });

User.find({name:'zfpx1',age:1 },function (err,docs) {
    console.log(err);
    console.log(docs);//返回数组
});
User.find({name:'zfpx1'},{age:1 },function (err,docs) {
    console.log(err);
    console.log(docs);//返回数组
});

// app.listen(8080);

