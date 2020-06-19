---
title: computed和watch的区别
date: 2020-05-26 09:04:27
tags: [Vue, 开发笔记]
---

## methods、computed和watch的区别

###  methods

> 在vue中method就是普通意义的function域,可以定义方法来进行属性的修改,或者返回

```js
methdos:{
   XX :function(){
   
   }
}
```

ES6简写：  (  去掉 **:function **   )

```js
methdos:{
   XX (){
   
   }
}
```

### computed

> 计算属性,类似过滤器,对绑定到view的数据进行处理
>
> 开销小，性能高
>
> - 计算属性计算时所依赖的属性一定是响应式（会变化）依赖，否则计算属性不会执行
> - 计算属性是基于依赖进行缓存的，就是说在依赖没有更新的情况，调用计算属性并不会重新计算，可以减少开销

#### 用途：

- 简化计算，template里的{{  }}
-  props的处理
- $emit 的传值
- 不能计算 data里的数据

复杂的渲染数据计算，用computed计算属性可以减少一定计算开销，增加可维护性

从Vuex Store中收集相关信息，对Vuex中的数据做计算的时候的要特别注意computed的缓存属性，在对Vuex中的对象值进行属性修改的时候，并不会触发computed的中值的变化，这时需要Object.assign({},obj)对依赖对象进行跟新返回一个新对象触发依赖跟新

> ```js
> Object.assign() //方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
> const target = { a: 1, b: 2 };
> const source = { b: 4, c: 5 };
> const returnedTarget = Object.assign(target, source);
> ```

#### computed实例：

```js
  <div>{{ getDate }}</div>
   computed: {
    getDate () {
      return Date.now()
         }
    }
```

当我们调用getDate的时候返回的Date.now()返回的是一个非响应式的依赖因此getDate返回的值不会变。		
(如果数据是非响应式依赖，初始化后不再变化)

可以用来计算一些需要在{{  }} 中显示的复杂数据

```js
computed:{
  XX :{
    get:function(){},   //回调函数 当需要读取当前属性值时执行，根据相关数据计算并返回当前属性的值
    set:function(){}    //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
  }
}
```

> - get  读  并 返回
> - set   监视值变化的时候调用（不能返回，可以用来修改别的属性）

###  watch

> 侦听属性是专门用来观察和响应vue实例上的数据变动

#### 用途：

- data李的值

- props （要避免直接修改父组件传入的值）

- $emit

#### watch实例

```js
watch:{
    XX : function (newVal,oldVal){   }
//  XX  (newVal,oldVal){   }
}
```

```js
watch:{
  obj:{
    handler:function(){},
    deep:true,   //监听对象内部的变化
    immediate:true  //每次自动执行，立即以表达式的值 回调
  }
}
```

注意：

- deep  深 度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化（oldVal和newVal值一样）
-  深度监听对应的函数名必须为handler,否则无效果,因为watcher里面对应的是对handler的调用

### 总结：

#### watch
1. 监听（观察的动作），其**专门用来观察和响应Vue实例上的数据的变动**。
2. 应用：监听props，$emit或本组件的值执行**异步操作**
3. 无缓存性，页面重新渲染时值不变化也会执行 
4. 如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化

#### computed
1. 计算属性（计算值）
2. 应用：就是简化tempalte里面{{}}计算和处理props或$emit的传值
3. 具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数
4.  如果一个**数据依赖**于其他数据，那么把这个数据设计为computed的  



能使用`watch`属性的场景基本上都可以使用`computed`属性，而且`computed`属性开销小，性能高，**因此能使用computed就尽量使用computed属性**

**执行异步或昂贵的操作以响应不断变化的数据**时，使用watch



### 问题 :关于 computed计算属性 的依赖的理解

>computed看上去是方法，但是实际上是计算属性，它会根据你所依赖的数据动态显示新的计算结果。计算结果会被缓存，computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算

```js
<template>
  <div class="hello">
      {{fullName}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: 'AA',
            lastName: "BB"
        }
    },
    props: {
      msg: String
    },
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        }
    }
}
</script>
```

所谓依赖的属性就是 computed计算属性时用到的其他相关属性，如：  `this.firstName`和 `this.lastName`,只要其中一个值发生改变，被计算的属性fullName也相应发生改变



