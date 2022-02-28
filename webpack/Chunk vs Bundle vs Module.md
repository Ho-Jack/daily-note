## Chunk vs Bundle vs Module

>chunk  **块**  组块；区块；数据块 美: [tʃʌŋk]
>
> bundle  **包** 捆；束；包袱  美: [ˈbʌnd(ə)l]

- “模块”`(module)`的概念大家都比较熟悉，如 `CommonJS 模块`、`AMD`、`ES6 Modules` 模块
- `chunk` 表示打包的时候产生得模块，由他来组成 `bundle`

总结：`module` 就是没有被编译之前的代码，通过 `webpack` 的根据文件引用关系生成 `chunk` 文件，webpack 处理好 `chunk` 文件后，生成运行在浏览器中的代码 `bundle`

