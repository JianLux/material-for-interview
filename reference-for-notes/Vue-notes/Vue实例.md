# 数据与方法
- 当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时 data 中存在的属性是响应式的
- 如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值
- 除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来
# 对象更改检测注意事项
- 由于Javascript的限制，Vue不能检测对象属性的添加或删除
```
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的
vm.b = 2
// `vm.b` 不是响应式的
```
- 对于已经创建的实例，Vue不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性
```
Vue.set(vm.userProfile, 'age', 27)
```
- 你还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名
```
this.$set(this.userProfile, 'age', 27)
```
# 事件处理
- 在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加关键修饰符
```
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">

<!-- 同上 -->
<input v-on:keyup.enter="submit">
```
- 全部的按键别名
```
.enter
.tab
.delete (捕获 “删除” 和 “退格” 键)
.esc
.space
.up
.down
.left
.right
```
- 可以通过全局 config.keyCodes 对象自定义键值修饰符别名
```
Vue.config.keyCodes.f1 = 112
```
-----
```
.ctrl
.alt
.shift
.meta

注意：在Mac系统键盘上，meta对应命令键 (⌘)。在Windows系统键盘meta对应windows徽标键(⊞)。在Sun操作系统键盘上，meta对应实心宝石键 (◆)。在其他特定键盘上，尤其在MIT和Lisp键盘及其后续，比如Knight键盘，space-cadet键盘，meta被标记为“META”。在Symbolics键盘上，meta被标记为“META” 或者 “Meta”。
```

```
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```