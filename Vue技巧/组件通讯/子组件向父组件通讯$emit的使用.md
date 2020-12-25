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
:event.sync=XX
//  @event   ==  @update:event   ==   :event.sync
```

##### .sync的作用：实现props的双向绑定

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



