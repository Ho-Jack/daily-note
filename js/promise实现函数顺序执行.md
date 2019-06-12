---
title: promise实现函数顺序执行
date: 2019-05-15 18:00:00
tags: [JS, ES6, 开发笔记]
---

### 函数顺序执行

```js
function2(){
    // 你的逻辑代码 
    return Promise.resolve(/* 这里是需要返回的数据*/)
}

function3(){
    // 你的逻辑代码 
    return Promise.resolve(/* 这里是需要返回的数据*/)
}

// 调用
function1(){
    this.function2().then(val => { 
        this.function3();
    });
}
```

