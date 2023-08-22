# Computed 与 watch

## computed、watch和watchEffect的区别

| 功能点         | computed                                                     | watch                                        | watchEffect                                              |
| :------------- | :----------------------------------------------------------- | :------------------------------------------- | :------------------------------------------------------- |
| 用法           | 声明式地计算衍生数据(计算多个响应式变量整合成一个**新的响应式变量**) | 监听特定的响应式数据变化并执行相应的回调函数 | 响应式地执行副作用函数                                   |
| 自动收集依赖   | 是,自动收集计算数据中的响应式数据                            | 否,**需要指定**响应式数据                    | 是,与computed一样自动监听回调函数中的响应式数据          |
| 数据依赖       | 计算中的响应式数据                                           | 监听一个或多个指定的响应式数据               | 自动追踪副作用函数中使用的所有响应式数据依赖             |
| 特殊性         | 具有**缓存性**,开销小性能更高,只能执行**同步逻**辑           | 需要指定监听的响应数据,可以执行**异步**逻辑  | 初始化将会立即执行一次（和watch的immediate属性效果一致） |
| 执行时机       | 访问计算属性时执行                                           | 数据源变化时执行                             | 数据源变化时执行                                         |
| 回调参数       | 无                                                           | (新值,旧值)                                  | 无                                                       |
| 返回值         | **有,计算后的值**` <br>只有getter返回只读的ref响应式数据<br>有setter返回可读可写的ref响应式数据 | 无                                           | 无                                                       |
| 停止监视       | 不需要停止                                                   | 需要手动停止                                 | 组件销毁自动停止,也能手动停止                            |
| 是否支持副作用 | 否,副作用应该是监听器的功能<br>副作用:会对函数体外部的变量或系统产生影响的操作(异步操作) | 是                                           | 是                                                       |



# 1. 计算属性`computed`

> 声明式地计算衍生数据(计算多个响应式变量整合成一个**新的响应式变量**)

### 1.1. 只有一个`getter回调函数`



- getter是**回调函数**且必须有返回值

- getter的返回值是computed的值

- getter中不应该有副作用

  > 副作用:会对函数体外部的变量或系统产生影响的操作
  >
  > 副作用应该由watch监听器来做

- computed返回一个**只读**响应式ref对象（只读、响应式、对象）

  > 只读属性，修改会有警告提醒 `Write operation failed: computed value is readonly`

  ```typescript
  // 只读的
  function computed<T>(
    getter: () => T,
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>
  ```

  

注意：computed只接收一个getter函数时，返回的是只读对象，也就是不能修改他的返回值！

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

###  1.2. `同时接收`getter函数对象`和`setter函数对象`

> computed中setter的触发条件是修改computed的返回值,当时

1. getter和setter都是函数对象

   ```typescript
   // 可写的
   function computed<T>(
     options: {
       get: () => T
       set: (value: T) => void  //setter函数对象有参数,参数是getter的返回值,且没有返回值
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

2. setter函数对象没有返回值

3. computed返回一个**可读可写**响应式对象

4. setter函数对象有参数，是getter的返回值，也是computed的值

5. 修改computed返回值，触发setter函数对象执行，但不会真正修改computed返回值（setter内改变getter计算值就会改变computed返回值）

   > getter的返回值是computed的值,修改computed的返回值只会出发setter,如果在setter中修改get中返回的响应式变量则会触发getter

#### 1.2.1. setter触发条件：

> computed返回值被修改时

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



#### 1.2.2.避免直接修改计算属性值(减少使用setter)

官方推荐:计算属性应该视为只读属性,而不应该去修改它,修改计算属性的值并不是一个推荐的做法，因为它违背了计算属性的初衷;



### 1.3 computed的缓存性

> computed依赖的响应式数据没改变前,会缓存getter返回的值,无论读取多少次computed,只要依赖的响应式数据没改变都不会重复执行getter函数

优势: 开销小,高性能;很适合用来做消耗性能的数据计算,而不会经常改变的数据

适用场景: 

- 对于复杂的计算
- 涉及大量数据的场景 ;

- 当某个计算结果需要在多个地方使用时

### 1.4 computed 的同步性

> 计算是同步的，这意味着它会立即返回计算结果，并且在数据变化时能够立即响应更新

因此以下情况最好是使用watch监听器

- 异步请求
- 触发事件

### 1.4. `调试 Computed`

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



# 2.监听器`watch`和`watchEffect` 

> 当计算属性中需要执行"副作用",也就是要修改函数外部的变量或者执行一些异步操作的时候,计算属性`computed`就不适用了

## 2.1. `watchEffect` 

> 使用 `watchEffect()` 可以消除手动维护依赖列表的负担(相比watch)

##### 语法：

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
> 局限性：**不能监听对象(但可以监听对象的属性)**，只能监听类似ref基本数据类型的响应式数据

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



### 2.1.2. 停止`watchEffect` 

- 隐式：组件卸载时自动停止

- 显式：调用`watchEffect` 返回值

  ```javascript
  const stop = watchEffect(() => {
    /* ... */
  })
  
  // 显式停止
  stop()
  ```



### 2.1.3. 清理watchEffect

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

### 2.1.4. `watchPostEffect` 和 `watchSyncEffect`

> `watchPostEffect` 和 `watchSyncEffect`在Vue3.2新增,是watchEffect类似语法糖的东西,
>
> 是`watchEffect`可选参数对象`{ flush?: 'pre' | 'post' | 'sync'}`中post和sync的语法糖，pre是默认值

#### 2.1.4.1. 推迟触发`watchPostEffect` 

> `watchPostEffect` 是watchEffect可选参数对象`{flush:'post'}`的语法糖
>
> **推迟**watchEffect触发时机！**组件更新前触发**！也就是在生命周期`onBeforeUpdate`和 `onUpdated`之间触发

也就是可以替代`nextTick回调`

###### 语法：

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



###### 实例：

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



#### 2.1.4.2. 同步触发`watchSyncEffect`

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

### 2.1.5. `watchEffect`不能监听对象

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

总结：`watchEffect`用来监听能监听**基本数据类型**，不能监听对象，但能监听对象的属性;watch能监听基本数据类型和对象！



## 3. `watch`

##### 语法：

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

  `setter`触发条件：computed返回值被修改时 (官方不推荐修改`computed`的返回值,也就是使用`setter`)

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


