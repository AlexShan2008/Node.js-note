##MongoDb
- 高并发
- 分布式
- 特别适合互联网企业，爱奇艺
- 16000 对比 
- mySQL 1200
##MEAN
## M(MongoDb) 
##E(Express ) 
##A(Angular) 
##N(Node.js) 

##Mongo常用命令

##可以先创建数据库，然后刷新
```
switched to db student
db.stu.insert(name:"zfpx")
```
##查看数据库
```
db.stu.find()
{ "_id" : ObjectId("5933b71a4abc8acd1cb16723"), "name" : "zfpx" }
```
##主键
就是一个文档最重要的键，当你向数据库的某个集合中插入一个文档的时候，mongodb会自动帮你补一个主键_id
- 唯一性 每个文档的主键不会相同
- 业务无关性

##定义Schema
    var personSchema = new mongoose.Schema({
      name:String, //姓名
      binary:Buffer,//二进制
      living:Boolean,//是否活着
      birthday:Date,//生日
      age:Number,//年龄
      _id:Schema.Types.ObjectId,  //主键
      _fk:Schema.Types.ObjectId,  //外键
      array:[],//数组
      arrOfString:[String],//字符串数组
      arrOfNumber:[Number],//数字数组
      arrOfDate:[Date],//日期数组
      arrOfBuffer:[Buffer],//Buffer数组
      arrOfBoolean:[Boolean],//布尔值数组
      arrOfObjectId:[Schema.Types.ObjectId]//对象ID数组
      nested:{ //内嵌文档
        name:String,
      }
    });
##删除当前数据库
db.dropDatabase()

remove 只删除数据，保留集合  drop删除数据和集合
