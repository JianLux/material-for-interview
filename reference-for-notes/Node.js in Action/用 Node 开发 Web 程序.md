# 用 Node 开发 Web 程序

标签（空格分隔）： Node.js in Action

---

## HTTP 服务器的基础知识
```
var http = require('http')

var server = http.createSerVer(function(req, res) {
    // 处理需求
})
```
服务器每收到一条 `HTTP` 请求， 都会用新的 `req` 和 `res` 对象触发请求的回调函数。在触发回调函数之前， `Node` 会解析请求的 `HTTP` 头，并将它们作为 `req` 对象的一部分提供给请求回调。但 `Node` 不会在回调函数被触发之前开始对请求体的解析

在调用完请求回调函数之后，就要由你负责用 `res.end()` 方法结束响应。如果你没能结束响应，请求就会挂起，知道客户端超时，或者它会一直处于打开状态

### 读取请求头及设定响应头
比如发送 `HTML` 内容时，必须发送一个值为 `text/html` 的 `Content-Type` 头， 让浏览器知道要把响应结果作为 `HTML` 渲染
`Node` 提供了几个修改 `HTML` 响应头的方法: `res.setHeader(field, value)`, `res.getHeader(field)` 和 `res.removeHeader(field)`
```
var body = 'Hello World'
res.setHeader('Content-Length', body.length)
res.setHeader('Content-Type', 'text/plain')
res.end(body)
```
添加和移除响应头的顺序，一定要在调用 `res.write()` 或 `res.end()` 之前

### 设定 HTTP 响应的状态码
`res.statusCode = 404`

____
## 构建 RESTful Web 服务
> 用cURL 模拟向流浪器发送请求

当 Node 的 `HTTP` 解析器读入并解析请求数据时，它会将数据做成`data` 事件的形式，把解析好的**数据块**放入其中，等待程序处理
```
var http = require('http')
var server = http.createServer(function(req, res) {
    // 将数据格式转为字符串
    req.setEncoding('utf8')
    req.on('data', function(chunk) {
        console.log(chunk)
    })
    req.on('end', function() {
        console.log('done parsing')
        res.end()
    })
})
```

当用 `GET`请求获取资源，如果可能的话，应该在响应中带着 `Content-Length` 域一起发送，设定 `Content-Length`, 设定 `Content-Length` 域会隐含禁用 `Node` 的块编码，因为要传输的数据更少，所以能提升性能。

> url.parse() 可以解析路径的信息，常常会用到

____
## 提供静态文件服务
> * `__dirname` 在 `node` 中的值是文件所在目录的路径

### 用steam.pipe() 优化数据传输
`Node` 中，来自源头（`ReadableStream`）的数据，管道可以让它们 “流动”到某个目的地（`WritableStream`），你可以用 `pipe` 方法把管道连起来：
`ReadableStream.pipe(WritableStream)`

```
var server = http.createServer((req, res) => {
    var url = parse(req.url)
    var path = join(root, url.pathname)
    var stream = fs.createReadStream(path)
    stream.pipe(res)
})
```
### 处理服务器错误
服务器应该是健壮的，要考虑各种情况，不然服务器会被搞垮，没有处理至少也要返回500

`fs.stat()` 可以获取文件的相关信息

### 表单
用 `queryString.parse()` 函数可以解析表单数据
```
$ node
> var qs = require('querystring')
> var body = 'item=take+ferrets+to+the+vet'
> qs.parse(body);
{item: 'take ferrets to the vet'}
```