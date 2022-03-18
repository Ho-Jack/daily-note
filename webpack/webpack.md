###  process.env.NODE_ENV 的作用

1. 这个变量并不是 process.env 直接就有的，而是通过设置得到的。
2. 这个变量的作用是：我们可以通过判断这个变量区分开发环境或生产环境。
   - development
   - production

#### output.publicPath

> 表示资源(assets)被引用的根路径，在生产环境下生效；可以是相对路径，也可以是绝对路径
>
> 加载资源的路径, 写`./`   代表的就是你打包之后，会在`./`这个相对路径下找要加在的资源



### webpack核心概念

- **`Entry`**（入口）：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
- **`Output`**（出口）：告诉 webpack 在哪里输出它所创建的结果文件，以及如何命名这些文件，默认值为./dist。
- **`Loader`**（模块转换器）：webpack通过不同的loader，**实现对不同格式的文件的处理，转换为 webpack 能够处理的有效模块,**例如把scss转为css

- **`Plugins`**（插件）：在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。**插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量**。插件接口功能极其强大,可以用来处理各种各样的任务。
- **`Module`**(模块)：开发者将程序分解成离散功能块，并称之为模块

### webpack执行流程

> `module` 就是没有被编译之前的代码，通过 `webpack` 的根据文件引用关系生成 `chunk` 文件，webpack 处理好 `chunk` 文件后，生成运行在浏览器中的代码 `bundle`

webpack启动后会在entry里配置的module开始递归解析entry所依赖的所有module，每找到一个module, 就会根据配置的loader去找相应的转换规则，对module进行转换后在解析当前module所依赖的module，这些模块会以entry为分组，**一个entry和所有相依赖的module也就是一个chunk**，最后webpack会把所有chunk转换成文件输出，在整个流程中webpack会在恰当的时机执行plugin的逻辑

```javascript
module.exports = {
  mode: 'development', // 模式
  entry: './src/index.js', // 打包入口地址
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  }
}
```

# Loaders

loaders是webpack最强大的功能之一，通过不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，例如把scss转为css，将ES66、ES7等语法转化为当前浏览器能识别的语法，将JSX转化为js等多项功能。Loaders需要单独安装并且需要在webpack.comfig.js中的modules配置项下进行配置，Loaders的配置包括以下几方面：

- test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
- loader：loader的名称（必须）
- include/exclude： 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
- options： 为loaders提供额外的设置选项（可选）

```javascript
// webpack.config.js
const path = require('path');
module.exports = { 
     module: {
        rules: [
          {
            test: /\.css$/,   // 正则匹配以.css结尾的文件
            use: ['style-loader', 'css-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
          }
        ]
      }
 }
```



```javascript
chainWebpack(config) {
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
}
```

