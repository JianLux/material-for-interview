### 1 节点层次
- nodeName中保存的始终都是元素的标签名，而nodeValue的值则始终为null
- NodeList是有生命的，要注意length属性表示的是访问NodeList的那一刻，其中包含的节点数
- 对Array.prototype.slice()方法可以将其转换为数组
- 同胞节点中，previousSibling属性指的是上一个节点，而nextSibling属性指的是下一个节点
#### 1 操作节点
1. appendChild()在最后节点处增加节点
2. inserBefore(),增加节点到某节点之前，若第二个参数为null,则增加在最后面
3. replaceChild()替换节点
4. removeChild()删除节点
5. cloneNode()方法接收一个布尔值参数，表示是否执行深复制，也就是是否复制及其整个子节点树；
6. normalize();
#### 2 Document类型
- title属性，可以获取页面的标题，也可以修改页面的标题
```
document.title = "new page title";
```
***
- 与网页有关的属性
1. URL属性中包含完整的URL
2. domain属性中只包含页面的域名
3. referrer属性则只保存着链接到当前页面的那个页面的URL
- domain是可以设置的可由“紧绷的”（tight）改为“松散的”（loose），不可逆转。
- 通过将每个页面的document.domain设置为相同的值，这些页面就可以互相访问对方包含的JS对象了。

#### 3 查找元素
- getElementById()
- getElementByTagName(),返回一个HTMLCollection对象，该对象有一方法namedItem()，可有名字获得对象
```
var myImage = images.namedItem("myImage");
```
- 也可直接这样
```
var myImage = images["myImage"]
```
#### 4 文档写入
- write(),writeln(),open(),close()
- wrrite()会原样写入，而writeln()则会在字符串的末尾添加一个换行符（\n）;
#### 5 Element类型
- 操作特性的三个方法：getAttribute(),setAttribute(),removeAttribute()
##### 1 getAttribute()  
有两类特性，通过getAttribute()和属性访问返回的值并不相同  
1. style 通过getAttribute()访问返回CSS文本，而通过属性访问返回一个对象
2. onclick,用特性返回相应代码的字符串，用属性返会一个JS函数
##### 2 setAttribute()
- 为DOM元素添加一个自定义属性，该属性不会自动成为元素的特性
```
div.mycolor = "red";
alert(div.getAttribute("mycolor"));          //null
```
#### 5 文本节点
- 一般来说，每个元素都只有一个文本节点。若存在两个文本节点，可用normalize()方法合并
- splitText()用于分割文本，原来的文本节点将包含从开始到指定位置之前的内容，新文本将包含剩下的文本，该方法返回一个新文本节点
- 