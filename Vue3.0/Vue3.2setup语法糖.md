## Vue3.2 setup语法糖  [ 单文件组件的语法糖`<script setup>` ]

阅读本来，默认你已经对Vue3.0的composition API有一定了解，但困扰于setup函数内需要繁琐return相关的变量和函数，那setup的语法糖`<script setup>` 你将收获满满。语法糖`<script setup>` 的引入让你写Vue3更爽，让Vue3更丰满。本文是在官方文档基础上写的，如果有时间，建议上[官方文档](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95)上看，本文写得更为语义化和通俗，希望你能喜欢。

>` <script setup>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
> 解决Vue3.0中setup需要繁琐将声明的变量、函数以及 import 引入的内容通过return向外暴露,才能在`<template/>`使用

### 1.`<script setup>`中无需return   声明的变量、函数以及import引入的内容，即可在`<template/>`使用

- `<script setup>`语法糖

  ```vue
  <script setup>
  //import引入的内容
  import { getToday } from './utils'  
  // 变量
  const msg = 'Hello!'
  // 函数
  function log() {
    console.log(msg)
  }
  </script>
  
  //在template中直接使用声明的变量、函数以及import引入的内容
  <template>
    <div @click="log">{{ msg }}</div>
     <p>{{getToday()}}</p>
  </template>
  ```

- 标准组件`<script>` 需要写setup函数并繁琐retrun

  ```vue
  <script>
  //import引入的内容
  import { getToday } from './utils'  
  export default{
   setup(){
      // 变量
      const msg = 'Hello!'
      // 函数
      function log() {
        console.log(msg)
      }
      //想在tempate里面使用需要在setup内return暴露出来
      return{
         msg,
         log,
         getToday 
      }
   }
  }
  </script>
  
  <template>
    <div @click="log">{{ msg }}</div>
     <p>{{getToday()}}</p>
  </template>
  ```

  总结：`<script setup>`语法糖里面的代码会被编译成组件 `setup()` 函数的内容，不需要通过return暴露  声明的变量、函数以及import引入的内容，即可在`<template/>`使用，并且**不需要写`export default{}`**
  
  `<script setup>`语法糖里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**
  
  ```vue
  <script>
  console.log('script');//多次实例组件,只触发一次
  export default {
      setup() {
          console.log('setupFn');//每次实例化组件都触发和script-setup标签一样
      }
  }
  </script>
  ```
  
  （script-setup标签最终都会编译成`setup()` 函数的内容，每次实例化组件，就是实例化一次setup函数。script标签里面的setup函数也是一样每次实例化组件，就是实例化一次setup函数，但是script标签setup是需要写在export default{}内的，外的只是首次引入的时候执行一次）



### 2、`<script setup>`引入组件将自动注册

> 不需要在引入组件后，通过 `components:{}`注册组件，可直接使用

```vue
<script setup>
import MyComponent from './MyComponent.vue'
//components:{MyComponent}  不需要注册直接使用
</script>

<template>
  <MyComponent />
</template>
```

###  3、组件通信:在` <script setup> `中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits

>`defineProps` 和 `defineEmits`具备完整的类型推断并且在 `<script setup>` 中是**直接可用的**(浏览了一下掘金，发现大部分文章demo还是通过import引入这2个api，这点官方文档写得很清楚)

#### defineProps 代替props，接收父组件传递的数据（父组件向子组件传参）

父组件:

```vue
<template>
  <div>父组件</div>
  <Child :title="msg" />
</template>

<script setup>
import {ref} from 'vue'
import Child from './child.vue'
const msg = ref('父的值')  //自动返回，在template直接解套使用
</script>
```

子组件：

> - `<template/>` 中可以直接使用父组件传递的props  （可省略props.）
> - `<script-setup>` 需要通过props.xx获取父组件传递过来的props

```vue
<template>
  <div>子组件</div>
  <div>父组件传递的值：{{title}}</div>
</template>

<script setup>
//import {defineProps} from 'vue'   不需要引入

//语法糖必须使用defineProps替代props
const  props = defineProps({
  title: {
    type: String
  }
});
//script-setup 需要通过props.xx获取父组件传递过来的props
console.log(props.title) //父的值
</script>

```




### defineEmit  代替emit，子组件向父组件传递数据（子组件向外暴露数据）

子组件代码:

```vue
<template>
  <div>子组件</div>
  <button @click="toEmits">子组件向外暴露数据</button>
</template>

<script setup>
import {ref} from 'vue'
const name = ref('我是子组件')
//1、暴露内部数据
const  emits = defineEmits(['childFn']);

const  toEmits = () => {
  //2、触发父组件中暴露的childFn方法并携带数据
  emits('childFn',name)
}
</script>

```

父组件代码:

```vue
<template>
  <div>父组件</div>
  <Child  @childFn='childFn' />
  <p>接收子组件传递的数据{{childData}} </p>
</template>

<script setup>
import {ref} from 'vue'
import Child from './child.vue'
    
const childData = ref(null)    
const childFn=(e)=>{
    consloe.log('子组件触发了父组件childFn，并传递了参数e')
    childData=e.value
}    
       
</script>
```



### 4.  `<script setup>`需主动暴露组件属性 ：defineExpose 

> 使用 `<script setup>` 的组件是**默认关闭**的，也即通过模板 ref 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。 

子组件代码：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)
//主动暴露组件属性
defineExpose({
  a,
  b
})
</script>
```

父组件代码:

```vue
<template>
  <div>父组件</div>
  <Child  ref='childRef' />
  <button @click='getChildData'>通过ref获取子组件的属性 </button>
</template>

<script setup>
import {ref} from 'vue'
import Child from './child.vue'
const childRef= ref()  //注册响应数据  
const getChildData =()=>{
  //子组件接收暴露出来得值
  console.log(childRef.value.a) //1
  console.log(childRef.value.b) //2  响应式数据
}    
</script>
```



### 5.语法糖其他功能

1. `useSlots` 和 `useAttrs`  （**少用**，由于大部分人是SFC模式开发，在`<template/>`通过`<slot/>`标签就可以渲染插槽）

   > 如果需要在`script-setup`中使用  `slots` 和 `attrs` 需要用`useSlots` 和 `useAttrs`替代
   >
   >  需要引入：`import { useSlots ,useAttrs  }  form 'vue' `
   >
   > 在`<template/> `中通过 `$slots` 和 `$attrs` 来访问更方便（$attrs 用来获取父组件中非props的传递到子组件的参数/方法，$slots可以获取父组件中插槽传递的虚拟dom对象，在SFC模式应该用处不大，在JSX /TSX使用比较多）

   父组件:

   ```vue
   <template>
     <Child msg="非porps传值子组件用attrs接收" >
       <!-- 匿名插槽 -->
       <span >默认插槽</span>
       <!-- 具名插槽 -->
       <template #title>
         <h1>具名插槽</h1>
       </template>
       <!-- 作用域插槽 -->
       <template #footer="{ scope }">
         <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
       </template>
     </Child>
   </template>
   
   <script setup>
   // 引入子组件
   import Child from './child.vue'
   </script>
   ```

   子组件：

   ```vue
   <template>
     <!-- 匿名插槽 -->
     <slot />
     <!-- 具名插槽 -->
     <slot name="title" />
     <!-- 作用域插槽 -->
     <slot name="footer" :scope="state" />
     <!-- $attrs 用来获取父组件中非props的传递到子组件的参数 -->
     <p>{{ attrs.msg == $attrs.msg }}</p>
     <!--true  没想到有啥作用... -->
     <p>{{ slots == $slots }}</p>
   </template>
   
     
   <script setup>
   import { useSlots, useAttrs, reactive, toRef } from 'vue'
   const state = reactive({
     name: '张三',
     age: '18'
   })
   
   const slots = useSlots()
   console.log(slots.default()); //获取到默认插槽的虚拟dom对象
   console.log(slots.title());   //获取到具名title插槽的虚拟dom对象
   // console.log(slots.footer()); //报错  不知道为啥有插槽作用域的无法获取
   //useAttrs() 用来获取父组件传递的过来的属性数据的（也就是非 props 的属性值）。
   const attrs = useAttrs()
   </script>
   ```

   useSlots或许在JSX/TSX下更实用

   > [想使用JSX语法在vite需要下载相关jsx的plugins才能识别jsx](https://blog.csdn.net/Ag_wenbi/article/details/122210248)
   >
   > useSlots 可以获取父组件传递过来插槽的虚拟dom对象，可以用来渲染插槽内容 

   ```jsx
   <script lang='jsx'>
   import { defineComponent, useSlots } from "vue";
   export default defineComponent({
     setup() {
       // 获取插槽数据
       const slots = useSlots();
       // 渲染组件
       return () => (
         <div>
           {slots.default?slots.default():''}
           {slots.title?slots.title():''}
         </div>
       );
     },
   });
   </script>
   ```

   大部分人是[SFC模式]([SFC 语法规范 | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/api/sfc-spec.html))开发，在`<template/>`通过`<slot/>`标签就可以渲染插槽，这种JSX 的写法应该是很少人会使用的

总结：setup的语法糖作为Vue3的补充，让Vue3更加丰满，让我们写Vue3更爽。如果觉得写得还不错不吝啬给点给赞再走吧！

