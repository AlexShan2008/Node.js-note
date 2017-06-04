let User = {
    data: [
        {age: 1},
        {age: 2},
        {age: 3},
        {age: 4},
        {age: 5},
        {age: 6},
        {age: 7},
        {age: 8},
        {age: 9},
        {age: 10},
    ],
    skip(skip){
        this._skip = skip;
        return this
    },
    limit(limit){
        this._limit = limit;
        return this
    },
    sort(sortObj){
        //返回排序后的数组；
        let key = Object.keys(sortObj)[0];
        let order = sortObj[key];// 1 \\ -1
        this._sort = function (a, b) {
            return (a[key] - b[key]) * order
        };
        return this
    },
    exec(callback){
        let result = this.data.sort(this._sort).slice(this._skip, this._skip + this._limit);
        callback(null, result);
        return this
    },

};

User.sort({age: -1}).skip(3).limit(3).exec(function (err, doc) {
    console.log(err);
    console.log(doc);
});