# Webpack HMR 的实现过程

标签（空格分隔）： Webpack

---

> 以webpack-dev-server

## 第一步： webpack 对文件系统进行 watch打包到内存中

webpack-dev-middleware 调用 webpack的api对文件系统watch，当文件发送改变后，webpack重新对文件进行编译打包，然后保存到内存中。

webpack将bundle.js打包到内存中，而不生成文件的原因：
访问内存中的代码比访问文件系统中的文件更快，而且减少了代码写入文件的开销，这一切都归功于`memory-fs`

## 第二步： devServer 通过浏览器端文件发送改变

在这一阶段，sockjs是服务端和浏览器之间的桥梁，在启动devServer的时候，sockjs在服务端和浏览器端建立了一个webSocket长连接，以便将webpack编译打包的各个阶段状态告知浏览器，最关键的步骤还是webpack-dev-server调用webpack api监听compile的 done事件，当compile完成后，webpack-dev-server通过_sendStatus方法将编译打包后的新模块的hash值发送到浏览器端。

## 第三步： webpack-dev-server/client 接收到服务端消息做出响应

webpack-dev-server修改了`webpack`配置中的`entry`属性，在里面添加了webpack-dev-client代码，这样在最后的bundle.js文件中就有接收websocket消息的代码了

webpack-dev-server/client 当接收到type为hash消息后会将hash值暂存起来，当接收到type为ok的消息后对应用执行reload操作。

reload：
如果配置了模块热更新，就调用 webpack/hot/emitter 将最新 hash 值发送给 webpack，然后将控制权交给 webpack 客户端代码。如果没有配置模块热更新，就直接调用 location.reload 方法刷新页面。

## 第四步： webpack 接收到最新hash值验证并请求模块代码

为什么更新模块的代码不直接在第三步通过 websocket 发送到浏览器端，而是通过 jsonp 来获取呢：
功能块的解耦，各个模块各司其职，dev-server/client 只负责消息的传递而不负责新模块的获取，而这些工作应该有 HMR runtime 来完成，HMR runtime 才应该是获取新代码的地方。再就是因为不使用 webpack-dev-server 的前提，使用 webpack-hot-middleware 和 webpack 配合也可以完成模块热更新流程，在使用 webpack-hot-middleware 中有件有意思的事，它没有使用 websocket，而是使用的 EventSource。综上所述，HMR 的工作流中，不应该把新模块代码放在 websocket 消息中。

## 第五步： HotModuleReplacement.runtime 对模块进行热更新

块热更新都是发生在HMR runtime 中的 hotApply 方法中。

模块热更新的错误处理，如果在热更新过程中出现错误，热更新将回退到刷新浏览器，这部分代码在 dev-server 代码中

参考于这篇文章[here][1]


  [1]: https://zhuanlan.zhihu.com/p/30669007