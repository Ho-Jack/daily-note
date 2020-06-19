

```js
module.exports={
    //入口文件的配置项
    entry:{},
    //出口文件的配置项
    output:{},
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```



简单描述了一下这几个属性是干什么的。
描述一下npm run dev / npm run build执行的是哪些文件



通过配置proxyTable来达到开发环境跨域的问题，然后又可以扩展和他聊聊跨域的产生，如何跨域
最后可以在聊聊webpack的优化，例如babel-loader的优化，gzip压缩等等