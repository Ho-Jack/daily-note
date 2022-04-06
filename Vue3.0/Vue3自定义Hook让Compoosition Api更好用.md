## Vue3自定义Hooks让Compoosition Api更好用

> hook:  直译[hʊk] 钩子
>
> Hooks其实在前端领域没有明确定义，借用知乎大佬的定义：在js里是callback,事件驱动，集成定义一些**可复用的方法**
>
> 个人理解：一些**可复用的方法**像钩子一样挂着，随时可以引入和调用实现**高内聚低耦合**的目标，应该都能算是hook；Vue3官方文档一圈看下来其实是没有明确说明什么是Hooks但是却在使用 （[飞机](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E7%8B%AC%E7%AB%8B%E7%9A%84-computed-%E5%B1%9E%E6%80%A7)）

### 为什么Vue3要用自定义Hook？：

这个问题更深意义是为什么Vue3比Vue2更好！我相信很多同学已经看过别的文章讲过：无外呼**性能大幅度提升**，其实编码体验也是Vue3的优点**`Compoosition Api`的引入（解决Option Api在代码量大的情况下的强耦合）**让开发者有更好的开发体验。

个人碎碎念：但是这些所谓的提高开发体验都是需要开发者不断学习养成编码好习惯，同样是Vue3写Compoosition Api有的人就能写得和诗一样，有的人却能写得像shite一样（衷心希望每个开发者都有一颗对技术热衷的心，不要为了开发而开发，前人写翔让后人尝！抱歉最近因为维护老项目太多感慨）

#### 写Vue3请摆脱Vue2无脑this的思想：

> 很多同学养成了写Vue2中 `Option Api`无脑this的习惯，来到`Vue3`的`Composition Api`还是习惯性想用this，更有人为了写this不惜引入`getCurrentInstance`!这大可不必！

`Composition Api `的优点之一就是**摆脱无脑this导致的强耦合**，功能之间互相this，变量和方法在各个方法混杂。

我相信写`Vue2`的同学，一定深有感触，一个组件下定义大量变和大量方法，**方法嵌套方法，方法之间互相共享变量**，维护这样的代码，看似容易理解的`Option Api`写法，我们需要在`methos、data、template`之间来回切，`Option Api`这种写法，代码量和功能小巧时是十分简单明了的，但是代码量一多，功能一复杂，我相信review代码的时候头都痛。

相对的`Composition Api`在功能复杂、代码量巨大的组件下，我们配合自定义Hooks，将代码通过**功能分块写**，**响应变量和方法在一起定义和调用**，这样后期我们改功能A只需要关注功能A块下的代码，不会像Vue2在`Option Api`需要同时关注methos和data。



#### 几张动图再来复习一遍**`Composition Api` 好！**

> 谢谢 [`大帅老猿`](https://juejin.cn/post/6890545920883032071) 老师做的动图，`Composition Api VS Option Api` 的优缺点十分明了展示在了动画上！

##### `Option Api`代码量少还好，代码量多容易导致高耦合！

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bd101840df446c78d52e9c14711aae7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/568b0ced69f241d282cf2c512e4e5f33~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

说明：上面是`Vue2 Option Api `的写法，一个组件下含有`data 、methos、computed、watch`，同一个功能需要分开写在这些函数上，如果代码量少，那看起来似乎十分明了清晰。一旦代码量大功能复杂，各个功能分开写，维护的时候`data 、methos、computed、watch`都需要来回切，反而显得**过于分散，又高度耦合**。



##### `Composition Api `解耦`Vue2 Option Api `实现低耦合高内聚

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d05799744a6341fd908ec03e5916d7b6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

说明：如果是`Composition Api`在功能复杂、代码量巨大的组件下，我们配合**自定义Hook**，将代码**按功能分块写，变量和方法在一起定义和调用**，比如A功能下集成了响应式变量和方法，我们后期维护只需要改动A功能模块下的代码，不会像Vue2在`Option Api`需要同时关注逻辑分散的methos和data。

所以**自定义Hook的写Vue3必须掌握的！它无不体现Vue3 Composition Api 低耦合高内聚的思想！**笔者在看了官方文档和开源的admin模板都是大量使用自定义Hooks的！



### 大胆定义一下Vue3的自定义Hook： 

> 虽然官方没有明确指明或定义什么是自定义Hooks，但是却无处不在用；
>
> 以函数形式抽离一些**可复用的方法**像钩子一样挂着，随时可以引入和调用，实现**高内聚低耦合**的目标；

1. 将可复用功能抽离为外部JS文件

2. 函数名/文件名以use开头，形如：useXX

3. 引用时将响应式变量或者方法显式暴露出来如：` const {nameRef，Fn} = useXX()`   

    （在setup函数解构出自定义hooks的变量和方法）

### 实例：

> 简单的加减法计算，将加法和减法抽离为2个自定义Hooks，并且相互传递响应式数据

- 加法功能-Hook

```javascript
import { ref, watch } from 'vue';
const useAdd= ({ num1, num2 })  =>{
    const addNum = ref(0)
    watch([num1, num2], ([num1, num2]) => {
        addFn(num1, num2)
    })
    const addFn = (num1, num2) => {
        addNum.value = num1 + num2
    }
    return {
        addNum,
        addFn
    }
}
export default useAdd
```

- 减法功能-Hook

```javascript
//减法功能-Hook
import { ref, watch } from 'vue';
export function useSub  ({ num1, num2 }){
    const subNum = ref(0)
    watch([num1, num2], ([num1, num2]) => {
        subFn(num1, num2)
    })
    const subFn = (num1, num2) => {
        subNum.value = num1 - num2
    }
    return {
        subNum,
        subFn
    }
}
```

- 加减法计算组件

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
const { addNum, addFn } = useAdd({ num1, num2 })
addFn(num1.value, num2.value)
//减法功能-自定义Hook (将响应式变量或者方法形式暴露出来)
const { subNum, subFn } = useSub({ num1, num2 })
subFn(num1.value, num2.value)
</script>

```

### 通过上述示例再来说说Vue3自定义Hooks和Vue2时代Mixin的关系：

```
Mixin不足
在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：
1、Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性。
2、可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。
```

上面这段是Vue3官方文档的内容，可以概括和补充为：

#### 1、Mixin难以追溯的方法与属性！Vue3自定义Hooks却可以

> Vue3自定义Hooks, 引用时将响应式变量或者方法显式暴露出来如：` const {nameRef，Fn} = useXX()`   

- Mixins

  ```javascript
  export default {
    mixins: [ a, b, c, d, e, f, g ], //一个组件内可以混入各种功能的Mixin
    mounted() {
      console.log(this.name)  //问题来了，这个name是来自于哪个mixin？
    }
  }
  ```

  Mixin不明的混淆，我们根本无法获知属性来自于哪个Mixin文件，给后期维护带来困难

- Vue3自定义Hooks

  ```javascript
  //加法功能-自定义Hook（将响应式变量或者方法形式暴露出来）
  const { addNum, addFn } = useAdd({ num1, num2 })
  addFn(num1.value, num2.value)
  //减法功能-自定义Hook (将响应式变量或者方法形式暴露出来)
  const { subNum, subFn } = useSub({ num1, num2 })
  subFn(num1.value, num2.value)
  ```

  我们很容易看出每个Hooks显式暴露出来的响应式变量和方法



#### 2、无法向Mixin传递参数来改变逻辑，但是Vue3自定义Hooks却可以：

> Vue3自定义Hooks可以灵活传递任何参数来改变它的逻辑，参数不限于其他hook的暴露出来的变量

- Mixins

```javascript
export default {
  mixins: [ addMixin, subMixin], //组件内混入加法和减法Mixin
  mounted(){
      this.add(num1,num2) //调用addMixin内部的add方法
      this.sub(num1,num2) //调用subMixin内部的sub方法
  }  
}
```

可以通过调用Mixin内部方法来传递参数，却无法直接给Mixin传递参数，因为Mixin不是函数形式暴露的，不发传参

- Vue3自定义Hook

  > 在上面实例基础上添加个算平均的Hook

  ```javascript
  //平均功能-Hook
  import { ref, watch } from "vue";
  export function useAverage(addNum) {
    const averageNum = ref(0);
    watch(addNum, (addNum) => {
      averageFn(addNum);
    });
    const averageFn = (addNum) => {
      averageNum.value = addNum / 2;
    };
    return {
      averageNum,
      averageFn,
    };
  }
  ```

  组件内

  ```javascript
  //组件内
  //加法功能-自定义Hook（将响应式变量或者方法形式暴露出来）
  const { addNum, addFn } = useAdd({ num1, num2 })
  addFn(num1.value, num2.value)//主动调用，返回最新addNum
  //平均功能-自定义Hook- hook传入参数值来其他hook暴露出来的变量
  const { averageNum, averageFn} = useAverage(addNum)
  averageFn(addNum.value)
  ```

  Vue3自定义Hooks可以灵活传递任何参数来改变它的逻辑，参数不限于其他hook的暴露出来的变量，这提高了Vue3在抽象逻辑方面的灵活性。

#### 3、Mixin同名变量会被覆盖，Vue3自定义Hook可以在引入的时候对同名变量重命名

- Mixins

  ```javascript
  export default {
    mixins: [ addMixin, subMixin], //组件内混入加法和减法Mixin
    mounted(){
        this.add(num1,num2) //调用加法addMixin内部的add方法
        this.sub(num1,num2) //调用减法subMixin内部的sub方法
    }  
  }
  ```

  如果`this.add(num1,num2)`和 `this.sub(num1,num2)` 计算的结果返回的同名变量totalNum，由于JS单线程，后面引入的会覆盖前面的，totalNum最终是减法sub的值

  

- Vue3自定义Hooks

  ```javascript
  //加法功能-自定义Hook（将响应式变量或者方法形式暴露出来）
  const { totalNum:addNum, addFn } = useAdd({ num1, num2 })
  addFn(num1.value, num2.value)
  //减法功能-自定义Hook (将响应式变量或者方法形式暴露出来)
  const { totalNum:subNum, subFn } = useSub({ num1, num2 })
  subFn(num1.value, num2.value)
  ```

  在Vue3自定义Hooks中，虽然加法和减法Hooks都返回了totalNum，但是利用ES6对象解构很轻松给变量重命名

### 总结：

Vue2时代`Option Api ，data、methos、watch.....`分开写，这种是**碎片化**的分散的，代码一多就容易**高耦合**，维护时来回切换代码是繁琐的！

Vue3时代`Composition Api`，通过利用各种Hooks和自定义Hooks将碎片化的响应式变量和方法**按功能分块写**，实现**高内聚低耦合**

形象的讲法：Vue3自定义Hooks是组件下的函数作用域的，而Vue2时代的Mixins是组件下的全局作用域。全局作用域有时候是不可控的，就像var和let这些变量声明关键字一样，const和let是var的修正。Composition Api正是对Vue2时代Option Api 高耦合和随处可见this的黑盒的修正，Vue3自定义Hooks是一种进步。

把Mixin和自定义Hook进行比较，一个是Option Api的体现，一个是Composition Api的体现。如果能理解**高内聚低耦合**的思想，那么就能理解为什么Vue3是使用Composition Api，并通过各种自定义Hooks使代码更强壮。像写诗一样写代码。而不是写屎。



最后再次感谢  [`大帅老猿`](https://juejin.cn/post/6890545920883032071) 老师做的动图！

如果觉得讲得还行，不吝啬点个赞再走!