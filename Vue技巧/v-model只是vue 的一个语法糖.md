---
title: v-model 只是 vue 的一个语法糖 （Vue 是单项数据流）
date: 2020-05-21 11:42:26
tags: [Vue]
---





##   **v-model**   只是 vue 的一个语法糖 （**Vue 是单项数据流**）

-  vue中的v-model指令实现了表单的双向绑定

```vue
<input type="text" v-model="message">
<p>{{message}}</p>
```

- v-model只是语法糖，真正的实现形式：

```vue
<input type="text" :value="message" @input="message = $event.target.value">
//$event  访问原始的 DOM 事件
```

> 1.将输入框的值绑定到message变量上，这只是单向的，改变message的值可以改变input的value，但是改变input的输入不会改变message。
>
> 2.监听input事件，当输入类内容时改变message变量，从而实现了双向绑定。



类似react中的 受控组件

```react
<input type="text"  value={this.state.message} 
    onChange={e=>{this.setState({message:e.target.value})}} ></input>
```

> 从官网上看到，v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：
> - text和textarea元素使用value属性和input事件
> - checkbox和radio使用checked属性和change事件
> - select使用value和change事件



###  进阶！！！

> ### model
> { prop?: string, event?: string }
>
> 允许一个自定义组件在使用 `v-model` 时定制 prop 和 event。默认情况下，一个组件上的 `v-model` 会把 `value` 用作 prop 且把 `input` 用作 event， 但是一些输入类型比如单选框和复选框按钮可能想使用 `value` prop 来达到不同的目的。使用 `model` 选项可以回避这些情况产生的冲突。
>
> v-model  = mode:{  prop:'  ',event:''}   

- 子组件

```vue

<template>
  <div>
    <input type="text" :value="message" @input="updateVal($event.target.value)" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  model: {
    prop: "message",
    // 随便命名事件，对应下面$emit即可
    event: "changeXXX"
  },
  props: {
    message: {
      type: String,
      default: "tom"
    }
  },
  methods: {
    updateVal(val) {
      this.$emit("changeXXX", val);
    }
  }
};
</script>

```



- 父组件

  ```vue
  
  <template>
    <div>
      <!-- <input  type="text" v-model="message"/> <br/> -->
      <!-- <input  type="text" :value="message" @input="message =  $event.target.value "/> -->
     <myInput v-model="message"></myInput>
    <myInput :message='message' @changeXXX='val => {message = val}' ></myInput>
      <p>{{message}}</p>
    </div>
  </template>
  
  <script>
  import myInput from './components/demo'
  export default {
    data () {
      return {
        message:''
      };
    },
    components: {myInput},
    methods: {}
  }
  
  </script>
  
  ```

  