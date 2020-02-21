# JSX简介
- 在JSX代码外面扩上一个小括号，这样可以防止分号自动插入的bug
## JSX属性
- 使用引号来定义以字符串为值的属性
```
const element = <div tabIndex="0"></div>;
```
- 也可以使用大括号来定义以javaScript表达式为值的属性
```
const element = <img src={user.avatarUrl}></img>;
```
## JSX嵌套
- 如果JSX标签是闭合式的，那么你需要在结尾处用/>,就好像XML/HTML一样：
```
const element = <img src={user.avatarUrl} />;
```
==注意==：因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。
```
例如，class 变成了 className，而 tabindex 则对应着 tabIndex.
```
# 元素渲染
- React只会更新必要的部分

# 组件渲染
- 当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件,这个对象称之为“props”
- 例如,这段代码会在页面上渲染出"Hello,Sara"：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
==注意==：组件名称必须以大写字母开头
- 例如，`<div/>`表示一个DOM标签，但<Welcome />表示一个组件并限定了它的可用范围。
- 组件的返回值只能有一个根元素。
- 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。来看这个sum函数

# 事件渲染
- 你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined