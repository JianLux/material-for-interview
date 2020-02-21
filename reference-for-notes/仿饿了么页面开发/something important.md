## 1-路由的写法
```
Vue.use(VueRouter);

const routes = [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
]

const route = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
    router
}).$mount('#app');
```
## 2-路由的定向
route.push(path);

## 3-在移动端查看（适合做移动端自适应的时候）
1. 查看本机ip,在控制台输入ipconfig(windows系统)，pv4即为所查
2. 生成网址
```
locallhost:8080 => 10.21.23.133:8080
```
3. 在草料网用该网址生成一个二维码
4. 微信扫一扫
_____
## 3-组件之间的数据传输可以在组件标签那里传递
```
<shopcart :delivery-price="seller.deliveryPrice":min-price="seller.minPrice"></shopcart>
```
- 在子组件接收的时候必须写props,且组件的类型必须定义
```
  export default {
    props: {
      deliveryPrice: {
        type: Number,                   //必须定义，否则报错
        default: 0                      //若没传参数，则默认值为0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    }，
      selectFoods: {
        type: Array,
        default() {                    //如果参数类型是数组或者对象，则默认的数值必须是一个函数
          return [];
        }
      },
  };
  ```
## 4-es6字符
  ```
   return `￥${this.minPrice}元起送`;         //``号内大括号里面的js代码会计算
  ```
## 5-利用vue监控新添加的属性
  - 为某一对象添加新属性的时候，想要vue监控得到它，必须把vue  import进来，再利用其set方法
  ```
  import Vue from 'vue'
  
  Vue.set(this.food,'count',1)     //为food添加一个新属性，并赋值为1
  ```
## 6-从子组件向父组件传递参数
  1. 子组件中需要以某种方式例如点击事件的方法来触发一个自定义事件
  2. 将需要传的值作为$emit的第二个参数，该值将作为实参传给响应自定义事件的方法
  3. 在父组件中注册子组件并在子组件标签上绑定对自定义事件的监听
  
![image](http://upload-images.jianshu.io/upload_images/1916203-304afe563ba9faad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](http://upload-images.jianshu.io/upload_images/1916203-78b8700947f3b97d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 7-组件
- 一个子组件不能有两个div,只能有一个大的div包含它们
```
<template>
    <component1></component1>
    <component2></component2>
</template>                            //报错
```
- 正确写法
```

<template>
    <div>
        <component1></component1>
        <component2></component2>
    </div>
</template>  
```