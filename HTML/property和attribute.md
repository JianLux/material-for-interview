# property和attribute

标签（空格分隔）： html

---

> * DOM 有其默认的基本属性，而这些属性就是所谓的”peoperty“，无论如何，它们都会在初始化的时候再DOM对象上创建
> * 如果在TAG对这些属性进行赋值，那么这些值就会作为初始值复制给DOM的同名property

当我们自定义一些属性的话，我们将在`attributes`中拿到，而不是在`property`
要注意的是，打印attribute属性不会直接得到对象的值，而是获取一个包含属性名和值的字符串

```
<input id="in_1" value="1" sth="whatever">

var in1 = document.getElementById('in_1');
console.log(in1.attibutes.sth);     // 'sth="whatever"'
```

有一下结论：
- property能够从attribute中得到同步；
- attribute不会同步property上的值；
- attribute和property之间的数据绑定是单向的，attribute->property；
- 更改property和attribute上的任意值，都会将更新反映到HTML页面中



