## Vue3.0 Composition API 详解

#### 1. 3.0 & 2.0 区别

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

#### 2. 生命周期 & 常用api对比

###### 2.1.生命周期

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

###### 2.2. Option API vs Composition API

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |



#### 3.`setup()`

setup应该是vue3.x最为关键的内容的,因为大部分的业务逻辑就是写在setup内的

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

目前官方推荐是setup语法糖的形式写

> 上面代码改为setup语法糖的形式

```javascript
<template>
  <div> {{ count }} </div>
</template>

<script setup>
import { ref } from 'vue'
//setup语法糖会自动将响应式变量return
cosnt count  = ref(1)

//    export default {
//      setup(props, { attrs, emit, slots }) {
//        const count = ref(1)
//        // 需要将定义的变量在setup函数中return出来，提供外部template模板使用
//        return { count }
//      }
//    }
</script>
```



#### 4. `ref`

>`ref` 函数将我们定义的变量包装成了一个响应式的数据对象。
>`ref` 对象拥有一个指向内部值的单一属性` .value`，每次访问时我们都需要加上 `.value`，但在模板中使用时，它会自动解套，无需在模板内额外书写` .value`



##### 4.1. 关于ref声明变量需要`.value`的情况

1.  如果自己的代码取值，需要,l例如函数内部，取值和赋值都需要
2. Vue 提供的 api 上，不需要（vue 自动帮你做了拆包）
3. `<template></template>`中取值不需要

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

##### 4.2. $ref() 响应式语法糖

> 解决频繁 .value 的情况



#### 5. reactive()    美: [riˈæktɪv] 反应

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

##### reactive失去响应的情况：

###### 1. 给响应式对象的字面量赋一整个普通对象/reactive对象

> 通常在页面数据回显时,获取对象值直接赋值给响应式对象

```react
<template>
  {{state}}
</template>    

<stcirpt setup>
const state = reactive({ count: 0 })


const demo = ()=>{
   //虽然打印的state是响应的,对初始引用的响应性连接丢失
   //  {{state }} 显示的值并未改变
   state=reactive{count:1}
   // {{state }} 显示的值并未改变
   state={count:1}     
}
</stcirpt>
```



解决方法:

1. 不要直接整个对象替换,对象属性一个个赋值

   ```javascript
   const state = reactive({ count: 0 })
   //state={count:1}
   state.conut = 1
   ```

2. 使用ref定义对象

   > 个人推荐,非必要不用reactive

   ```javascript
   const state = ref({ count: 0 })
   state.value={count:1}
   ```



###### 2.将响应式对象的属性-赋值给变量(断开连接)

```javascript
const state = reactive({ count: 0 })
//赋值
// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++
```

###### 3.解构至本地变量时

```javascript
const state = reactive({ count: 0 })
//解构
// count 也和 state.count 失去了响应性连接
let { count } = state
// 不会影响原始的 state
count++
```

###### 4.传入一个函数时

```jsx
const state = reactive({ count: 0 })

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
callSomeFunction(state.count)
```



#### 6. 区别 ref、reactive

建议：

- ref :`基本类型值`(String 、Nmuber 、Boolean 等)或单值对象（类似像` {count: 3}` 这样只有一个属性值的对象）

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

#### 7. toRef、toRefs  

> 解决reactive参数展开后丢失响应式 



#### ` isref()` 、  `unref()` 、`toRef()` 、 `toRefs()`



- ### ` isref()`  
>函数用来判断一个数据是否是响应式的

```js
const age = ref(18)
const isAgeRef = isRef(age);
console.log(isAgeRef); //true
```

-  ### unref()

 >传人ref类型的参数,返回ref响应数据去掉`.value`的值
 >
 >传入普通参数, 原样返回
 >
 >这是一个语法糖: `val = isRef(val) ? val.value : val`

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



#### 8. 字符`$ `解决响应式ref,频繁`.value` (废弃)

> `$()`响应性语法糖目前默认是关闭状态，需要你显式选择启用

##### 1. 常见ref响应式方法

- [`ref`](https://cn.vuejs.org/api/reactivity-core.html#ref) -> `$ref`
- [`computed`](https://cn.vuejs.org/api/reactivity-core.html#computed) -> `$computed`
- [`shallowRef`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) -> `$shallowRef`
- [`customRef`](https://cn.vuejs.org/api/reactivity-advanced.html#customref) -> `$customRef`
- [`toRef`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) -> `$toRef`

##### 2.  `$()`  解构自定义Hooks返回的ref

```javascript
import { useXX } from '/hook/useXX'

const { x, y } = $(useXX())
//通过$()解构了ref,不需要.value就能直接使用
console.log(x, y)
```



