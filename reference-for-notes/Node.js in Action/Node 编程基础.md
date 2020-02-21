# Node 编程基础

标签（空格分隔）： Node.js in Action

---

### 创建模块
1.  `require` 是 `Node` 中少数几个同步 `I/O` 操作之一
2. `require` 函数会返回这个模块中定义的 `exports`对象， 并且在 `Node` 中， 不能用任何其他的对象，函数或变量给 `exports` 赋值。若要对外提供单个变量， 函数或者对象， 可以使用 `module.exports`

> * 最终在程序里导出的是 `module.exports` 。`exports` 只是对 `module.export` 的一个全局引用，最初被定义为一个可以添加属性的空对象。 所以 `exports.myFunc` 只是 `module.exports.myFunc` 的简写

**注意事项 :**
1. 如果模块是目录， 在模块目录中定义模块的文件必须被命名为 `index.js`，除非你在这个目录下一个叫 `package.json` 的文件里特别指明其他的入口文件
2. `Node` 能把模块作为对象缓存起来，如果程序中的两个文件引入了相同的模块， 第一个文件会把模块返回的数据存到程序的内存中，而第二个文件直接在内存中获得该模块。

___
### 异步编程
    监控器可以被定义成持续不断地响应事件（`socket.on ('eventName', function() {})`）, 也可以被定义成只响应一次（`socket.once ('eventName', function() {})`）

### 创建事件发射器: 一个PUB/SUB的例子
下面的代码定义了一个 `channel` 事件发射器， 带有一个监听器。注意这里用 `on`（或者比较长的`addListener`）方法给事件发射器添加了监听器，用 `emit`函数发射这个事件
```
var EventEmitter = require('events').EventEmitter
var channel = new EventEmitter()
channel.on('join', function() {
    console.log("Welcome!")
})

channel.emit('join')
```

**注意**
1. 客户端断开连接时，要注意清除原来给客户端添加的`broadcast`监听器
2. 为了增加能够附加到事件发射器上的监听器数量， 不让 `Node` 在监听器数量超过10个时向你发出警告，可以用 `setMaxListeners` 方法， 以频道事件发射器为例， 可以用下面的代码增加监听器的数量
    ```
    channel.setMaxListeners(50)
    ```
3. 扩展事件监听器，用继承的方法

### 异步逻辑的顺序化
让一组异步任务顺序执行的概念被 `Node` 社区称为流程控制，这种控制分为两类： 串行和并行

#### 1. 串行
需要一个接着一个做的任务叫做串行任务

控制方法：　维护一个尚未执行的任务队列（建立一个任务数组），每完成一个则继续调用数组的下一项

#### 2. 并行
不需要一个接着一个做的任务叫做并行任务

控制方法：　依旧是把任务放到数组中，但任务的存放顺序无关紧要，每个任务都应该调用处理器函数增加已完成的任务的计数值（计数，一旦所有任务都完成，则执行后续代码）

____
这两种情况都可以利用社区里的工具解决，比较流行的有　`Nimble` `Step` `Seq`, 比较常用的是　`Nimble`
