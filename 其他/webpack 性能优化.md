# webpack 性能优化

标签（空格分隔）： js

## 减少 Webpack 打包时间

### 1. 优化Loader
优化Loader 的文件搜索范围：对于Babel来说，我们肯定是希望只作用在JS代码上，然后 `node_modules`中使用的代码都是编译过的，所以我们也完全没有必要再去处理一遍
```
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: 'babel-loader',
        // 只在 src 文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/
      }
    ]
  }
}
```
当然这样做还不够，我们还可以将Babel编译过的文件缓存起来，下次需要更改过的代码文件即可，这样可以大幅度加快打包时间
```
loader: 'babel-loader?cacheDirectory=true'
```

### 2. HappyPack
受限于 Node 是单线程运行的，所以Webpack在打包过程中也是单线程的，特别是在执行Loader的时候，长时间编译的任务很多，这样就会导致等待的情况。

HappyPack 可以将Loader的同步执行转换为并行的，这样就能充分利用资源来加快打包效率了

```
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // id 后面的内容对应下面
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  })
]
```

## 减少 Webpack 打包后的文件体积

### 1. 按需加载
为了首页能更快的呈现给用户，我们肯定是希望首页能加载的文件体积越小越好，这时候我们就可以使用按需加载，将多个路由页面单独打包为一个文件。
vue-router:
1. import
```
() =>import(/*webpackChunkName:"view-[request]" */ `@/views/${view}.vue`)
```
webpack配置： output 需要加个 chunkFilename
```
chunkFilename: `[name].js`
```
2. webpack特有的require.ensure()
```
const Baz = r => require.ensure([], ()=>(require('./Baz.vue')), '/baz')
```

### 2. Scope Hoisting
Scope Hoisting 会分析处模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。

比如我们希望打包这两个文件

```
// test.js
export const a = 1
// index.js
import { a } from './test.js'
```
对于这种情况，我们打包出来的代码会类似这样
```
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
  /* 1 */
  function (module, exports, require) {
    //...
  }
]
```
但如果我们使用 Scope Hoisting 的话，代码就会尽可能的合并到一个函数中去，也就变成了这样的类似代码

```
[
  /* 0 */
  function (module, exports, require) {
    //...
  }
]
```
代码减少了很多很多

____
#### webpack3中开启这个功能：
```
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
  plugins: [
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin(),
  ],
};
```
考虑到 Scope Hoisting 依赖源需采用ES6模块化语法，还需要配置 `mainFields`.
```
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
};
```
#### webpack4中开启这个功能：
```
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```
### 3. Tree Shaking
Tree Shaking 可以实现删除项目中未被引用的代码：
```
// test.js
export const a = 1
export const b = 2
// index.js
import { a } from './test.js'
```
对于以上情况，`test` 文件中的变量`b`如果没有在项目中使用到的话，就不会被打包到文件中。
如果你使用webpack4的话，开始生产环境就会自动启动这个优化功能。

