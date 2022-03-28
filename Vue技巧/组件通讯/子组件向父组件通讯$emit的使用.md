---
title: 子组件向父组件通讯
date: 2020-07-25 16:00:00
tags: [Vue, 开发笔记]
---

### 子组件向父组件通讯

#### 父组件

```js
@event=XX
@update:event=XX
//  @event   ==  @update:event 
```

```javascript
methods:{
  XX(val){
    // val的值就是this.$emit('update:event',{   })  第二个参数传过来的
  }
}
```

 

#### 子组件

```js
this.$emit('update:event',{   })
```



注意：不能使用驼峰作为函数的名字

HTML是大小写不敏感的，HTML中的属性@addList会被解析为@addlist，js再用@addList去找，是找不到的。



### .sync的作用：实现props的双向绑定

> Vue是单向数据流
> porps 父组件向子组件通讯
> emit 子组件向父组件通讯
> 结合不就是双向绑定，sync因此而生，就是这种方式的语法糖

父组件

```vue
<child  :myprops.sync='myprops' />
//被编译成
<child  :myprops='myprops'  @update:myprops="val => myprops = val" />
```

子组件：

```vue
props:['myprops']
this.$emit('update:myprops',{   })
```

