# 说人话系列之Vue3中的Computed 与 watch

## `computed`

- computed只接收一个`getter函数`

  > getter触发形式：1、computed返回值首次被读取时 2、getter绑定的响应式变量被修改时
  >
  > 1、getter必须有返回值
  >
  > 2、computed返回一个**只读**响应式ref对象   （只读、响应式、对象）
  >
  > 注意：omputed只接收一个getter函数时，返回的只读对象，也就是不能修改他的值！

  ```html
  <script setup>
  import { ref,computed } from 'vue'
  const num = ref(1)
  //computed返回一个只读响应式ref对象computedNum
  //computedNum是只读属性
  let computedNum = computed(() => num.value + 1)
  </script>
  
  <template>
      <p> num:{{ num }} </p>
      <p>computedNum:{{ computedNum }}</p>
      <!-- 修改响应式变量num 触发与之绑定的computed的getter-->  
      <button @click="num++">num++</button>
      <!-- computedNum是只读属性-->  
      <button @click="computedNum++">computedNum++</button>
  </template>
  ```

- computed同时接收`getter函数对象`和`setter函数对象`

  > setter触发形式：computed返回值被修改时
  >
  > 1、setter函数对象没有返回值
  >
  > 2、computed返回一个**可读可写**响应式对象
  >
  > 3、setter函数对象有个参数，是getter的返回值，也是computed的值
  >
  > 4、修改computed返回值，触发setter函数对象执行，但不会真正修改computed返回值（setter内改变getter计算值就会改变computed返回值）

  

  ```html
  <script setup>
  import { ref, computed } from 'vue'
  const num = ref(1)
  //getter（只读）
  let computedNum = computed(() => num.value + 1)
  //getter和setter （可读可写）
  let computedNum2 = computed({
      get: () => num.value + 1,
      set: (val) => {
           console.log(val);
          //setter中修改ref响应式变量num，将触发关联的num的getter计算
          //computedNum和computedNum2的getter同时触发
           num.value++
            }
  })
  </script>
  
  <template>
      <p> num:{{ num }} </p>
      <p>computedNum:{{ computedNum }}</p>
      <p>computedNum2:{{ computedNum2 }}</p>
      <button @click="num++">num++</button>
      <!-- computedNum是只读属性，会有警告提醒 Write operation failed: computed value is readonly-->  
      <button @click="computedNum++">computedNum++</button>
       <!-- computedNum2是可读可写属性-->  
      <button @click="computedNum2++">computedNum2++</button>
  </template>
  ```

  


## `调试 Computed`

> 使用范围：仅开发模式生效
>
> computed的第二参数：带有 `onTrack` 和 `onTrigger` 选项的对象
>
> - `onTrack` ：getter**关联**的响应式数据时触发。
> - `onTrigger` ：getter关联的响应式数据**被修改**时触发

```html
<script setup>
import { ref, computed } from 'vue'
const num = ref(1)
let computedNum = computed(() => num.value + 1, {
    onTrack: (e) => {
        console.log('onTrack');
        console.log(e);
    },
    onTrigger: (e) => {
        console.log('onTrigger');
        console.log(e);
    }
})

</script>

<template>
    <p> num:{{ num }} </p>
    <p>computedNum:{{ computedNum }}</p>
    <!--每次 num++将触发onTrigger -->
    <button @click="num++">num++</button>
</template>
```





## `watchEffect` 

> **立即执行**传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
>
> 1、会立即执行一次
>
> 2、关联的响应式数据**被修改**时触发
>
> 3、会自动感知代码依赖，和watch不一样，watchEffect会主动绑定监听数据

```html
<script setup>
import { ref, watchEffect } from 'vue'
const num = ref(1)
//会立即执行一次
watchEffect(() => {
    console.log('watchEffect');
    num.value++
})
</script>

<template>
    <p>num: {{ num }}</p>
    <button @click="num++">num++</button>
</template>
```

### 停止`watchEffect` 

- 隐式：组件卸载时自动停止

- 显式：调用`watchEffect` 返回值

  ```javascript
  const stop = watchEffect(() => {
    /* ... */
  })
  
  // 显式停止
  stop()
  ```



### 清理watchEffect

> 语法： `  watchEffect( onInvalidate=>{    onInvalidate(()=>{ })    })`
>
> onInvalidate 是一个函数！优先触发！
>
> onInvalidate 执行时机:
>
> 1、watchEffect   被重新触发时
>
> 2、组件卸载时
>
> 注意：关联的响应式数据**首次被修改**时不会触发onInvalidate函数！
>
> 作用： 清理定时器、事件监听removeEventListener 

```javascript
import { ref, watchEffect } from 'vue'
const num = ref(1)
watchEffect((onInvalidate ) => {
    console.log('watchEffect-1');
    num.value++
    onInvalidate (()=>{
        console.log('onInvalidate-2');
    })
    console.log('watchEffect-3');
})

//1、watchEffect   被重新触发时
// onInvalidate-2
// watchEffect-1
// watchEffect-3
//2、组件卸载时
// onInvalidate-2
//3、关联的响应式数据首次被修改（组件被挂载时）
//  watchEffect-1
//  watchEffect-3
```

### `watchPostEffect` 和 `watchSyncEffect`

> Vue3.2新增,是watchEffect的简写？或者说是类似语法糖的东西

- `watchPostEffect` 

  ```javascript
  watchEffect(
    () => {
      /* ... */
    },
    {
      flush: 'post'
    }
  )
  ```

- `watchSyncEffect`

  ```
  watchEffect(
    () => {
      /* ... */
    },
    {
      flush: 'sync'
    }
  )
  ```

  

## `watch`

> Vue3的watch和Vue2的watch是基本一样的
>
> 1、需要指定监听数据
>
> 2、惰性，只在被监听数据变化时才触发
>
> 语法：
>
> - 参数1-被监听数据（形式：单个数据、数组、带返回值的回调函数）
> - 参数2-触发监听的回调函数
> - 参数3-传入`{immediate: true,deep:true} `对象

- 监听单个数据

  ```javascript
  // 侦听一个 getter
  //被监听数据传入一个带返回值的回调函数
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  
  // 直接侦听一个 ref
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

- 监听多个数据(传入数组)

  ```javascript
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  









[响应式计算和侦听 | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#调试-computed)



[Computed 与 watch | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/api/computed-watch-api.html#watchsynceffect)