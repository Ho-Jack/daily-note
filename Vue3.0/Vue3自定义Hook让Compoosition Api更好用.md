## Vue3自定义Hooks让Compoosition Api更好用

> hook:  直译[hʊk] 钩子
>
> Hook其实在前端领域没有明确定义，借用知乎大佬的定义：在js里是callback,事件驱动，集成定义一些可复用的方法
>
> 个人理解：一些可复用的方法像钩子一样挂着，随时可以引入和调用，应该都能算是hook；Vue3官方文档一圈看下来其实是没有明确说明什么是Hooks但是却在使用 （[飞机](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E7%8B%AC%E7%AB%8B%E7%9A%84-computed-%E5%B1%9E%E6%80%A7)）

大胆定义一下Vue3的自定义Hook： 

1. 将可复用功能抽离为外部JS

2. 函数名/文件名以use开头，形如：useXX

3. 将响应式变量或者方法形式暴露出来如：` const {nameRef，Fn} = useXX()`   

    （在setup函数解构出自定义hooks的变量和方法）

### 实例：

> 简单的加减法计算，将加法和减法抽离为2个自定义Hooks，并且相互传递响应式数据

加减法计算组件

```html
<template>
    <div>
        num1:<input v-model.number="num1" style="width:100px" />
        <br />
        num2:<input v-model.number="num2" style="width:100px" />
    </div>
    <span>加法等于:{{ addNum }}</span>
    <br />
    <span>减法等于:{{ subNum }}</span>
</template>

<script setup>
import { ref } from 'vue'
import useAdd from './useAdd.js'     //引入自动hook 
import { useSub } from './useSub.js' //引入自动hook 

const num1 = ref(2)
const num2 = ref(1)
//加法功能-自定义Hook（将响应式变量或者方法形式暴露出来）
const { addNum, add } = useAdd({ num1, num2 })
add(num1.value, num2.value)
//减法功能-自定义Hook 将响应式变量或者方法形式暴露出来
const { subNum, sub } = useSub({ num1, num2 })
sub(num1.value, num2.value)
</script>

```

加法功能-Hook

```javascript
import { ref, watch } from 'vue';
const useAdd= ({ num1, num2 })  =>{
    const addNum = ref(0)
    watch([num1, num2], ([num1, num2]) => {
        add(num1, num2)
    })
    const add = (num1, num2) => {
        addNum.value = num1 + num2
    }
    return {
        addNum,
        add
    }
}
export default useAdd
```

减法功能-Hook

```javascript
//减法功能-Hook
import { ref, watch } from 'vue';
export function useSub  ({ num1, num2 }){
    const subNum = ref(0)
    watch([num1, num2], ([num1, num2]) => {
        sub(num1, num2)
    })
    const sub = (num1, num2) => {
        subNum.value = num1 - num2
    }
    return {
        subNum,
        sub
    }
}
```







把问题解释明白，用最简单语言描述清楚，