# js 函数的节流和防抖

标签（空格分隔）： 项目

---
## 概念
### 防抖
在事件被触发秒后在执行回调，如果在这n秒内又被触发，则重新计时
```JavaScritp
/模拟一段ajax请求
function ajax(content) {
  console.log('ajax request ' + content)
}

function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
    
let inputb = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 500)

inputb.addEventListener('keyup', function (e) {
        debounceAjax(e.target.value)
    })
```
___
### 节流
规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
```JavaScript
  function throttle(fun, delay) {
        let last, deferTimer
        return function (args) {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now
                fun.apply(that,_args)
            }
        }
    }

    let throttleAjax = throttle(ajax, 1000)

    let inputc = document.getElementById('throttle')
    inputc.addEventListener('keyup', function(e) {
        throttleAjax(e.target.value)
    })
```

## 总结
- 函数防抖和函数节流都是防止某一时间频繁触发，但是这两兄弟之间的原理却不一样
- 函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行

### 应用场景
- debounce
    - earch搜索联想，用户在不断输入值时，用防抖来节约请求资源
    - window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
- throttle
    - 鼠标不断点击触发，mousedown(单位时间内只触发一次)
    - 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

### 项目应用
- 赛飞奇小卡片滚动加载时，用了节流
- 赛飞奇小卡片页面拉伸加载时，用了防抖
        