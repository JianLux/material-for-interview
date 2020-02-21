1. background-repeat  设置背景图片是否重复的问题
2. vertical-align:top  向上面对齐
3. white-space: nowrap 规定文本不换行
4. text-overflow: ellipsis 将溢出文本进行剪切，文末为`...`
5. 剪切文本的代码
```
white-space: nowrap
overflow: hidden
text-overflow: ellipsis
```
6. 消除空白字符的方法
- 父标签字体大小设置为0，子标签重新定义字体大小
- 消除子标签的间隔
```
<span>消除子标签的间隔</span><span>hefeng</span>
                             ^
                        删除了间隔
```
7. 调背景模糊度
```
filter:blur(10px)
```
8. sticky footers 布局
```                                                         
                                                                html
                                                                
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close">X</i>
      </div>
    </div>


css

    .detail
      position: fixed
      z-index: 100
      top:0
      left:0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7,27,27.0.8)
      .detail-wrapper
        min-height:100%    //设置最小宽度，保证内容少的时候可以充满页面
        .detail-main
          margin-top: 64px
          padding-bottom: 64px  //关键，留一定空间给底部进入
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto   //负数，进入上一级
        clear: both
        font-size: 32px
        
        .clearfix
          display: inline-block
          &:after
            display: block
            content: "."
            height: 0
            line-height: 0
            clear: both
            visibility: hidden
```
9. box-sizing
- 用于更改用于计算元素宽度和高度的默认的 CSS 盒子模型。可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行为
- `content-box`是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中
- `border-box`告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高