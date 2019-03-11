# JS如何判断一个对象为空

标签（空格分隔）： js

---

1. for...in...遍历属性，为真则为“非空数组”；否则为“空数组”
```
var judgeObj = function(obj) {
    for(var item in obj) {
        return true
    }
    return false
}
```
2. 通过JSON自带的.stringify方法来判断
```
var judgeObj = function(obj) {
    if(JSON.stringify(obj) == "{}") return true;
    else return false
}
```
3. ES6新增的方法Object.keys()
```
var judgeObj = function(obj) {
    if (Object.keys(obj).length == 0) return true;
    else return false
}
```



