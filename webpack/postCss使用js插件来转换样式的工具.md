##  Postcss 是一个使用js插件来转换样式的工具，Postcss 的插件会检查你的css。

> 像是 Babel 和 Webpack 的区别，预处理（Babel）将特定语法转为当前的语法，PostCSS（Webpack）则可以通过插件在不修改 CSS 写法的前提下拆分、重写、转换，最后生成新的 CSS
>
> **因此，PostCSS 可以认为是一个平台，依靠丰富多样的插件来工作**

## PostCSS 插件

### 解决全局 CSS 的问题

- [`‎postcss-plugin-namespace‎`](https://github.com/ymrdf/postcss-plugin-namespace)‎ 向所有规则添加一个 css 选择器，以便 CSS 文件不会影响其他元素。‎(微应用添加命名空间防止css污染)

- [`postcss-namespace`](https://github.com/totora0155/postcss-namespace) 将命名空间作为选择器的前缀。
- [`postcss-use`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpostcss%2Fpostcss-use) 允许你在 CSS 里明确地设置 PostCSS 插件，并且只在当前文件执行它们。
- [`postcss-modules`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Foutpunk%2Fpostcss-modules) 和 [`react-css-modules`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgajus%2Freact-css-modules) 可以自动以组件为单位隔绝 CSS 选择器。
- [`postcss-autoreset`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmaximkoretskiy%2Fpostcss-autoreset) 是全局样式重置的又一个选择，它更适用于分离的组件。
- [`postcss-initial`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmaximkoretskiy%2Fpostcss-initial) 添加了 `all: initial` 的支持，重置了所有继承的样式。
- [`cq-prolyfill`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fausi%2Fcq-prolyfill) 添加了容器查询的支持，允许添加响应于父元素宽度的样式.

### 提前使用先进的 CSS 特性

- [`autoprefixer`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpostcss%2Fautoprefixer) 添加了 vendor 浏览器前缀，它使用 Can I Use 上面的数据。
- [`postcss-preset-env`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjonathantneal%2Fpostcss-preset-env) 允许你使用未来的 CSS 特性。

### 更佳的 CSS 可读性

- [`precss`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjonathantneal%2Fprecss) 囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等。
- [`postcss-sorting`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fhudochenkov%2Fpostcss-sorting) 给规则的内容以及@规则排序。
- [`postcss-utilities`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fismamz%2Fpostcss-utilities) 囊括了最常用的简写方式和书写帮助。
- [`short`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjonathantneal%2Fpostcss-short) 添加并拓展了大量的缩写属性。

### 图片和字体

- [`postcss-assets`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fassetsjs%2Fpostcss-assets) 可以插入图片尺寸和内联文件。
- [`postcss-sprites`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F2createStudio%2Fpostcss-sprites) 能生成雪碧图。
- [`font-magician`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjonathantneal%2Fpostcss-font-magician) 生成所有在 CSS 里需要的 `@font-face` 规则。
- [`postcss-inline-svg`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FTrySound%2Fpostcss-inline-svg) 允许你内联 SVG 并定制它的样式。
- [`postcss-write-svg`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjonathantneal%2Fpostcss-write-svg) 允许你在 CSS 里写简单的 SVG。

### 提示器（Linters）

- [`stylelint`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fstylelint%2Fstylelint) 是一个模块化的样式提示器。
- [`stylefmt`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmorishitter%2Fstylefmt) 是一个能根据 `stylelint` 规则自动优化 CSS 格式的工具。
- [`doiuse`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fanandthakker%2Fdoiuse) 提示 CSS 的浏览器支持性，使用的数据来自于 Can I Use。
- [`colorguard`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FSlexAxton%2Fcss-colorguard) 帮助你保持一个始终如一的调色板。

### 其它

- [`postcss-rtl`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvkalinichev%2Fpostcss-rtl) 在单个 CSS 文件里组合了两个方向（左到右，右到左）的样式。
- [`cssnano`](https://link.juejin.cn?target=http%3A%2F%2Fcssnano.co) 是一个模块化的 CSS 压缩器。
- [`lost`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpeterramsing%2Flost) 是一个功能强大的 `calc()` 栅格系统。
- [`rtlcss`](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FMohammadYounes%2Frtlcss) 镜像翻转 CSS 样式，适用于 right-to-left 的应用场景。





## 使用方法

你可以通过简单的两步便开始使用 PostCSS：

1. 在你的构建工具中查找并添加 PostCSS 拓展。
2. [选择插件](http://postcss.parts/)并将它们添加到你的 PostCSS 处理队列中。

### Webpack

在 `webpack.config.js` 里使用 [`postcss-loader`](https://github.com/postcss/postcss-loader) :

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}
```

然后创建 `postcss.config.js`:

```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

### 配置选项

绝大多数 PostCSS 运行器接受两个参数：

- 一个包含所需插件的数组
- 一个配置选项的对象

常见的选项：

- `syntax`: 一个提供了语法解释器和 stringifier 的对象。
- `parser`: 一个特殊的语法解释器（例如
-  [SCSS](https://github.com/postcss/postcss-scss)）。
- `stringifier`: 一个特殊的语法 output 生成器（例如 [Midas](https://github.com/ben-eb/midas)）。
- `map`: [source map 选项](https://postcss.org/api/#sourcemapoptions).
- `from`: input 文件名称（大多数运行器自动设置了这个）。
- `to`: output 文件名称（大多数运行器自动设置了这个）。



#### postCSS原理：

在构建项目的时候，通过webpack会把css文件的内容传送给postcss-loader， postcss-loader会解析`postcss.config.js`中的插件，传输给 Postcss，Postcss 会解析传入的css，将其转换为一个AST，然后通过各种不同的插件来对这个AST进行操作，最终序列化新的 css，最后将结果返回到 postcss-loader，进行 webpack 下一个 loader 的操作。



#### vue/cli:

Vue CLI 项目天生支持 [PostCSS](http://postcss.org/)、[CSS Modules](https://github.com/css-modules/css-modules) 和包含 [Sass](https://sass-lang.com/)、[Less](http://lesscss.org/)、[Stylus](http://stylus-lang.com/) 在内的预处理器。