# [Vue CLI 3 配置兼容IE10](https://www.cnblogs.com/niejunchan/p/10764823.html)

最近做了一个基于Vue的项目，需要兼容IE浏览器，目前实现了打包后可以在IE10以上运行，但是还不支持在运行时兼容IE10及以上。

##### 安装依赖

```
yarn add --dev @babel/polyfill 
```

##### 在入口文件 `main.js` 引入依赖

```
import '@babel/polyfill';
```

##### 修改 `babel.config.js`

```
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
};
```

##### 修改 `.browserslistrc`

```
> 1%
last 2 versions
not ie <= 10
```

##### 修改 `vue.config.js`

默认情况下 `babel-loader` 会忽略所有 `node_modules` 中的文件。如果你想要通过 `Babel` 显式转译一个依赖，可以在这个选项中列出来。

```
module.exports = {
  transpileDependencies: []
}
```

详细说明可参见官方文档[https://cli.vuejs.org/zh/conf...](https://cli.vuejs.org/zh/config/#transpiledependencies)

我在这里遇到一个问题，有的依赖不仅需要添加它自身到 `transpileDependencies` 中，还需要添加它的某些依赖到 `transpileDependencies` 中，如果官方文档中没有明确指出的话可能还是不能正确的配置。

这种情况我的解决方法是在 `src` 目录下新建一个 `utils` 目录，将依赖的js文件移到该目录下，然后引入该目录下的js文件。