# vue和React 对比

标签（空格分隔）： 框架

---
React 和Vue的相似之处
1. 使用Virtual DOM, 有自己的diff渲染算法
2. 提供了响应式（Reactive）和组件化（Composable）的视图组件
3. 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库

## 不同的地方
 
### HTML & CSS
在React中，一切都是javaScript.不仅仅是HTML可以用JSX来表达，在的潮流也越来越多地将 CSS 也纳入到 JavaScript 中来处理。这类方案有其优点，但也存在一些不是每个开发者都能接受的取舍。Vue 的整体思想是拥抱经典的 Web 技术，并在其上进行扩展。

#### JSX vs Templates

在React中，所有的组件的渲染功能都依靠JSX.使用JSX的渲染函数有下面的优势：
    
1. 你可以使用完整的编程语言 JavaScript功能来构建你的视图页面。比如你可以使用临时变量，JS自带的流程控制，以及直接引用当前JS作用域的值等等
2. 开发工具对JSX的支持相比于现有可用的其他Vue模板还是比较先进

虽然Vue也可以使用JSX, 但基本都使用模板语法，这也带来了一些特有的优势：

1. 对于很多习惯了HTML的开发者来说，模板比起JSX读写起来比较自然。
2. 基于HTML的模板使得将有已有的应用逐步迁移到Vue更为容易

#### 组件作用域内的CSS
**vue:**
设置样式的默认方法是单文件组件里类似style的标签。单文件组件让你可以在同一个文件里完全控制CSS,将其作为组件代码的一部分
```
<style scoped>
  .container {
    display: flex;
  }
</style>
```

这个可选 `scoped`属性会自动添加一个唯一的属性为组件内CSS指定作用域

**react:**
语法不太一样，React设置class是用className字段，而设置css是使用对象的形式，当然，一般还是引入外部的css(经过编译的sass或者less文件)比较合适。

### 怎么选择
1. React对比Vue来说，Vue的学习成本更低，更容易入手，模板语法开发起来个人觉得会比React的Jsx更快
2. 由于React是需要setState更新状态以及利用shouldComponentUpdate来控制是否reRender，当应用比较庞大的时候，这一点的优化比较重要。推荐大应用使用React。


