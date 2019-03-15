# JS判断对象是不是数组的方法                                                                                               

标签（空格分隔）： js

---

## 一. instanceof 操作符
```
var arr = []
console.log(arr instanceof Array)
```
`arr instanceof Array` 的含义是：判断 `Array`的`prorotype`属性是不是在`arr`的原型链上，是则返回`true`, 否返回 `false`

## 二. 对象的 constructor
 
```
 var arr = []
 console.log(arr.constructor === Array)
```

## 三. instanceof 和 consructor的缺陷
通过使用 instanceof 和 constructor 来判断对象是不是数组，在大多数情况下是可以的，但实际上也还是有缺陷的，，当页面上有多个`frame`,需要在多个`iframe`中来回切换时，这种方法的缺陷就表现出来啦。

> 由于每个iframe都有一套自己的执行环境，跨frame实例化的对象彼此是不共享原型链的，因此导致`instanceof`和`constructor`失效

```
var iframe = document.createElement('iframe'); //创建iframe
document.body.appendChild(iframe); //添加到body中
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // 声明数组[1,2,3]
alert(arr instanceof Array); // false
alert(arr.constructor === Array); // false 
```

### 四. Object.prototype.toString
```
function isArrayFn (o) {
    return Object.prototype.toString.call(o) === '[object Array]'
}
var arr = [1,2,3,1]
alert(isArrayFn(arr))    // true
```

### 五. Array.isArray()
ECMAScript5 中引入了`Array.isAray()`方法，用于专门判断一个对象是不是数组，是返回`true`，不就是返回`false`;目前所有主流浏览器和IE9+都对其进行了支持，IE8及以下浏览器不支持该方法。

### 最佳方法
综合以上方法的优缺点，可以有一个最佳的判断数组的写法：

```
function isArrayFn(value){
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]"
    }
}
```