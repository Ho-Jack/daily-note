### Vue中的$event详解

#### 场景1：获取原生DOM事件的事件对象

>在DOM事件的回调函数中传入参数`$event`，可以获取到该事件的`事件对象`

```vue
<template>
<button @click="getData($event)">按钮</button>
</template>

<script>
export default {
    setup() {
        const getData = (e) => {
            console.log(e)  //打印出的事件对象
        }
        return {
            getData
        }
    }
}
</script>

```



#### 场景2：事件注册所传的参数(子组件向父组件传值)

> 在子组件中通过`$emit`注册事件，将数据作为`参数`传入，在父组件中通过`$event`接收到子组件传入的参数

#####  子组件
```vue
<template>
<button @click="$emit('hello', 'hello')">Hello</button>
<!-- $emit()的第一个参数是定义的事件名，第二个参数是要传入的数据 -->
</template>

<script>
export default {

}
</script>
```

##### 父组件

```vue
<template>
<Hello @hello="showData($event)" />
<h4>{{data}}</h4>
</template>

<script>
import Hello from '@/components/Hello.vue'
import {
    ref
} from 'vue'
export default {
    components: {
        Hello
    },
    setup() {
        const data = ref(null)
        const showData = (e) => {
            data.value = e
        }
        return {
            showData,
            data
        }
    }
}
</script>
```

总结： 在element-ui中 el-input等组件的change事件，实际上也是父子组件通讯，所以能通过 $event在父组件中获取子组件传递的数据

