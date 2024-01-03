`axios`或者其他 `promise` , 或者`setInterval` 这些默认都是指向最外层的全局钩子

解决方案:

- 暂存法: 函数内先缓存 `this` , let that = this;(let是 es6, es5用 var)
- 箭头函数: 会强行关联当前运行区域为 this 的上下文;