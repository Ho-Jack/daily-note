## Vue3.2 setup语法糖  [ 单文件组件的语法糖`<script setup>` ]

>` <script setup>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
> 解决Vue3.0中setup需要繁琐将声明的变量、函数以及 import 引入的内容通过return向外暴露,才能在<template/>使用

### 1.`<script setup>`中无需return   声明的变量、函数以及import引入的内容，即可在<template/>使用

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

这里面的代码会被编译成组件 `setup()` 函数的内容，这也就意味着与普通的 `<script>` 只在组件被首次引入的时候仅执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。这一点非常的重要，也就是写在 `<script setup>` 中的代码，例如初始化的赋值等在组件每次实例创建时都重新执行一次。

### 2、`<script setup>`引入组件将自动注册

> 不需要在引入组件后，通过 `components:{}`注册组件，可直接使用

```vue
<script setup>
import MyComponent from './MyComponent.vue'
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

> - template 中可以直接使用父组件传递的props  （可省略props.）
> - script-setup 需要通过props.xx获取父组件传递过来的props

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



- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块范围内。

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
const childRef= ref()    
const getChildData =()=>{
      //子组件接收暴露出来得值
  console.log(childRef.value.a) //1
  console.log(childRef.value.b) //2  响应式数据
}    
</script>
```




