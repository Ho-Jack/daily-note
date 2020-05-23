---
title: 将Vue中的方法或对象挂载到 window 对象
date: 2019-10-24 15:51:58
tags: [Vue, 开发笔记]
---

## 将Vue中的方法或对象挂载到window 对象

- ### Vue方法挂载到window对象

```js

mounted() {
    // 将backToday方法绑定到window下面，提供给外部调用
     window['backToday'] = () => {
        this.goToday()
     }
 },
 methods: {
    goToday() {
        // to do something
    }
 }
```

- ### Vue的对象挂载到window对象

```js
mounted（）{

 window.$notify =this.$notify  //向window对象挂载element的notify
 //这样就能在JS文件中使用element组件
}

```

