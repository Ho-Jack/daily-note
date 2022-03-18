---
title: v-model 只是 vue 的一个语法糖 （Vue 是单项数据流）
date: 2020-05-21 11:42:26
tags: [Vue]
---



##   **v-model**   只是 vue 的一个语法糖 （**Vue 是单项数据流**）

### v-model指令实现了表单的双向绑定

```vue
<input type="text" v-model="message">
<p>{{message}}</p>
```

### v-model只是语法糖,原理实现：

```vue
<input type="text" :value="message" @input="message = $event.target.value">
//$event  访问原始的 DOM 事件
```

- 1、vue是单向数据流，`：value='message'`只是将input的value值绑定到message上，修改message影响输入框value值，但修改输入框值，并不会改变message值
- 2、通过监听输入框oninput事件，将输入值绑定到message值，从而实现双向绑定

### 原生简单实现v-model：

```html
<body>
    姓名：<span id="spanName"></span>
    <br>
    <input type="text" id="inpName">
</body>

<!-- IMPORT JS -->
<script>
    let obj = {
        name: ''
    };
    let newObj = {
        ...obj
    };
    //数据劫持
    Object.defineProperty(obj, 'name', {
        get() {
            return newObj.name;
        },
        set(val) {
            newObj.name = val;
            observe(); //在修改obj的name属性的时候，修改dom，达到双向绑定目的
        }
    });
    function observe() {
        spanName.innerHTML = newObj.name;
    }
    //监听输入框的oninput事件，将输入值赋值到ojb上(触发数据劫持效果)
    inpName.oninput = function () {
        obj.name = this.value;
    };
</script>
```





### 类似react中的 受控组件

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
> 允许一个自定义组件在使用 `v-model` 时定制 prop 和 event。默认情况下，一个组件上的 `v-model` 会把 `value` 用作 prop 且把 `oninput` 用作 event， 但是一些输入类型比如单选框和复选框按钮可能想使用 `value` prop 来达到不同的目的。使用 `model` 选项可以回避这些情况产生的冲突。
>
> v-model  = mode:{  prop:'  ',event:''}   

- 子组件

```vue

<template>
  <div>
    <input type="text" :value="message" @input="$emit("changeXXX", $event.target.value);" />
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
    <myInput :message='message' @changeXXX='message = arguments[0]' ></myInput>
  
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
  
  