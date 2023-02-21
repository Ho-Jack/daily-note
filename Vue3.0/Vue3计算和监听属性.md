# Vue3说人话系列之Computed 与 watch

## 1. `computed`

### 1.1. `computed`只接收一个`getter回调函数`

> 1、getter回调函数必须有返回值
>
> 2、computed返回一个**只读**响应式ref对象（只读、响应式、对象）
>
> 注意：computed只接收一个getter函数时，返回的是只读对象，也就是不能修改他的返回值！

#### getter触发条件：

1. computed**返回值**首次被读取时 
2. getter绑定的响应式变量被修改时

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

###  1.2. `computed`同时接收`getter函数对象`和`setter函数对象`

> 1、setter函数对象没有返回值
>
> 2、computed返回一个**可读可写**响应式对象
>
> 3、setter函数对象有参数，是getter的返回值，也是computed的值
>
> 4、修改computed返回值，触发setter函数对象执行，但不会真正修改computed返回值（setter内改变getter计算值就会改变computed返回值）

#### setter触发条件：

- computed返回值被修改时

  

实例：

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




### 1.3. `调试 Computed`

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





## 2. `watchEffect` 

语法：

- 参数1：触发监听回调函数，回调函数可传入一个onInvalidate函数作为参数！

- 参数2(可选)：对象，包含3个可选属性flush、onTrack、onTrigger

> **立即执行**传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
>
> 1、会立即执行一次（和watch的immediate属性效果一致）
>
> 2、关联的响应式数据**被修改**时触发
>
> 3、会自动感知**代码依赖**，和watch不一样，watchEffect会主动绑定监听数据
>
> 局限性：不能监听对象(但可以监听对象的属性)，只能监听类似ref基本数据类型的响应式数据

### 2.1. 立即执行，监听基本数据类型

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



### 2.2. 停止`watchEffect` 

- 隐式：组件卸载时自动停止

- 显式：调用`watchEffect` 返回值

  ```javascript
  const stop = watchEffect(() => {
    /* ... */
  })
  
  // 显式停止
  stop()
  ```



### 2.3. 清理watchEffect

- 语法： `  watchEffect( onInvalidate=>{    onInvalidate(()=>{ })    })`

- onInvalidate 是一个函数！优先触发！


> onInvalidate 执行时机:
>
> 1、watchEffect被重新触发时
>
> 2、组件卸载时
>
> 注意：关联的响应式数据**首次被修改**时不会触发onInvalidate函数！
>
> 作用： 清理定时器、事件监听removeEventListener 。。。

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

### 2.4. `watchPostEffect` 和 `watchSyncEffect`

> `watchPostEffect` 和 `watchSyncEffect`在Vue3.2新增,是watchEffect类似语法糖的东西,
>
> 是`watchEffect`可选参数对象`{ flush?: 'pre' | 'post' | 'sync'}`中post和sync的语法糖，pre是默认值

#### 2.4.1. 推迟触发`watchPostEffect` 

> `watchPostEffect` 是watchEffect可选参数对象`{flush:'post'}`的语法糖
>
> 推迟watchEffect触发时机！组件更新前触发！也就是在生命周期`onBeforeUpdate`和 `onUpdated`之间触发

语法：

```javascript
//推迟触发watchEffect
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'post'
  }
)
//Vue3.2语法糖watchPostEffect
watchPostEffect(()=>{
  /* ... */
})
```



实例：

```javascript
//实验watchEffect第二参数 flush: 'post'属性
watchEffect(() => {
    console.log("实验watchEffect第二参数 {flush: 'post'}属性");
    console.log(obj.age);
},{
   flush:'post' 
})
watchEffect(() => {
    console.log("watchEffect正常时机触发");
    console.log(obj.age);
})
//生命周期onUpdated
onUpdated(()=>{
    console.log('onUpdated()');  
})
//生命周期onBeforeUpdate
onBeforeUpdate(()=>{
    console.log('onBeforeUpdate()');
})
```

修改`obj.age`时，执行结果：

```
watchEffect正常时机触发
onBeforeUpdate()
实验watchEffect第二参数 {flush: 'post'}属性
onUpdated()
```



#### 2.4.2. 同步触发`watchSyncEffect`

> `watchSyncEffect` 是watchEffect可选参数对象`{flush:'sync'}`的语法糖
>
> 强制效果始终**同步触发**！效率低！也就是默认watchEffect之前触发

语法：

```javascript
watchEffect(
  () => {
    /* ... */
},
  {
    flush: 'sync'
  }
)
//Vue3.2语法糖watchSyncEffect
watchSyncEffect(()=>{
  /* ... */
})
```

### 2.5. `watchEffect`不能监听对象

```javascript

//假设修改了对象的属性值-修改了obj.age
const obj = reactive({ name: '小明', age: 18 })
//watchEffect不能监听对象变化
watchEffect(() => {
    console.log('watchEffect监听对象变化');
    console.log(obj);
})
//watchEffect可以监听对象属性变化
watchEffect(() => {
    console.log('watchEffect监听对象属性变化');
    console.log(obj.age);
})
//watch监听对象变化
watch(obj, (obj) => {
    console.log('watch监听对象变化');
    console.log(obj);
})
```

总结：`watchEffect`用来监听能监听基本数据类型，不能监听对象，但能监听对象的属性;watch能监听基本数据类型和对象！



## 3. `watch`

语法：

- 参数1-被监听数据（形式：单个数据、数组、带返回值的回调函数）
- 参数2-触发监听的回调函数，无返回值
- 可选参数3-对象`{immediate: true,deep:true} `，对象含2个可选参数和Vue2参数效果一致

> Vue3的watch和Vue2的watch是基本一样的
>
> 1、需要指定监听数据
>
> 2、惰性，只在被监听数据变化时才触发（immediate属性可以设置在初始化的时候触发）

### 3.1. 监听单个数据

> 参数1被监听数据的形式： 
>
> 1、单个基本数据类型；
>
> 2、回调函数：返回值为单个基本数据类型；

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

### 3.2. 监听多个数据(传入数组)

```javascript
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```





## 4. 官方文档总结：

> 以下代码截取官方文档，从TS代码可以看出很多关于watch和watchEffect函数参数和返回值的细节！

### computed

- `computed`只接收一个`getter函数`

  `getter`触发条件：
  
  1、computed返回值首次被读取时 
  
  2、getter绑定的响应式变量被修改时
  
  
  
- `computed`同时接收`getter函数对象`和`setter函数对象`

  `setter`触发条件：computed返回值被修改时

```typescript
// 只读的
function computed<T>(
  getter: () => T,
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}
```



### watchEffect:

- 参数1-触发监听回调函数，回调函数可传入一个onInvalidate函数作为参数！
- 可选参数2-对象，包含3个可选属性flush、onTrack、onTrigger

```typescript
function watchEffect(
  effect: (onInvalidate: InvalidateCbRegistrator) => void,
  options?: WatchEffectOptions
): StopHandle

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}

type InvalidateCbRegistrator = (invalidate: () => void) => void

type StopHandle = () => void
```



### watch：

- 参数1-被监听数据（形式：单个数据、数组、带返回值的回调函数）
- 参数2-触发监听的回调函数，无返回值
- 参数3-传入`{immediate: true,deep:true} `对象和Vue2参数效果一致

```typescript
// 侦听单一源
function watch<T>(
  source: WatcherSource<T>,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// 侦听多个源
function watch<T extends WatcherSource<unknown>[]>(
  sources: T
  callback: (
    values: MapSources<T>,
    oldValues: MapSources<T>,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

// 参见 `watchEffect` 共享选项的类型声明
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean
}
```


