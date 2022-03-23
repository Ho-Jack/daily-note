## Vue3.0 Compsition API 详解

- ### 3.0 & 2.0 区别

1. 数据驱动能力更强，重构响应式系，基于 `proxy `的数据驱动能够弥补原来 `definePorperty `的不足,

   使用Proxy的优势：
   
   ```
   1.Proxy在使用上比Object.defineProperty方便的多
   2.可直接监听数组类型的数据变化
   3.Proxy代理整个对象，Object.defineProperty只代理对象上的某个属性
   4.可拦截apply、ownKeys、has等方法，而Object.defineProperty不行
   5.直接实现对象属性的新增/删除
   ```
   
2. 新增Composition API，更好的逻辑复用和代码组织

3. 重构 Virtual DOM

   ```
   1. 模板编译时的优化，将一些静态节点编译成常量
   2. slot优化，将slot编译为lazy函数，将slot的渲染的决定权交给子组件
   3. 模板中内联事件的提取并重用（原本每次渲染都重新生成内联函数）
   ```

4. 代码结构调整，更有利于Tree shaking，使得体积更小

5. 使用Typescript替换Flow,全面拥抱 typescript，2.x 版本无论用 class component 还是 配置 都不能很好的支持 ts.

- ### 3.0 新特性

#### 生命周期 & 常用api对比

| Vue2.x        | Vue3.x                 |
| ------------- | ---------------------- |
| beforeCreate  | setup()                |
| created       | setup()                |
| beforeMount   | onBeforeMount()        |
| mounted       | onMounted()            |
| beforeUpdate  | onBeforeUpdate()       |
| updated       | onUpdated()            |
| beforeDestroy | onBeforeUnmount()      |
| destroyed     | onUnmounted()          |
| data          | ref()、reactive()      |
| watch         | watch()、watchEffect() |
| computed      | computed()             |
| this.$store   | useStore()             |
| this.$router  | useRouter()            |
| this.$route   | useRoute()             |



#### `setup()`

> setup 函数是 Compsition API 的入口函数，替代了我们之前的生命周期函数beforeCreate、created。
> setup接受2个参数
>
> 1. props: 用来接收父组件传入的值
> 2. { attrs, emit, slots } = context
> 3. **注意 ： `setup` 中不能使用 `this`**, `this` 指向 `undefined`

```vue
<template>
  <div> {{ count }} </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, { attrs, emit, slots }) {
    const count = ref(1)
    // 需要将定义的变量在setup函数中return出来，提供外部template模板使用
    return { count }
  }
}
</script>

```



#### `ref`

>`ref` 函数将我们定义的变量包装成了一个响应式的数据对象。
>`ref` 对象拥有一个指向内部值的单一属性` .value`，每次访问时我们都需要加上 `.value`，但在模板中使用时，它会自动解套，无需在模板内额外书写` .value`

```vue
<template>
  <div> {{ count }} </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, { attrs, emit, slots }) {
    const count = ref(1)

    console.log(count) // 单一value属性的对象
    console.log(count.value) // 1

    // 需要将定义的变量在setup函数中return出来，提供外部template模板使用
    return { count }
  }
}
</script>

```



#### reactive()    美: [riˈæktɪv] 反应

>reactive 函数是用来创建一个响应式的数据对象，类似我们之前Vue2.x的data。
>
>响应型对象(reactive object) 一旦被销毁或展开(...state),其响应式特性(reactivity)就会丢失

```vue
<template>
  <div> {{ name }} </div>
  <div> {{ age }} </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup(props, { attrs, emit, slots }) {
    const state = reactive({
      name: 'AA',
      age: 18
    })
    console.log(state)
    // 需要将定义的变量在setup函数中return出来，提供外部template模板使用
    return {
      ...state//结构reactive将失去响应
    }
  }
}
</script>

```



#### 区别 ref、reactive

建议：

- ref :`基本类型值`(String 、Nmuber 、Boolean 等)或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）

- reactive:`引用类型值`（Object 、Array）

```vue
<template>
  <div>
    <div> {{ name }} </div>
    <div> {{ age }} </div>
    <button @click="handleClick">按钮 </button>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  setup(props, { attrs, emit, slots }) {
    const state = reactive({
      name: 'AA'
    })
    const age = ref(18)
    const handleClick = () => {
      state.name = 'BB'
      age.value = 20
      console.log(state.name)  //BB  但没触发视图更新
      console.log(age)        //20   触发视图更新
    }
    console.log(state)
    // 需要将定义的变量在setup函数中return出来，提供外部template模板使用
    return {
      ...state,
      age,
      handleClick
    }
  }
}
</script>

```

问题：点击按钮后，name的值变成了BB，但是视图并没有更新，还是AA，但是ref的age却更新了。
当然，这并不是bug，原因在于一个响应型对象(reactive object) 一旦被销毁或展开(...state),其响应式特性(reactivity)就会丢失。

#### 解决reactive展开后丢失响应式特效呢，下面会介绍 toRef、toRefs

#### ` isref()` 、  `unref()` 、`toRef()` 、 `toRefs()`



- ### ` isref()`  
>函数用来判断一个数据是否是响应式的

```js
const age = ref(18)
const isAgeRef = isRef(age);
console.log(isAgeRef); //true
```

-  ### unref()

 >接收一个ref参数，如果这个值是 ref 就返回 .value，否则原样返回

```js
const age = ref(1);
const newAge = unref(age)
console.log(newAge) // 1
```

- ### toRef()

> 将一个数据变成响应式数据

```js
let age = 20;
let newAge = toRef(age)
console.log(age) // 20 
console.log(newAge) // ObjectRefImpl {_object: 20, _key: undefined, __v_isRef: true}
```

- ### toRefs()

> 将传入的对象里所有的属性的值都转化为响应式数据对象，**解决上面reactive展开后丢失响应式问题**
>
> 基本是在setup函数返回值里面使用的

```js
 setup(props, { attrs, emit, slots }) {
    const state = reactive({
      name: 'AA'
    })
   
    console.log(state)
    // 需要将定义的变量在setup函数中return出来，提供外部template模板使用
    return {
     // ...state,
     ...toRefs(state)
    }
  }
```

