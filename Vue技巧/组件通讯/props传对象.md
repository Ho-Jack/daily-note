---
title: Vue中组件通讯props传递Object数据类型的注意事项
date: 2020-04-30 14:26:30
tags: [Vue]
---

## Vue中组件通讯props传递Object数据类型的注意事项

>Vue 组件通讯,其中父组件向子组件传递数据，用Props
>较为特殊的是对象Object的传递
>
>```js
>props：{
>    type:Object,
>    myObject:()=>{}
>}
>```
>

```js
myObject：{
}
//父组件中创建对象必须完整结构(接口获取的数据也需要，先在data中定义好Object的结构)
data：{
    return{
       myObject：{
         AA:'',
         BB:''
     }
    }
}
//子组件中接收对象
props: {
  myObject: {
    type: Object,
    default: () => ({
     AA:'',
     BB:''
    }),
  },
},
watch: {
  'myObject.AA'(n) {
    console.log(n);
  },
```

watch 需要监听object内部属性 才能监听到，直接 监听整个 object 是无效的