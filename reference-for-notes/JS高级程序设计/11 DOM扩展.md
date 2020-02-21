## 1 选择符API
### 1 querySelector()
- 该方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有匹配项，则返回null
- 如果传入了不被支持的选择符，则抛出错误
### 2 querySelectorAll()
- 该方法接收一个CSS选择符，返回与该模式匹配的所有匹配项，即一个NodeList对象，如果没有匹配项，则返回一个空的NodeList对象
## 2 元素遍历
1. childElementCount:返回子元素（不包括文本节点和注释）的个数
2. firstElementChild:返回第一个元素；firstChild版
3. lastElementChild:返回最后一个元素；lastChild版
4. previousElementSibling:指向前一个同辈元素；previousSibling的元素版
5. nextElementSibling:指向后一个同辈元素：nextSibling的元素版
## 3 HTML5
### 1 与类相关的扩充
1. getElementByClassName()
- 该方法接收一个参数，即一个包含一个或多个类名的字符串，返回带有指定类型的所有元素的NodeList。传入多个类名时，类名的先后顺序不重要
2. classList属性
```
div.classList.remove("disabled");            //删除“disabled"
div.classList.add("current");               //添加"current"
div.classList.toggle("user")                //切换“user"
div.classlist.contains("user")               //true 判断是否有user
```
### 2 焦点管理
1. document.activeElement属性，这个属性始终会引用DOM中当前获得了焦点的元素
2. document.hasFocus方法 ，用于确定文档是否获得了焦点
### 3 HTMLDocument 的变化
1. readyState属性，如果文档加载完成，则为complete,如果正在加载，则为loading,就是通过它来实现一个指示文档已经加载完成的指示器，通常为如下用法：
```
if (document.readyState == "complete") {
    //执行的操作
}
```
2. 兼容模式（渲染页面的模式）
- document.compatMode,如果在标准模式下，则值为"CSS1Compat",在混杂模式下，则值等于"BackCompat"
3. head 属性
### 4 字符集属性
- charset属性表示文档中实际使用的字符集，也可以用来指定新字符集
- defaultCharset属性，表示根据默认浏览器及操作系统的设置
### 5 自定义数据属性
- 自定义属性名的前缀必须有data-，通过元素的dataset属性来访问自定义属性的值。每个data-name形式的属性都会有一个相对应的属性，只不过没有data-前缀
```
<div id = "myDiv",data-appId="12"></div>

//取得自定义属性的值
var appId = div.dataset.appId;
```
### 6 插入标记
#### 1 innerHTML 属性
- 在写模式下，innerHTML的值会被解析为DOM子树，替换调用原来的所有子节点
- 该属性的一些限制：
1. 对<script>的局限性（p259）
2. 
- window.toStaticHTML()能把一个HTML字符串，加工为一个无害处理后的版本-从源HTML中删除所有的脚本节点个事件处理程序属性
#### 2 outerHTML属性
- 用法与innerHTML相同，但返回的是包括自身及所有子节点
#### 3 insertAdjacentHTML()方法（p297）
#### 4 内存与性能问题
- 使用上述属性会导致一些你存问题
### 7 scrollIntoView()方法
## 4 专有扩展（p299）