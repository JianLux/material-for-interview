# Service Worker

标签（空格分隔）： 浏览器

---

## 什么是 Service Worker
> Service Worker 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

Service Worker 能做些什么？

* 后台消息传递
* 网络代理，转发请求，伪造响应
* 离线缓存
* 消息推送
* ....

以下主要是讲了 Sevice Worker 中的应用

## 生命周期

### 1. 注册 Service Worker
在这个步骤主要是告诉浏览器，你的 Service Worker 脚本在哪里

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          console.log('注册成功', registration)
        }).catch((err) => {
          console.log('注册失败', err)
        })
      } 
      
> Service Worker 监听的请求跟 Service worker 的脚本所在的地址有关，如上是`/sw.js`,即`/`根目录下的所以文件的请求都会被监控到 

### 2. 激活 Service Worker

注册后，浏览器会尝试为你的页面或站点安装并激活它。`install` 事件会在安装后完成之后的触发。 `install` 事件一般是被用来填充你的浏览器的离线缓存能力，决定哪些文件是你想存的

    var CACHE_NAME = 'hefeng-cahe'

    var urlsToCache = [
      '/',
      '/css/main.css',
      './js/main.js'
    ]
    
    self.addEventListener('install', (event) => {
      event.waitUntil(
       // 开一个缓存
        caches.open(CACHE_NAME).then((cache) => {
          console.log('Opened  cache')
            // 缓存我们的文件
          return cache.addAll(urlsToCache)
        })
      )
    })

### 3. 监听获取 fetch 和消息 message 事件

每次任何被 service worker 控制的资源被请求到时，都会触发 `fetch` 事件，我们可以添加一个 fetch 的事件监听器，接着调用 event 上的 respondWith() 方法来劫持我们的HTTP响应，然后你用可以用自己的方法来更新他们。

caches.match(event.request) 允许我们对网络请求的资源和cache里可获取的资源进行匹配，查看是否缓存中有相应的资源。这个匹配通过 url 和 vary header 进行，就像正常的 HTTP 请求一样。

    self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request).then((response) => {
        // 如果缓存存在，则直接返回
          if (response) {
            return response
          }
            // 如果没有，则拿出这个请求
          var request = event.request.clone()
          // 通过fetch去请求这个东西
          return fetch(request).then((response) => {
            // 这里进行判断，如果返回是图片类型的资源的话则加入缓存
            if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)){
              return response;
            }
            var responseClone = response.clone();
            caches.open('my-test-cache-v1').then(function (cache) {
              // put和add的区别是：put不进行请求，直接把request和response传入
                cache.put(evt.request, responseClone);
            });
            return response;
            })
        })
      )
    })
    
至此为止， 当我们第一次访问页面时，service worker 注册并激活，此时的资源是从服务器端请求，当打开该页面时，资源来自 service worker（从请求头可以看到这个效果），此时，即使资源服务器关闭了，依旧有离线的数据。这就做到了离线和加载性能上的提升。

### 上传 Servicce Worker
当有一个用户访问你的 web 应用，浏览器将尝试重新下载包含了 Service Worker 的 .js 文件。这将在后台执行。

如果与当前 Service Worker 的文件相比，新下载的 Service Worker文件中存在哪怕一个字节的差异，则浏览器将会认为有变更，且必须启动新的 Service Worker。

新的 Service Worker 将启动并且安装事件将被移除。然而，在这一点上，旧的 Service Worker 仍在控制你的 web 应用的页面，这意味着新的 Service Worker 将进入 waiting 状态。

一旦你的 web 应用程序当前打开的页面都被关掉，旧的 Service Worker 就会被浏览器干掉，西南装的 Service Worker 将完全掌控应用。这就是它激活的事件将被干掉的时候。

为什么需要这些？为了避免两个版本的 Web 应用程序同时运行在不同的 tab 上 —— 这在网络上实际上非常常见，并且可能会产生非常糟糕的错误（例如，在浏览器中本地存储数据时，会有不同的 schema）。

### 更新

如果修改了service-worker.js的JS文件，则会更新serviceWorker，重新开始install。当然向上面所说的，更新了文件之后，你会想去删除掉以往通过动态加入进Cache Storage的一些东西。所以我们可以在新的serviceWorker的activate事件里面进行清除。

    self.addEventListener('activate', function(e) {
        // 缓存白名单
    	var whiteList = ['my-cache', 'hefeng-cache']
    
    	event.waitUntil(
    		// caches.keys()得到键的数组
    		caches.keys().then(function(cacheNames) {
    			// 返回Promise对象
    			return Promise.all(
    				cacheNames.map(function(cacheName) {
    					if(whiteList.indexOf(cacheName) === -1) {
    						return caches.delete(cacheName)
    					}
    				})
    			)
    		})
    	)
    
    })
    
这样做可以在新的serviceWorker在install完activate的时候，对白名单以外的缓存进行删除。相当于reset了一次Cache Storage

### HTTPS 要求

在构建 Web 应用程序时， 开发者可以通过本地主机使用 Service Worker, 但是一旦将其部署到生产环境中，则需要准备好HTTPS.

使用 Service Worker，你可以劫持连接并伪造响应。若不使用 HTTPS，你的 web 应用程序变得容易发生`中间人攻击`。

为了更安全，你需要在通过 HTTPS 提供的页面上注册 Service Worker，以便知道浏览器接收的 Service Worker 在通过网络传输时未被修改。

### 美好特性

* **推送通知** —— 允许用户选择从 web 应用程序及时获取通知。

* **后台同步** —— 在用户网络不稳定时，允许开发者推迟操作，直到用户具有稳定的连接。这样，就可以确保无论用户想要发送什么数据，都可以发出去。

* **定时同步**（未来支持）—— 提供管理定期后台同步功能的 API。

* **地理围栏**（未来支持）—— 开发者可以自定义参数，创建感兴趣区域的地理围栏。当设备跨越地理围栏时，Web 应用程序会收到通知，这可以让开发者根据用户的地理位置提供有效服务

> 看完可以去了解一下什么是 PWA （progressive web app）: 渐进式网页应用