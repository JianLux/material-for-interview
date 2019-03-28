# JS 中的函数调用

标签（空格分隔）： js

---

函数调用的四种方法：
1. 作为一个函数调用
2. 函数作为方法调用
3. 使用构造函数调用函数
4. 作为函数方法调用函数

## 作为一个函数调用

```
    var name = "windowsName";
    function a() {
        var name = "Cherry";

        console.log(this.name);          // windowsName

        console.log("inner:" + this);    // inner: Window
    }
    a();
    console.log("outer:" + this)    
```
这样一个最简单的函数，不属于任何一个对象，就是一个函数，这样的情况在JavaScript的在浏览器中的非严格模式默认是属于全局对象 **window** 的，在严格模式，就是 undefined。

## 作为方法调用

```
    var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
    }
    a.fn();

```
然后我们一直记住的那句话**“this 永远指向最后调用它的那个对象”**，所以在 fn 中的 this 就是指向 a 的

## 使用构造函数调用函数

> 如果函数调用前使用了 new 关键字, 则是调用了构造函数。
> 这看起来就像创建了新的函数，但实际上 JavaScript 函数是重新创建的对象：

```
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}

// This    creates a new object
var a = new myFunction("Li","Cherry");
a.lastName;                             // 返回 "Cherry"
```

**new** 的过程：　
```
var a = new myFunction("Li","Cherry");

new myFunction{
    var obj = {};
    obj.__proto__ = myFunction.prototype;
    var result = myFunction.call(obj,"Li","Cherry");
    return typeof result === 'obj'? result : obj;
}

```

1. 创建一个空对象ｏｂｊ
2. 将新创建的空对象的隐私原型指向其构造函数的显示原型
3. 使用call改变this的指向
4. 如果无返回值或者返回一个非对象，则将obj返回作为新对象；如果返回值是一个新对象的话，那么直接返回该对象

## 作为函数方法调用函数
> call() 和 apply() 是预定义的函数方法。 两个方法可用于调用函数，两个方法的第一个参数必须是对象本身

> 在 JavaScript 严格模式(strictmode)下,在调用函数时第一个参数会成为this的值，即使该参数不是一个对象。

> 在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。

**匿名函数的 this 永远指向 window**