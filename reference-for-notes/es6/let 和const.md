# let 和const

标签（空格分隔）： ES6

---

## let

### 基本用法
 只在 `let` 命令所在的代码块内有效
 
```javascript
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i)
    }
}

a[6]();
```
上面代码中, 变量 `i` 是 `let` 声明的, 当前的 `i` 只在本轮循环有效, 所以每一次循环的 `i` 其实都是一个新的变量, 所以最后输出的是 `6`. `JavaScript` 引擎内部会记住上一轮循环的值, 初始化本轮的变量 `i`时, 就在上一轮循环的基础上进行计算.
___

`for` 循环还有一个特别之处, 就是设置循环变量的那部分是一个父作用域, 而循环内部是一个单独的子作用域
```JavaScript
for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}
// abc
// abc
// abc
```
### 不存在变量提升
`var` 命令会发生"变量提升" 现象, 即变量可以在声明之前使用, 值为 `undefined`, `let` 命令改变了语法行为, 它所声明的变量一定要在声明后使用, 否则报错
```JavaScript
    console.log(foo);    // undefined
    var foo = 2;
    
    console.log(bar);   //报错ReferenceError
    let bar = 2;
```

### 暂时性死区
只要块级作用域存在`let`命令, 它所声明的变量就"绑定"(binding) 这个区域, 不再受外部的影响
```JavaScript
var tum = 123;

if (true) {
    tem = 'abc';
    let tmp;
}
```
上面的代码中, 存在全局变量 `tem` , 但是块级 作用域内 `let` 又声明了一个局部变量 `tmp`, 导致 后者绑定这个块级作用域, 所以在 `let` 声明变量前, 对 `tmp` 赋值就会报错.

> ES6 明确规定, 如果区块中存在 `let` 和 `const` 命令, 这个区块对这些命令声明的变量, 从一开始就形成了封闭作用域. 凡是你在声明之前就使用这些变量, 就会报错. 这在语法上, 称为 "暂时性死区"

"暂时性死区"也意味着 `typeof` 不再是一个百分之百安全的操作.
```javaScript
typeof x;      // ReferenceError
let x;
```
作为比较, 如果一个变量根本没有被声明, 使用 `typeof` 反而不会报错.
```JavaScript
typeof undeclared_variable  // "undefined"
```
有些 "死区" 比较隐蔽, 不太容易发现.
```JavaScript
function bar(x = y, y = 2) {
    return [x, y];
}

bar();   //报错
```
因为 参数 `x` 默认值等于另一个参数 `y`, 而此时 `y` 还没有声明, 属于"死区". 如果 `y`默认值是 `x`, 就不会报错, 因为此时 `x` 已经声明了

另外, 下面的代码也会报错, 与 `var` 的行为不同. 使用 `let` 声明变量时, 只要变量在还没有声明完成前使用, 就会报错.
```JavaScript
var x = x;  // 不报错

let x = x; // 报错
```

### 不允许重复声明
`let` 不允许在相同的作用域内, 重复声明同一个变量.
```JavaScript
function func () {
    let a = 10;
    var a = 1;
}  // 报错

function func() {
    let a = 10;
    let a  = 1
}  //报错
```
因此, 不能在函数内部重新声明参数
```javaScript
function func (arg) {
    let arg;    //报错
}

function func (arg) {
    {
        let arg:   //不报错
    }
}
```
___
## 块级作用域

### 为什么需要块级作用域

第一种场景, 内层变量可能会覆盖外层变量
```javaScript
var tmp = new Date();

function f() {
    console.log(tmp);
    if (false) {
        var tmp = 'hello world';
    }
}

f() ;    // undefined
```
变量提升导致内层的 `tmp` 变量覆盖了外层的 `tmp` 变量

第二种场景, 用来计数的循环变量泄露为全局变量
```JavaScript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
}

console.log(i)  //5 
```
___
## const 命令
`const` 声明一个只读的常量. 一旦声明, 常量的值就不能改变.
```javaScript
const PI = 3.1415
PI  = 3 报错
```
`const` 一旦声明变量, 就必须立即初始化, 不能留到以后赋值, 不然就报错
```JavaScript
const foo; // 报错
```
`const`的作用域与 `let` 命令相同: 只在声明所在的块级作用域内有效, 也是不提升, 同样也存在暂时性死区, 也是不可以重复声明.

### 本质
`const` 实际上保证的, 并不是变量的值不得改动, 而是变量指向的那个内存地址不得改动. 对于简单类型的数据 (数值, 字符串, 布尔值) , 值就保存在变量指向的那个内层地址, 因此等同与常量. 但对于复合类型的数据 (主要是对象和数组), 变量指向的内存地址, 保存的只是一个指针, `const` 只能保证这个指针是固定的, 至于它指向的数据结构是不是可变的,就完成不能控制了.
```JavaScript
const foo = {};
foo.prop = 123;  // 可以成功
foo = {}  // 报错

const a = [];
a.push('Hello')   //可执行
a.length = 0;    // 可执行
a = ['Dave']
```
如果真的想把对象冻结, 应该使用`Object.freeze` 方法.
``` javaScript
const foo = Object.freeze({});

// 常规模式时, 下面一行不起作用
// 严格模式下, 该行会报错
foo.prop = 123
```
除了将对象本身冻结, 对象的属性也应该冻结. 下面是一个将读对象彻底冻结的函数.
```JavaScript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```