---
title: 子组件向父组件通讯
date: 2020-07-25 16:00:00
tags: [Vue, 开发笔记]
---

### 子组件向父组件通讯

#### 父组件

```js
@event=XX
//  @event   ==  @update:event   ==   :event.sync
```

##### .sync的作用：实现props的双休绑定





#### 子组件

```js
this.$emit('uodate:event',{   })
```



