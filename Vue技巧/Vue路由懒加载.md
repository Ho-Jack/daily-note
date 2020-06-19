---
title: Vue路由懒加载
date: 2020-05-26 14:13:35
tags: [Vue, 开发笔记]
---

##  Vue路由懒加载

> **SPA**（single page application） 单页面应用，是前后端分离时提出的一种解决方案。
> 优点：页面之间切换快；减少了服务器压力；
> 缺点：首屏打开速度慢，不利于 SEO 搜索引擎优。

###  路由懒加载，解决首页加载过慢

> 在SPA应用开发过程中，只有一个inde.html的关系，我们第一次进入页面就会加载一个Vue的模块app.js，而这个app.js里面挂载了每个路由页面的组件/模块，如果这个app.js非常大，那么需要占用较多带宽（下载慢的话，体检就十分差）
>
> 路由懒加载，就是路由对应组件只有加载到该页面才会加载相应的js文件

### 路由懒加载的实现方式：

####  1.  Vue异步组件 + webpack 的 code-splitting 功能（代码分割功能）

```js
{
  path: '/Demo',
  name: 'Demo',
  //打包后，每个组件单独生成一个chunk文件
  component: reslove => require(['../views/Demo'], resolve)
}
```



####  2. Vue异步组件 + 动态import语法：

> 在 Webpack 2 中，我们可以使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点 (split point):
> ```js
> import('组件路径')   // 返回一个 Promise 对象。
> ```

```js
const router = new VueRouter({
  routes: [
    { path: '/foo', 
      component: () => import('./Foo.vue')
      //默认将每个组件，单独打包成一个js文件
    }
  ]
})
```

##### 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 [命名 chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
//指定了相同的webpackChunkName,会合并打包成一个文件。
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。



#### 3. equire.ensure()

使用webpacke的[require.ensure](https://webpack.docschina.org/api/module-methods#require-ensure)也可以实现按需加载。

- require.ensure()是webpack特有的，现在已经被import()取代。
- 这个特性依赖于内置的promise，低版本浏览器使用require.ensure需要考虑是否支持es6

```js
//这种情况下，多个路由指定相同的chunkName，会打包成一个文件
const Demo = r => require.ensure([], () => r(require('../views/Demo')), 'Demo')
const Demo1 = r => require.ensure([], () => r(require('../views/Demo1')), 'Demo')

```

