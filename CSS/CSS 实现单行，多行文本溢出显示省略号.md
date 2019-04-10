# CSS 实现单行，多行文本溢出显示省略号

标签（空格分隔）： CSS

---

单行:

```
overflow: hidden;
text-overflow: ellipsis;
white
```

多行：(适用于WebKit浏览器及移动端)

```
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;          // 多少行
overflow: hidden;
```


