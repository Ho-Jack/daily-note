---
title: Vue.set()和this.$set()向对象添加新的属性
date: 2020-03-31 18:33:35
tags: [Vue, 开发笔记]
---

## Vue.set()和this.$set()

问题：当生成vue实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去；

```vue
<template>
  <div>
    <p>{{student.name}}</p>
    <p>{{student.sex}}</p>
    <p>{{student.age}}</p>
  </div>
</template>
```

```js
data () {
  return {
    student: {
      name: '',
      sex: ''
//这里并没有提前将age属性添加上去（Student对象的结构只有2个属性，没有age 属性）
    }
  }
}
```

```js
mounted () { // ——钩子函数，实例挂载之后,在实例创建之后添加新的属性到实例上，它不会触发视图更新
  this.student.age = 24
}
```



> 受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在**初始化实例时将属性转为 getter/setter**，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。
>
> 因为在生命周期beforeCreate到create钩子之间会进行将data中的数据进去双向绑定的侦测；实例初始化完之后再向对象添加的**新的属性**，无办法完成侦测初始化。 



### this.$set(‘对象名’,要添加/修改的属性名,属性值)

> 使用**$set()**方法，既可以新增属性,又可以触发视图更新.
>
> - Vue.set(this.items, indexOfItem, newValue)   
> - 如果是数组    indexOfItem 就是 index

```js
mounted () {
  this.$set(this.student,"age", 24)
}
```

### Vue.set(‘对象名’,要添加/修改的属性名,属性值)

```js
var vm=new Vue({
    el:'#test',
    data:{
        //data中已经存在info根属性
        info:{
            name:'小明';
        }
    }
});
//给info添加一个性别属性
Vue.set(vm.info,'sex','男');

```

###  最笨方法

一开始就把对象的结构定义好，后面添加属性，就不添加新属性，只能算是修改属性