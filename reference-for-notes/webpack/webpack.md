# 1，安装及运行
## 1-1 命令行中使用webpack
```
webpack hello.js hello.bundle.js
```

## 1-2 使用loader的一个做法
1. 使用loader名+ "!" + 被loader处理的文件名
```
require('css-loader!./style.css')
```
2. 在命令行中使用 `module-bind 'css=style-loader!css-loader'`
```
webpack hello.js hello.bundle.js -- module-bind 'css=style-loader!css-loader'
``` 
## 1-3 命令参数
1. watch，在线更新
```
webpack hello.js hello.bundle.js -- module-bind 'css=style-loader!css-loader' --watch
```
2. progress 打包过程
3. display-modules 显示打包的模块
4. display-reason 显示打包模块的原因
# 2，插件
1. html-webpack-plugin - 自动插入js
```
plugins: [
    new htmlWebpackPluggin({
        filename: 'index-[hash].html',      //新创建的文件名
        template: 'index.html',             //复制模板
        inject: 'head'                      //js嵌入的地方   “head”标签处
        title：'webpack is good',           //传入参数
        minify: {
            removeComments: true,           //删除注释
            collapseWhitespace: true   //删除空格
        }                                   //压缩html
    })    
]

1， title属性，在模板html处：
<title><%= htmlWebpackPlugin.options.title  %> //该title将会被plugins中的title取代
传其他参数也是可以的，类似这个做法。
2， 也可以利用这个在html中运行js语句
```
2. autoprefixer
```
postcss: [
    require('autoprefixer')({
        broswers: ['last 5 versions']    //最新五种浏览器 
    })
],
```

# 3 输出
```
output: {
    path: './dist',
    filename: ""
    publicPath:'http://cdn.com'    //生成的js带有线上地址
}
```
# 多页面html的生成
```
plugins: [
    new htmlWebpackPluggin({
        filename: 'a.html',      //新创建的文件名
        template: 'index.html',             //复制模板
        inject: 'head'                      //js嵌入的地方   “head”标签处
        title：'webpack is good',           //传入参数
        minify: {
            removeComments: true,           //删除注释
            collapseWhitespace: true   //删除空格
        },                              //压缩html
        excludeChunks: ['b','c'];      //除了b和C之外的js都引入
    }),
        new htmlWebpackPluggin({
        filename: 'b.html',      //新创建的文件名
        template: 'index.html',             //复制模板
        inject: 'head'                      //js嵌入的地方   “head”标签处
        title：'webpack is good',           //传入参数
        minify: {
            removeComments: true,           //删除注释
            collapseWhitespace: true   //删除空格
        }，                                   //压缩html
        chunks: ['b']                     //引入b
    }),
    
]
``` 
# loaders
```
moduole:{
    loaders: [
    {
        test: /\.js$/,
        loader: babel,
        exclude: './node_modules/',     //减少运行时间，因为有些文件已经处理过了，
        include: './src/'               //减少运行时间，设置打包范围
    }

    ]
}
```
1. postcss-loader 加css浏览器前缀
# path
- 生成绝对路径
```
var path = require("path")


exclude: path.resolve(_diranme,'node_modules')
``` 
- 对于引进的css若要进行处理需要传参数
```
{
    test:/\.css$/,
    loader: 'style-loader!css-loader?impolutLoaders = 1!postcss-loader'
}