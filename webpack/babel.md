Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为**向后兼容**的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。 下面列出的是 Babel 能为你做的事情：

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 [@babel/polyfill](https://link.juejin.cn?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2Fbabel-polyfill) 模块)
- 源码转换 (codemods)



### 前言

为了支持业务中少量的es6+的高级特性，最近在研究了一下**babel的垫片**，现将此整理为文字，如下。



### babel 和 babel ployfill 的关系

1、先来理解下 babel 到底是做什么的？

> 简单来讲， babel解决 语法层面的问题。用于将ES6+的高级语法转为ES5。

2、babel polyfill 又是做什么的？

> 如果要解决 API层面的问题，需要使用垫片。比如常见的有 `babel-polyfill`、 `babel-runtime` 和 `babel-plugin-transform-runtime`。

理清了他们之间的关系，那么再正式来讲讲有关`polyfill`的二三事。

### polyfill 种类

babel polyfill 有三种

```go
* babel-polyfill
* babel-runtime
* babel-plugin-transform-runtime
```

### babel-polyfill

`babel-polyfill`通过向全局对象和内置对象的prototype上添加方法来实现的。所以这会造成全局空间污染。

#### `babel-polyfill`使用的两种方式

1、webpack.config.js 中：
配置`webpack.config.js`里的`entry`设置为`entry: ['babel-polyfill',path.join(__dirname, 'index.js')]`

2、业务 js 中：
在`webpack.config.js`配置的主入口`index.js`文件的最顶层键入

```go
import 'babel-polyfill'
```

两者打印出来的大小都是一样的，打包后大小是280KB，如果没有使用`babel-polyfill`，大小是3.43kb。两则相差大概81.6倍。原因是`webpack`把`babel-polyfill`整体全部都打包进去了。而`babel-polyfill`肯定也实现了所有`ES6新API`的垫片,文件一定不会小。

那么有没有一种办法,根据实际代码中用到的`ES6`新增API ,来使用对应的垫片,而不是全部加载进去呢?
是的，有的。那就是 `babel-runtime` & `babel-plugin-transform-runtime`，他们可以实现**按需加载**。

### babel-runtime

简单说 babel-runtime 更像是一种按需加载的实现，比如你哪里需要使用 Promise，只要在这个文件头部

```go
import Promise from 'babel-runtime/core-js/promise'
```

就行了。

不过如果你许多文件都要使用 Promise，难道每个文件都要 `import` 一下吗？当然不是，Babel 官方已考虑这种情况，只需要使用 `babel-plugin-transform-runtime` 就可以解决手动 `import` 的苦恼了。

### babel-plugin-transform-runtime

`babel-plugin-transform-runtime` 装了就不需要装 `babel-runtime`了，因为前者依赖后者。
总的来说，`babel-plugin-transform-runtime` 就是可以在我们使用新 API 时 自动 import babel-runtime 里面的 polyfill，具体插件做了以下三件事情：

- 当我们使用 async/await 时，自动引入 babel-runtime/regenerator
- 当我们使用 ES6 的静态事件或内置对象时，自动引入 babel-runtime/core-js
- 移除内联 babel helpers 并替换使用 babel-runtime/helpers 来替换

`babel-plugin-transform-runtime` 优点：

- 不会污染全局变量
- 多次使用只会打包一次
- 依赖统一按需引入,无重复引入,无多余引入
- 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积

#### 使用方式

在 .babelrc 中配置：

```go
plugins:\["tranform-runtime"\]
```

打包后大小为 17.4kb，比之前的280kb要小很多。

### Plugin 插件

#### 1、官方 Presets

如果不想自己设置一堆插件的话，官方有`env`，`react`，`flow`三个 Presets。即预安装了 plugins 的配置。

presets 属性告诉 Babel 要转换的源码使用了哪些新的语法特性， presets 是一组 Plugins 的集合。如：
babel-preset-es2015: 可以将es6的代码编译成es5 
babel-preset-es2016: 可以将es7的代码编译为es6 
babel-preset-es2017: 可以将es8的代码编译为es7 
babel-preset-latest: 支持现有所有ECMAScript版本的新特性

当我们需要转换es6语法时，可以在 .babelrc 的 plugins 中按需引入一下插件，比如：`check-es2015-constants`、`es2015-arrow-functions`、`es2015-block-scoped-functions`等等几十个不同作用的 plugin。`.babelrc` 中配置项可能是如下方式：

```go
{
  "plugins": \[
    "check-es2015-constants",
    "es2015-arrow-functions",
    "es2015-block-scoped-functions",
    // ...
  \]
}
```

但 Babel 团队为了方便，将同属 ES2015 的几十个 Transform Plugins 集合到 `babel-preset-es2015` 一个 Preset 中，这样我们只需要在 `.babelrc` 的 presets 加入 ES2015 一个配置就可以完成全部 ES2015 语法的支持了。`.babelrc` 中配置如下：

```go
{
  "presets": \[
    "es2015"
  \]
}
```

#### 2、Stage-X（试验性 Presets）

这个比较好理解，就是为了支持 TC39 对于草案阶段的 ES 最新特性而开发的 presets。

- Stage 0 - 草稿：只是一个设想可能是一个 Babel 插件
- Stage 1 - 提案：值得去推进的东西
- Stage 2 - 草案：初始化规范
- Stage 3 - 候选：完整规范和初始化浏览器实现
- Stage 4 - 完成：会加入到下一版中

#### 3、转换插件

官方和民间提供了很多的转换插件，用于指定对某一项 ES 高级特性进行转换。
官方见：https://babeljs.io/docs/en/pl...

#### 4、语法插件

这种插件可以让`Babel`来解析特殊类型的语法。

```go
{
  "parserOpts": {
    "plugins": \["jsx", "flow"\]
  }
}
```

#### 5、插件开发

见文档：https://github.com/jamiebuild...

开发采用了 AST 抽象语法树，类似于 Eslint 插件开发。

```go
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
      }
    }
  };
}
```

### webpack 中使用 babel 二三事

babel 用途是语法转换，所以webpack 中需要用到 `babel-loader`。而 `babel-core` 是 Babel 编译器的核心，因此也就意味着如果我们需要使用 `babel-loader` 进行 es6 转码的话，我们首先需要安装 `babel-core`。

### 总结

使用场景建议：

- 开发应用建议使用 babel-polyfill 会在全局新增对应方法
- 开发框架建议 babel-plugin-transform-runtime 局部变量 不会污染全局，局部使用es6的函数或方法

以上，如有写的不正确或者有疑问的地方请留言。未完待续，本文会持续更新babel相关知识。

- 作者：Allan91
- https://segmentfault.com/a/1190000021729561