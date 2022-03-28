---
title: Vue中组件通讯props传递Object数据类型的注意事项
date: 2020-04-30 14:26:30
tags: [Vue]
---

## Vue中组件通讯props传递Object数据类型的注意事项

>Vue 组件通讯,其中**父组件向子组件**传递数据，用Props
>较为特殊的是对象Object的传

### props接收对象格式：

```javascript
props: {
  myObject: {
    type: Object,
    default: () => ({

     }),
  },
},
```



### watch监听器无法监听Object的增删

> ES5已经舍弃了`Object.observe`方法，`Vue`无法监听对象属性删除和新增，故即使使用`deep`方法监听对象`prop`也没有用。

