众所周知，在组件式开发中，最大的痛点就在于组件之间的通信。在 Vue 中，Vue 提供了各种各样的组件通信方式，从基础的 props/$emit 到用于兄弟组件通信的 EventBus，再到用于全局数据管理的 Vuex。

在这么多的组件通信方式中，provide/inject 显得十分阿卡林（毫无存在感）。但是，其实 provide/inject 也有它们的用武之地。今天，我们就来聊聊 Vue 中 provide/inject 的应用。

### 何为 provide/inject

provide/inject 是 Vue 在 2.2.0 版本新增的 API，官网介绍如下：

> 这对选项需要一起使用，以允许一个祖先组件向其所有**子孙后代**注入一个依赖，**不论组件层次有多深**，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

### 解释：

- provide ：祖先组件，提供数据或方法
- inject：任何后代组件，接收数据或方法

举个官网的🌰：

```javascript
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```

可以看到，父组件提供的 foo 变量被子组件成功接收并使用。

了解了 provide/inject 是什么后，我们再来使用使用 provide/inject。

### 使用 provide/inject 做全局状态管理

在日常开发中，我们经常会使用 Vuex 做状态管理，但是，我个人一直不喜欢使用 Vuex，原因在于 Vuex 为了保持状态可被回溯追踪，使用起来太过繁琐；而我之前参与的项目，较少多人合作，这个功能对于我来说，意义不大，我仅仅只需要 Vuex 中提供全局状态的功能。

那么，有没有方便快捷的实现全局状态的方法呢？当然有，这就是 provide/inject 这个黑科技 API 的一种使用方法。

很多人也许会想到一种方式：在根组件中，传入变量，然后在后代组件中使用即可。

```vue
// 根组件提供一个非响应式变量给后代组件
export default {
  provide () {
    return {
      text: 'bar'
    }
  }
}

// 后代组件注入 'app'
<template>
	<div>{{this.text}}</div>
</template>
<script>
  export default {
    inject: ['text'],
    created() {
      this.text = 'baz' // 在模板中，依然显示 'bar'
    }
  }
</script>
```

这个想法，说对也对，说不对也不对，原因在于 provide 的特殊性。

在官网文档中关于 provide/inject 有这么一个提示：

> 提示：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

也就是说，Vue 不会对 provide 中的变量进行响应式处理。所以，要想 inject 接受的变量是响应式的，provide 提供的变量本身就需要是响应式的。

由于组件内部的各种状态就是可响应的，所以我们直接在根组件中将组件本身注入 provide，此时，我们可以在后代组件中任意访问根组件中的所有状态，根组件就成为了全局状态的容器，仔细想想，是不是很像 React 中的 context 呢？

代码如下：

```javascript
// 根组件提供将自身提供给后代组件
export default {
  provide () {
    return {
      app: this
    }
  },
  data () {
    return {
      text: 'bar'
    }
  }
}

// 后代组件注入 'app'
<template>
	<div>{{this.app.text}}</div>
</template>
<script>
  export default {
    inject: ['app'],
    created() {
      this.app.text = 'baz' // 在模板中，显示 'baz'
    }
  }
</script>	
```

也许有的同学会问：使用 $root 依然能够取到根节点，那么我们何必使用 provide/inject 呢？

在实际开发中，一个项目常常有多人开发，每个人有可能需要不同的全局变量，如果所有人的全局变量都统一定义在根组件，势必会引起变量冲突等问题。

使用 provide/inject 不同模块的入口组件传给各自的后代组件可以完美的解决该问题。

### 慎用 provide/inject

既然 provide/inject 如此好用，那么，为什么 Vue 官方还要推荐我们使用 Vuex，而不是用原生的 API 呢？

我在前面提到过，Vuex 和 provide/inject 最大的区别在于，Vuex 中的全局状态的每次修改是可以追踪回溯的，而 provide/inject 中变量的修改是无法控制的，换句话说，你不知道是哪个组件修改了这个全局状态。

Vue 的设计理念借鉴了 React 中的单向数据流原则（虽然有 sync 这种破坏单向数据流的家伙），而 provide/inject 明显破坏了单向数据流原则。试想，如果有多个后代组件同时依赖于一个祖先组件提供的状态，那么只要有一个组件修改了该状态，那么所有组件都会受到影响。这一方面增加了耦合度，另一方面，使得数据变化不可控。如果在多人协作开发中，这将成为一个噩梦。

在这里，我总结了两条条使用 provide/inject 做全局状态管理的原则：

1. 多人协作时，做好作用域隔离
2. 尽量使用一次性数据作为全局状态

看起来，使用 provide/inject 做全局状态管理好像很危险，那么有没有 provide/inject 更好的使用方式呢？当然有，那就是使用 provide/inject 编写组件。

### 使用 provide/inject 编写组件

使用 provide/inject 做组件开发，是 Vue 官方文档中提倡的一种做法。

以我比较熟悉的 elementUI 来举例：

在 elementUI 中有 Button（按钮）组件，当在 Form（表单）组件中使用时，它的尺寸会同时受到外层的 FormItem 组件以及更外层的 Form 组件中的 size 属性的影响。

如果是常规方案，我们可以通过 props 从 Form 开始，一层层往下传递属性值。看起来只需要传递传递两层即可，还可以接受。但是，Form 的下一层组件不一定是 FormItem，FormItem 的下一层组件不一定是 Button，它们之间还可以嵌套其他组件，也就是说，层级关系不确定。如果使用 props，我们写的组件会出现强耦合的情况。

**provide/inject 可以完美的解决这个问题，只需要向后代注入组件本身（上下文），后代组件中可以无视层级任意访问祖先组件中的状态。**

部分源码如下：

```javascript
// Button 组件核心源码
export default {
    name: 'ElButton',
    // 通过 inject 获取 elForm 以及 elFormItem 这两个组件
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    // ...
    computed: {
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        buttonSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        },
        //...
    },
    // ...
};
```

### 总结

其实在 Vue 的学习中，遵循着二八法则，我们常用的 20% 的 API 就能解决大部分日常问题，剩余的 API 感觉用处不大。但是，抽点时间去了解那些冷门的 API，也许你能发现一些不一般的风景，令你在解决一些问题时，事半功倍。


作者：格子熊
链接：https://juejin.cn/post/6844903989935341581
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。