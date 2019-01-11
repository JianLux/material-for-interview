# CORS(跨域资源共享)

标签（空格分隔）： 浏览器

---

## 简介
CORS(cross-origin resource sharing)需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

CORS 请求分成两类: 简单请求和非简单请求

## 简单请求
简单请求要满足以下两大条件:
1. 请求方法是以下三种方法之一: HEAD, GET, POST
2. HTTP的头信息不超出以下几种字段:

* Accept
* Accept-Language
* Content-Language
* Last-Event-ID
* Content-Type: 只限于三个值 application/x-www-form-urlenccoded, multipart/form-data, text/plain

凡是不满足上面两个条件的,就属于非简单请求

> 注意 Conntent-type 字段的类型是 application/json 是非简单请求

浏览器直接发出CORS请求,具体来说,就是在头信息中,增加一个 origin 字段

如果origin 指定的源,果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果origin 指定的域名在可许可范围内, 服务器返回响应,会多出几个头信息字段
```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

> 需要注意的是Access-Control-Expose-Headers,XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值.

## 非简单请求

### 1. 预检请求

非简单的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求， 称为“预检”请求

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

“预检”请求用的请求方法是 **OPTIONS**, 表示这个请求是用来询问的。头信息里面，关键字段是 **origin**,表示请求来自哪个源，除了 **origin** 字段， 请求头包括两个特殊字段

    1. Access-Control-Request-Method
    2. Access-Control-Request-Headers
    
### 2. 预检请求的回应
服务器收到”预检“请求后，检查了`Origin`,`Access-Control-Request-Method` 和 `Access-Control-Request-Headers` 字段以后，确认允许跨域请求，就可以做处回应，回应包含以下几个字段

    1. Access-Control-Allow-Origin
    2. Access-Control-Allow-Methods
    3. Access-Control-Allow-Credentials
    4. Access-Control-Allow-Headers
    5. Access-Control-Max-Age

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。

### 3. 浏览器的正常请求和反应
一旦服务器通过了“预检”请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个 `origin` 头信息字段。服务器的回应，也都会有一个 `Access-Control-Allow-Origin`
