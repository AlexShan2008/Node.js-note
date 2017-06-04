const http =require('http');

http.createServer(function (req,res) {
    let method =req.method;
    let url =req.url;

    res.setHeader('Content-Type','text/html;charset=utf8');
    if(method === 'GET'){
        res.end("Welcome")
    }

}).listen(3000,function () {
    console.log("监听3000");
});