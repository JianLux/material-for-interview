1. Object.keys(obj)   ___返回一个所有元素为字符串的数组，其元素来自于从给定的对象上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致
```
/* Array 对象 */ 
let arr = ["a", "b", "c"];
console.log(Object.keys(arr)); 
// ['0', '1', '2']

/* Object 对象 */ 
let obj = { foo: "bar", baz: 42 }, 
    keys = Object.keys(obj);
// CCAC: Chrome Console Auto Copy
copy(keys); 
// ["foo","baz"]
```