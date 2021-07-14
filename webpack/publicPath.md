# Webpack publicPath配置详解

#### output.publicPath

##### 概念：

表示资源(assets)被引用的根路径，在生产环境下生效；可以是相对路径，也可以是绝对路径；

```js
output: {
	publicPath: "/dist/";
}
```

该配置会为`index.html`中引入的`<script>` `<link>`等标签中的资源路径添加前缀

**注意** 这对你手动引入的静态资源不生效

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue-webpack5</title>
  <!-- 手动静态引入了一个script，不受publicPath的影响 -->
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6%2Ces7%2Ces2019%2Ces2018%2Ces2016%2Ces2017%2Ces2015%2Ces5%2Cdefault"></script>
</head>
<body>
  <div id="app"></div>
	<!-- 这里是webpack注入js的位置，在资源路径前增加/dist/前缀 -->
	<script defer="defer" src="/dist/app.3aad394f.js"></script>
</body>
</html>
```

##### 资源注入原理：

Webpack中一般会使用插件`html-webpack-plugin`把打包好的js、css等注入到html模板中，该插件也可以传入一个publicPath，使用方式如下:

```js
// webpack.config.js
plugins: [
    new HtmlWebpackPlugin({
        publicPath: '/dist2/',  // 会覆盖output.publicPath
        template: path.join(__dirname, "index.html"),  // 要注入的模板文件
        filename: "index.html"  // 最后生成的html文件名称
    })
]
```

一般情况下不会在`html-webpack-plugin`配置publicPath，它在生产环境下会默认读取`output.publicPath`作为资源根路径，**而这个插件的作用就是注入webpack打包出来的所有资源文件**，这也是手写的资源不会在其路径前添加前缀的原因。因为只有这些资源文件通过`html-webpack-plugin`注入到html模板中时才会生效。

##### 配置优先级

如果在`output`和`html-webpack-plugin`中都配置了`publicPath`，最终以`html-webpack-plugin`中为准

##### 相对路径和绝对路径

如果配置为`相对路径`，那么该资源的引入路径是相对于你的html文件

如果配置为`绝对路径`，不带域名则从当前服务器获取资源，如果使用cdn，可以配置全路径。

**无论是相对路径还是绝对路径，尾部都要携带斜杠`/`**

```js
publicPath: './',   // 相对于index.html获取资源
publicPath: '/assets/',   // 从当前服务器根路径获取资源
publicPath: 'https://cdn.example.com/assets/' // 从https://cdn.example.com/assets/ 获取资源
```

这三种情况下在html中注入的资源如下：

```html
<script src="./app.js"></script>
<script src="/assets/app.js"></script>
<script src="https://cdn.example.com/assets/app.js"></script>
```

##### 默认值

默认设置为’auto’，下面是摘自官方的解释，它会根据一些自定的规则来动态配置publicPath

> There are chances that you don’t know what the publicPath will be in advance, and webpack can handle it automatically for you by determining the public path from variables like [import.meta.url](https://webpack.js.org/api/module-variables/#importmetaurl) , [document.currentScript](https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript) , script.src or self.location. What you need is to set [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath) to ‘auto’ -- 摘自官方文档

##### `__webpack_public_path__`

官方提供了一个全局参数来动态设置资源路径，这在微前端中，主应用加载不同子应用的资源时很有用。

> In cases where the publicPath of output files can’t be known at compile time, it can be left blank and set dynamically at runtime in the entry file using the [free variable](https://stackoverflow.com/questions/12934929/what-are-free-variables)

只需要在你的项目入口设置即可，以微前端框架`qiankun`为例，可以实现在子应用中动态设置主应用传递的publicPath，达到动态设置资源路径的目的。

```js
// 子应用的入口main.js
if (window.__POWERED_BY_QIANKUN__) {
  // 设置publicPath
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
// ..其他代码
```

#### devServer.publicPath

##### 概念

使用`webpack-dev-server`启动一个快捷的本地开发服务器时会采用`config.devServer`参数，和生产环境不同，开发环境下webpack不会将执行文件打包到本地文件夹，而是存放到内存中，`devServer.publicPath`的含义和`output.publicPath`完全不同，它不会修改html中资源的路径，有点类似于`output.path`，用于配置前端文件的服务器访问路径。

- **必须以`/`开头，以`/`结尾**
- 如果配置了一个相对路径，会导致服务器无法访问到文件，出现空白页面

举个🌰：

```js
devServer: {
    publicPath: '/assets/'
}
```

启动`webpack-dev-server`后，需要这样访问你的本地服务器：`localhost:3334/assets/` ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/334ccdc0e81240f88ba06983f185a8ff~tplv-k3u1fbpfcp-watermark.image)

##### 搭配路由

以`vue-router`为例，当你配置了`devServer.publicPath`为`/assets/`时，对应的路由配置也需要改变，否则会出现路由跳转不正确的问题。

```js
const router = new VueRouter({
    base: "assets",
    // ...其他配置
})
```

##### 默认值

默认配置为`/`

#### output.path

##### 概念

Webpack打包文件后的输出目录

**必须配置为绝对路径**

> The output directory as an *absolute* path. -- 摘自官方文档

它和publicPath没有任何关系，它只关系到前端最终生成的js文件被存放到哪个目录

```js
// webpack.config.js
output: {
	path: path.join(__dirname, "dist")
}
```





[Webpack publicPath配置详解 (juejin.cn)](https://juejin.cn/post/6977628582419890206)