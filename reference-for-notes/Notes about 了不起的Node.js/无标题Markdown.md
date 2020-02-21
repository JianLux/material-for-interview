# Chapter 2- javaScript概览
## 1- 类型
- javaScript类型： 基本类型个复杂类型
- 访问基本类型，访问的是值，访问复杂类型，访问的是对值的引用
- 基本类型包括number,boolean, string,null,undeFined.
- 复杂类型包括array, function以及object
```
var a = ['hello', 'workd'];
var b = a;
b[0] = 'bye';
a[0];                            //结果为“bye”
b[0];                            //结果为“bye”
```
## 2- 类
- javaScript中没有class关键词。类只能通过函数来定义：
```
function Animal () {}
```
- 要给所以Animal的实例定义函数，可以通过prototype属性来完成：
```
Animal.prototype.eat = function (food) {
    //eat method
}
```
- ==注意==，在prototype的函数内部，this并非像普通函数那样指向global对象，而是指向通过该类创建的实例对象：
```
function Animal(name) {
    this.name = name;
}

Animal.prototype.getName() {
    return this.name;
};

var animal = new Animal('tobi');
a.getName() == "tobi";              //true
```
_____
# chapter 3- 阻塞与非阻塞IO
## 异常
- 要捕获一个未来才会执行到的函数所抛出的错误是不可能的。这会直接抛出未捕获的异常，并且catch代码块永远都不会被执行：
```
try {
    setTimeout(function() {
        throw new Error("here");
    }, 10);
} catch(e) {}
```
_____
# Chapter 4- Node中的JavaScript
- process .nextTick函数可以将一个函数的执行时间规划到下一个事件循环中
```
console.log(1);
process.nextTick(function() {
    console.log(3);
});
console.log(2);
```
- console.log
- console.error
## 模块系统
- 绝对模块：是指Node通过在其内部node_modules查找到的模块，或者Node内置的如fs这样的模块。
- 相对模块：是指向一个相对工作目录中的JavaScript文件。
## 暴露API
- 要让模块暴露一个API成为require调用的返回值，就要依靠module和exports这两个全局变量
- 在默认情况下，每个模块都会暴露出一个空对象。如果你想要在该对象上添加属性，那么简单地使用exports即可：
```
module_a.js


exports.name = 'john';
exports.data = 'this is some data';

var privateVariable = 5;

exports.getPrivate = function() {
    return privateVariable;
};
```
```
index.js

var a = require('./module_a');
console.log(a.name);
console.log(a.data);
console.log(a.getPrivate());
```
- 要是在该对象上逐个添加属性无法满足你的需求，你还可以彻底重写module.exports:
```
person.js

module.exports = Person;

function Person(name) {
    this.name = name;
};

Person.prototype.talk = function() {
    console.log('我的名字是'，this.name);
}
```
```
index.js

var Person = require('./person');
var john = new Person('join');
john.talk();

在index文件中，你不再接收一个对象作为返回值，而是函数，这得归功于对module.exports的重写。
```
______
# Chapter 5- 命令行工具（CLI）以及FSAPI：首个Node应用
## argv
- process.argv包含了所以Node程序运行时的参数值，第一个元素始终是node,第二个元素始终是执行的文件路径，紧接着是命令行紧跟着的参数。
- 要获取这些真正的元素，需要首先将数组的前面两个元素去除掉
```
console.log(process.argv.slice(2));
```
## 退出
- 要让一个应用退出，可以调用process.exit并提供一个退出代码，比如 ，当发生错误时，要退出程序，这个时候最好是使用退出打码1：
```
console.error('An error occurred');
process.exit(1);
```
## Stream
- fs.createReadStream方法允许为一个文件创建一个可读的Stream对象
- 每次会读取可变大小的内容块，并且每次读取后会触发回调函数
```
var stream = fs.createReadStream('my-file.txt');

stream.on('data', function(chunk) {
    //处理文件部分内容
})；

stream.on('end', function(chunk) {
    //文件读取完毕
})；
```
# Chapter 6- TCP
## TCP的特性
- 面向连接的通信和保证顺序的传递
- 面向字节
- 可靠性
- 流控制
- 拥堵控制
______
# Chapter 7- HTTP
## 发送数据块的方式在涉及文件系统的情况下会非常高效。
```
require('http').createServer(function () {
    res.writeHead(200, {'Content-Type': 'image.png'});
    var stream = require('fs').createReadStream('image.png')
    stream.on('data', function (data) {
        res.write(data);
    });
    stream.on('end', function () {
        res.end();
    });
}).listen(3000);
```
- Node.js提供了一个方法让上述例子代码变得非常简洁
```
require('http').createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
    require('fs').createReadStream('image.png').pipe(res);
})
```
-  Node.js提供了一个称为querystring的模块，可以方便的将字符串解析成一个方便处理的headers对象。
```
console.log(require('querystring').parse('name = Guillermo'));

输出：
{name: 'Guillermo'}
```