const mongoose = require('mongoose');
//1.连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/node');//localhost
mongoose.Promise=Promise;//用mongoose的promise代替node.js的Promise;

let UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});//collection 强行指定集合的名称；

let User = mongoose.model('User', UserSchema);

let users = [];
for (let i = 0; i <= 10; i++) {
    users.push({name: `zfpx${i}`, age: i})
}
// User.create(users);

//高级查询
/**
 * 1.根据ID查询文档；
 *
*/

// User.findById('5933ca8a778c191d28a1d0c4',function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });

// find 会查询整个数据库，无论是否找到结果；
// User.find({name:'zfpx1',age:1},function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });

//返回对象或者null
// User.findOne({name:'zfpx1',age:1},function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });

//查询age>5
// find 第二个参数 projection 投影  映射
//name:0  include 表示只显示name字段；当然__id字段会一直显示；
//name:1  exclude 排除 表示不显示name字段，其它字段都显示；
//根据显示少的来定义；

// User.find({age:{$gt:5}},{name:1},function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });


//分页查询；
let pageNum =2;
let pageSize = 3;
//sort 按年龄先排序；age:1 升序   age:-1倒序排列 从大到小
//skip跳过指定的条数；
//limit 限制返回的最大条数；
//exec 执行查询;
User.find({}).sort({age:1}).skip((pageNum-1)*pageSize).limit(pageSize).exec(function (err,doc) {
    console.log(err);
    console.log(doc);
});

// //使用Promise的回调函数；
// User.find({}).then(function (result) {
//     console.log(result);
// });
