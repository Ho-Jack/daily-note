---
title: import
date: 2019-04-01 00:00:00 
tags: [JS, ES6, 开发笔记]
---

## 关于import


- ###  import * as  xx  from   'xx'

> 导出的内容组合成一个对象返回；

在xx.js下
```js
export const  x1={   }
export const  x2={   }
```

------



- ### import   xx    from '   xx'

> 导出这个默认 **xx** 的对象作为一个对象

在xx.js下
```js
const xx ={}
export default xx
```

------



- ### import 'xx'

> 运行模块中的全局代码

在xx.js下

> 可以没有任何export导出