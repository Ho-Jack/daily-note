---
title: Vue项目中static和assets的区别
date: 2020-06-30 17:00:00
tags: [Vue, 开发笔记]
---



## Vue项目中static和assets的区别

## 静态资源处理
> vue-cli有两个放置静态资源的地方，分别是`src/assets文件夹`和`static文件夹`

### 区别： 

- **assets目录**中的文件会被webpack处理解析为模块依赖，只支持**相对路径**形式。

例如:

 `<img src="./logo.png">`和 `background: url(./logo.png)`中，"./logo.png" 是相对的资源路径，将由Webpack解析为模块依赖。

- **static/ 目录**下的文件并不会被Webpack处理：直接被复制到最终的打包目录（默认是dist/static）下。必须使用**绝对路径**引用这些文件，

​    任何放在 static/ 中文件需要以绝对路径的形式引用：/static/[filename]。

这是通过在 config.js 文件中的 build.assetsPublicPath 和 build.assetsSubDirectory 连接来确定的。

```js
// config/index.js
module.exports = {
  // ...
  build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}
```

将static/目录下的文件 复制到dist下static文件夹下面

```js
   new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
          //忽略类似 .git .ignore之类的文件
        ignore: ['.*']
      }
    ])
  ],
```

   





### 如何引用图片

- JS部分

```js
  data () {
        return {
            imgUrl: '图片地址',//错误写法 
            imgUrl: require('图片地址')//正确的写法
        }
}
```


- template部分
```html
img标签形式：
<img :src="img" />
或者div背景图形式：
<div :style="{backgroundImage: 'url(' + img + ')'}"></div>
```





### 总结：

### **static放不会变动的文件 **

### **assets放可能会变动的文件。**

- static/ 中的文件是不被Webpack处理的，以相同的文件名直接被复制进最终目标。使用绝对路径去引用它们

- src/assets 中放置的文件希望被Webpack处理的，它们可能被重新命名复制进最终目标。使用相对路径引用它们

