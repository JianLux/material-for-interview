# node.js 转发器

标签（空格分隔）： node.js

---

工作室的小伙伴在写 `H5` 页面的时候，在安卓端和 `ios` 端遇到了一个问题： 第一次请求时，后台返回了 `set-cookie`，但在接下来的的请求中，请求头并没有自动带上 `cookie`，造成登录状态和身份无法验证，于是乎，我写了一个 `node` 请求拦截器（转发器），对每次的请求和响应进行处理，包括对第一次 `cookie` 的保存，接下请求中，手动带上 `cookie`, 经验证是没问题的， 代码如下：
```

var http = require('http');
var url=require('url');
var cookie = ''
http.createServer(function (request, response) {
    var method = request.method
    var pathname = url.parse(request.url).pathname;
    var content = '';
    // 转发请求的配置
    var opt = {
         host:'localhost',
         port:'9093',
         method: method,
         path: pathname,
         headers:{
            Cookie: cookie
         }
    };
    var req = http.request(opt, function(res) {
        console.log(opt)
        // cookie 的保存
        if (cookie === '' && res.headers['set-cookie']) {
            cookie = res.headers['set-cookie']
            console.log(cookie)
        }
        res.on('data',function(body){
            console.log('return');
            content+=body;
        }).on("end", function () {
            response.writeHead(200, {'Content-Type': 'json/application'});
            response.write(content);
            response.end();
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    req.end();
}).listen(8081); // 将8081端口的请求转发至9093
```




