# 为什么推荐使用ref而不是reactive



## 1. `reactive`和  `ref` 对比

| `reactive`                                  | `ref`                                                        |
| ------------------------------------------- | ------------------------------------------------------------ |
| ❌只支持对象和数组(引用数据类型)             | ✅支持基本数据类型+引用数据类型                               |
| ✅在 `<script>` 和 `<template>` 中无差别使用 | ❌在 `<script>` 和 `<template>` 使用方式不同(script中要`.value`) |
| ❌重新分配一个新对象会丢失响应性             | ✅重新分配一个新对象**不会**失去响应                          |
| 能直接访问属性                              | 需要使用 `.value` 访问属性                                   |
| ❌将对象传入函数时,失去响应                  | ✅传入函数时,不会失去响应                                     |
| ❌解构时会丢失响应性,需使用toRefs            | ❌解构对象时会丢失响应性,需使用toRefs                         |

- ref 用于将**基本类型的数据（如字符串、数字，布尔值等）和引用数据类型(对象)**转换为响应式数据。使用 ref 定义的数据可以通过 **`.value`** 属性访问和修改。

- reactive 用于将**对象**转换为响应式数据，包括复杂的嵌套对象和数组。使用 reactive 定义的数据可以**直接**访问和修改属性。

### 原因1:reactive有限的值类型

####  reactive只能声明引用数据类型(对象)

```javascript
let  obj = reactive({
   name: '小明',
   age : 18
})
```

####  ref既能声明基本数据类型,也能声明对象和数组;

> Vue 提供了一个 [`ref()`](https://cn.vuejs.org/api/reactivity-core.html#ref) 方法来允许我们创建可以使用**任何值类型**的响应式 **ref**

```javascript
//对象
const state = ref({})
//数组
const state2 = ref([])
```



### 原因2:reactive使用不当会失去响应:

> `reactive`一时爽,使用不恰当的时候失去响应泪两行,开开心心敲代码过程中,会感叹!!咦?怎么不行?为什么这么赋值失去响应了? 辣鸡reactive!!! 我要用 ref 👉👉yyds
>

##### 1. 给reactive赋一整个普通对象/reactive对象

> 通常在页面数据回显时,需要将AJAX请求获取的对象直接赋值给响应式对象,如果操作不当就导致`reactive声明的对象`失去响应

- 赋值一个普通对象

  ```javascript
  let state = reactive({ count: 0 })
  //这个赋值将导致state失去响应
  state = {count: 1}
  ```

- 赋值一个`reactive`对象

  > 如果给reactive的响应式对象赋值普通对象会失去响应,那么给它赋值一个reactive的响应式对象不就行了吗?下面试试看

```html
<template>
  {{state}}
</template>    

<stcirpt setup>
const state = reactive({ count: 0 })
 //nextTick异步方法中修改state的值
nextTick(() => {
  //并不会触发修改DOM  ,说明失去响应了
  state = reactive({ count: 11 });
});
</stcirpt>
```

在`nexTick`中给`state`赋值一个reactive的响应式对象,但是DOM并没有更新!



###### **解决方法:**

1. 不要直接整个对象替换,对象属性一个个赋值

   ```javascript
   let state = reactive({ count: 0 })
   //state={count:1}
   state.conut = 1 
   ```

2. 使用`Object.assign`

   ```javascript
   let state = reactive({ count: 0 })
   // state =  {count:1}   state失去响应
   state = Object.assign(state , {count:1})
   ```

   

3. 使用ref定义对象

   > 非必要不用reactive

   ```javascript
   let state = ref({ count: 0 })
   state.value={count:1}
   ```

###### 为什么同样是赋值对象ref不会失去响应而reactive会?:

`ref` 定义的数据（包括对象）时，都会变成` RefImpl`(Ref 引用对象) 类的实例，无论是修改还是重新赋值都会调用` setter`，都会经过` reactive `方法处理为响应式对象。
`reactive `定义数据（必须是对象），是直接调用` reactive` 方法处理成响应式对象。如果重新赋值，就会丢失原来响应式对象的**引用地址**，变成一个新的引用地址，这个新的引用地址指向的对象是没有经过` reactive` 方法处理的，所以是一个普通对象，而不是响应式对象。





##### 2.将reactive对象的属性-赋值给变量(断开连接/深拷贝)

> 这种类似深拷贝不共享同一内存地址了,只是字面量的赋值;对该变量赋值也不会影响原来对象的属性值

```javascript
let state = reactive({ count: 0 })
//赋值
// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++
console.log(state.count) //0
```

有人就说了,既然赋值对象的属性,那我赋值一整个对象不就是浅拷贝了吗?那不就是上面说的`给响应式对象的字面量赋一整个普通对象/reactive对象`这种情况吗?这种是会失去响应的

##### 3.直接reactive对象解构时

- 直接解构会失去响应

```javascript
let state = reactive({ count: 0 })
//普通解构count 和 state.count 失去了响应性连接
let { count } = state 
count++ // state.count值依旧是0
```

###### 解决方案:

- 使用`toRefs`解构不会失去响应

  > 使用toRefs解构后的属性是`ref`的响应式数据

```javascript
const state = reactive({ count: 0 })
//使用toRefs解构,后的属性为ref的响应式变量
let { count } = toRefs(state)
count.value++ // state.count值改变为1
```



##### 4.将reactive对象传入一个函数时

> 将reactive声明的响应式对象的参数传入一个函数时,会失去响应

```jsx
let state = reactive({ count: 0 })

const fn = (count) => {
  // ⚠️ 这里的 count 是一个普通的 number (不是)
  console.log(count)
  // 不能跟踪 state.count 的改变
}

//调用该函数,传入响应式对象的参数
fn(state.count)
```







## 建议: ref一把梭

> 当使用reactive时,如果不了解**reactive失去响应的情况**,那么使用reactive会造成很多困扰!

推荐使用`ref`总结原因如下:

1. reactive有限的值类型:只能声明引用数据类型(对象/数组)

2. reactive在一些情况下**会失去响应**,这个情况会导致数据回显**失去响应(数据改了,dom没更新)**

   给响应式对象的字面量赋一整个普通对象,将会导致reactive声明的响应式数据失去响应

   ```html
   <template>
      {{state.a}}
      {{state.b}}
      {{state.c}}
   </template>
   
   <script>
    let state = reactive({ a:1,b:2,c:3 })
    onMounted(()=>{
        //通AJAX请求获取的数据,回显到reactive,如果处理不好将导致变量失去响应,
       //回显失败,给响应式数据赋值一个普通对象
       state =  { a:11,b:22,c:333 }
      //回显成功,一个个属性赋值  
       state.a = 11
       state.b = 22
       state.c = 33 
    })
   </script>
   ```

   上面这个例子如果是使用ref进行声明,直接赋值即可,不需要将属性拆分一个个赋值

   

   使用ref替代reactive:

   ```html
   <template>
      {{state.a}}
      {{state.b}}
      {{state.c}}
   </template>
   
   <script>
    let state = ref({ a:1,b:2,c:3 })
    onMounted(()=>{
       //回显成功
       state.value =  { a:11,b:22,c:333 }
    })
   </script>
   ```

   

3. ref适用范围更大,声明的数据类型.基本数据类型和引用数据类型都行

虽然使用ref声明的变量,在读取和修改时都需要加`.value`小尾巴,但是正因为是这个小尾巴,我们review代码的时候就很清楚知道这是一个`ref`声明的响应式数据;



#### 推荐开启ref自动插入`.value`





