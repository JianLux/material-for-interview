# CSS外边距折叠

标签（空格分隔）： CSS

---

## What?

在CSS中，两个或多个毗邻的普通流中的盒子（可能是父子元素，也可能是兄弟元素）在垂直方向上的外边距会发生叠加，这种形成的外边距称之为外边距叠加。

> 我们可以注意定义中的几个关键字：毗邻、两个或多个、**垂直方向**和**普通流**

###　毗邻

没有被　`padding`, `border`, `clear`,`line box`分隔开

### 普通流（in flow）

只要不是 `float`,`absolutely`,`positioned`,`root element`时就是 in flow

## When?

外边距叠加存在两种情况： 一是父子外边距叠加，而是兄弟外边距叠加

- 都属于普通流的块级盒子且参与到相同的块级格式上下文中
- 没有被padding、border、clear和line box分隔开
- 都属于垂直毗邻盒子边缘：

    - 盒子的top margin和它第一个普通流子元素的top margin
    - 盒子的bottom margin和它下一个普通流兄弟的top margin
    - 盒子的bottom margin和它父元素的bottom margin
    - 盒子的top margin和bottom                                 margin，且没有创建一个新的块级格式上下文，且有被计算为0的min-height，被计算为0或auto的height，且没有普通流子元素

## How?

避免叠加的办法：
- 浮动元素不会与任何元素发生叠加，也包括它的子元素
- 创建了 BFC 的元素不会和它的子元素发生外边距叠加
- 绝对定位元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- inline-block 元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- 普通流中的块级元素的 margin-bottom 永远和它相邻的下一个块级元素的 margin-top 叠加，除非相邻的兄弟元素 clear
- 普通流中的块级元素（没有border-top、没有padding-top）的margin-top和它的第一个普通流中的子元素（没有clear）发生 margin-top 叠加
- 普通流中的块级元素（height为auto、min-height为0、没有border-bottom、没有padding-bottom）和它的最后一个普通流中的子元素（没有自身发生margin叠加或clear）发生 margin-bottom叠加
- 如果一个元素的 min-height为0、没有border、没有padding、高度为0或者auto、不包含子元素，那么它自身的外边距会发生叠加



