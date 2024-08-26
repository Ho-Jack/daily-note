# 读官方文档学技术-Vue3父组件向子组件通讯不要盲目用props

> 笔者认为,Vue的官方文档是十分出色,除源码分析外大部分文章基本是在官方文档下的二创,这就很考验二创对官方文档的总结能力了,本文主题是根据官方文档`依赖注入provide/inject`写的, [🛩️🛩️官方文档直达飞机🛩️🛩️](https://cn.vuejs.org/guide/components/provide-inject.html#prop-drilling)  强烈细读官方文档!
>

## 1. 先下结论:

父组件向子组件传递信息,如果是**多层组件嵌套(父>子>孙>孙孙......)**,props**逐级透传**十分麻烦,props可用但不优雅,更推荐  `provide/inject依赖注入`的方式;

在**`provide/inject依赖注入`**中父组件向后代组件通讯,如果说props是传递,逐级透传的,那么依赖注入更准确来说是在父组件中与后代组件共享数据,可实现跨级共享;

## 2. 原因:

### 2.1. **`props逐级透传`**:

> 逐级透传,多层组件嵌套的情况,需要一层层传递到目标组件,十分麻烦,虽然大部分情况是点对点传递,但是涉及到多层组件通讯的情况,props用起来就不是那么优雅了

<img src="https://cn.vuejs.org/assets/prop-drilling.11201220.png" alt="Prop 逐级透传的过程图示" style="zoom:50%;" />

- props父传子适应组件间直接传递的情况:

  从图中可见,**`props逐级透传`**是十分麻烦的,需要一层层传递props,在每一层子孙组件中接收props和传递props

#### 2.1.1. **`props逐级透传`**:组合式API +setup 语法糖代码实例:

```vue
//父组件 Root.vue---------------------------------------------------
<template>
  <div>
    <Footer :msg="parentMsg" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Footer from './Footer.vue' //导入子组件Footer
const parentMsg = ref('父组件信息')
</script>

//子组件 Footer.vue--------------------------------------------------
<template>
    <DeepChild>
    </DeepChild>
</template>
<script setup>
import { toRef, defineProps } from "vue";
import DeepChild from './DeepChild.vue' //导入孙子组件DeepChild 
const props = defineProps(["msg"]);//接收Root父组件传递的信息
console.log(props.msg) //父组件信息
</script>

//子孙组件DeepChild.vue---------------------------------------------------
<template>
    <div>
        {{ msg }}
    </div>
</template>
<script setup>
import { toRef, defineProps } from "vue";
const props = defineProps(["msg"]);//接收Footer父组件传递的信息
console.log(props.msg) //父组件信息
</script>

```



### 2.2. **`provide/inject依赖注入`**:

> 在**`provide/inject依赖注入`**中父组件向后代组件通讯,如果说props是传递,逐级透传的,那么依赖注入更准确来说是在父组件中与后代组件共享数据,可实现**跨级共享**

<img src="https://cn.vuejs.org/assets/provide-inject.3e0505e4.png" alt="Provide/inject 模式" style="zoom:50%;" />

- provide: 提供

  > 父组件中注册,传递给后代组件的数据对象

- inject: 注入

  > 后代组件中接收父组件提供的数据对象

#### 2.2.1. **`provide/inject依赖注`:**组合式API +setup 语法糖代码实例:

```vue
//父组件 Root.vue---------------------------------------------------
<template>
  <div>
    <Footer/>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Footer from './Footer.vue' //导入子组件Footer
//父组件中注册给共享后代组件的信息
provide(/* 注入名 */ 'mgs', /* 值 */ '父组件信息!')  

</script>

//子组件 Footer.vue--------------------------------------------------
<template>
    <DeepChild/>
</template>
<script setup>
import DeepChild from './DeepChild.vue' //导入子组件Footer
//在子组件Footer中可以不需要接收父组件Root共享的数据,在后代组件中,直接接收,实现跨级传递
</script>

//子孙组件DeepChild.vue---------------------------------------------------
<template>
    <div>
        {{ msg }}
    </div>
</template>
<script setup>
import { inject } from 'vue'
const msg = inject('msg') //跨级接收祖先组件的共享的信息
console.log(msg) //父组件信息
</script>
```

通过`provide/inject依赖注`,父组件与后代组件无论嵌套多深,仅在需要的地方进行依赖注入即可在子孙组件中拿到父组件传递过来的信息,避免了`props逐级透传`的麻烦且不优雅的方式;









## 3.组件通讯的多种形式:

| 方式             | Vue2           | Vue3                 |
| ---------------- | -------------- | -------------------- |
| 父传子           | props          | props                |
| 父传子           | provide/inject | provide/inject       |
| 父子互相通讯     | v-mode/        | v-model/defineModel  |
| 父传子           | $attrs         | attrs                |
| 父组件访问子组件 | $children      | 无                   |
| 父组件访问子组件 | $ref           | expose&ref           |
| 子传父           | $emit          | emits                |
| 子传父           | $listeners     | 无(合并到 attrs方式) |
| 子组件访问父组件 | $parent        | 无                   |
| 兄弟传值         | EventBus       | mitt                 |

