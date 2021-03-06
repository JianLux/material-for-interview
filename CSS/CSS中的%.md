﻿# CSS中的%

标签（空格分隔）： css

---

## 定位类

- static: 并没有对元素起到定位的作用，所以left,right等位置不能被有效赋值，所以不存在定位功能上的%值
- absolute: 定位的参照物是祖先元素中存在的定位的元素，所以%相对的元素便是这个参照物。left,right是相对于width,top和bottom是相对于height
- relative： 定位的参照物是相对于自身的，那么这个%就是相对于自身的宽高
- fixed: 定位相对于视窗，那么自然%的参照物是视窗的宽高

## 盒子模型

- margin&padding: 他们参照物是父元素的**宽度!!!!!**,**宽度!!!!!**。我们可以使用padding的这一特殊性质实现16:9或4:3等各比例响应式图片，视频盒子的构建
- border: border-width目前还不允许输入%值。
- border-radius: 平时我们用这个属性的时候基本都是给他赋4个参数，代表四个角，分别是左上、右上、右下、左下，以顺时针的顺序排序。但实际上，border-radius最多可以取八个值，前四个值和后四个值用 / 隔开，斜杠前表示各角水平方向上的圆角半径，斜杠后表示各角竖直方向上的圆角半径

## 背景值

- background-size: 当我们想让背景充满整个盒子的时候，可以这样写：
```
background-size: 100% 100%
```
    background-size的参照物和border-radius一样，都是盒子自身的宽高

- background-position: 这个属性和relative类似，起到的也是定位作用的效果，因此它的参照物对象就是原盒子。但它比较特殊，它不是参考原盒子的宽高值，而是**原盒子的宽高值减去背景图片的宽高值所得的剩余值**，更为形象的说，下面这两个属性值是等价的：“center center”和“50% 50%”，背景图片会自动居中。

## transform

- tanslate(): 参照物是自身的宽高
- tanslate3d(): 它的第三个属性，指的是z轴上的偏移，因为z-index的默认值是auto,所以%并不能起作用，也就是说对translateZ()赋予百分比的值是无意义的
- transform-origin: 这个属性是改变元素变形的原点，它和width还有height的特点是一模一样的
- scale(): 控制元素的缩放比例，传入的参数一般是浮点数，指的是相对于元素本身放大或缩小的比例
- zoom: zoom并不是tansform的属性值，他是一个独立的css属性，之所以把他放在transform这一个模块讨论，是因为恰好它与scale()有共同的特征，它的取值既可以是浮点数，也可以是%，包括参照物，都与scale()等价。

## 字体

- font-size: 这个属性和我们的height一样，是参照父盒子的字体大小

- line-height（原本大小继承于祖代元素）: 
    - 如果属性值是一个无单位的数组，那么最后的结果便是这个数字与该元素字体大小的乘积
    - 如果属性值是%，最后的结果是给定的百分比乘以元素最后计算出的字体大小

- text-index: 这个属性是用来设置首行缩进的，我们最长用的是2em，首行缩进两个字符，这边的2em指的就是两倍的font-size，按道理来说如果它取%应该也是要相对于本身的font-size的，但是偏偏就那么特别，和padding和margin一样，如果设置的是%，则参照的是父元素的width。这应该算是一个特例吧



