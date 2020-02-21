# 1- 创建Node.js应用
## 1-1 引入required模块
```
var http = required("http");
```
## 1-2 创建服务器
```
var http = required('http');

http.createServer(function(required, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    response.end('Hello world\n');
}).listen(8888);

//终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```
# 2- Node.js 回调函数
## 2-1 非阻塞代码
```
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");

//终端输出
$ node main.js
程序执行结束!
菜鸟教程官网地址：www.runoob.com\
```
# 3- Node.js EventEmitter
```
//引入 events 模块
var events = require('events');
//创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();


eventEmitter.on('some_event', function() {
    console.log('some_event 事件触发')
})；
```
