---
title: Vue有关`$nextTick`的理解
date: 2019-10-14 09:29:30
tags: [Vue]
---



#### vue有关`$nextTick`的理解

> ##### this.$nextTick( ()=>{} )

> `created` ：初始化了 `Inject` 、`Provide` 、 `props` 、`methods` 、`data` 、`computed` 和 `watch`，执行 `created` ；**未挂载dom**，可对data进行操作，操作dom需放到nextTick中

1、就是在vue生命周期created()创建初始，一定要把对dom的操作放在Vue.nextTick()中
因为vue在created阶段并没有任何对页面的渲染，这时候进行的操作没有任何作用，
所以需要Vue.nextTick()方法等待vue的dom渲染完成之后渲染

2、vue对页面数据变化的监控操作
类似于setTimeout延时应用，具体简单用法就如下面编码一样

```js
 this.$nextTick(() => {
               for(var i in this.editForm){
                 this.editForm[i] = row[i]
               }
               this.editForm.id = row.id
            })

```

