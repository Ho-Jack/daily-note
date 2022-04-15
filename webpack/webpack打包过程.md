*`webpack`的打包过程大概流程是这样的：*

> - 合并`webpack.config.js`和命令行传递的参数，形成最终的配置
> - 解析配置，得到`entry`入口
> - 读取入口文件内容，通过`@babel/parse`将入口内容（code）转换成`ast`
> - 通过`@babel/traverse`遍历`ast`得到模块的各个依赖
> - 通过`@babel/core`（实际的转换工作是由`@babel/preset-env`来完成的）将`ast`转换成`es5 code`
> - 通过循环伪递归的方式拿到所有模块的所有依赖并都转换成`es5`