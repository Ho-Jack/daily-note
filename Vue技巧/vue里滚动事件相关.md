---
title: Vue 里监听滚动事件
date: 2019-11-22 09:14:26
tags: [Vue]
---



## Vue 里监听滚动事件

- #### 元素上：

```
 @scroll.native=""   
```

- #### 方法：

```js
mounted(){
    // 监听resize事件，
    window.onresize = () => {}
    window.addEventListener("resize", ()=>{}, true);
   // 监听滚动条scroll事件
    window.onscroll = () => {}
    window.addEventListener("scroll", ()=>{}, true);
}

```

  

可能出现问题：父元素添加overflow:auto后就会无法监听scroll事件

解决方案：    window.addEventListener("scroll", ()=>{}, true);  第三个参数传 true

> 第三个参数的作用：在事件机制中，在捕获阶段就触发事件（默认为false）