

> 很多同学写习惯了Vue2中`Option Api`无脑this的习惯，来到`Vue3`的`Composition Api`还是习惯性想用this，这大可不必！
>
> 因为`Composition Api `的优点之一就是摆脱无脑this导致的强耦合，功能之间互相this，变量和方法在各个方法混杂，我相信写`Vue2`的同学，深有感触，一个组件下定义大量变和大量方法，方法嵌套方法，方法之间互相共享变量，维护这样的代码，看似容易理解的`Option Api`写法，我们需要在`methos、data、template`之间来回切，`Option Api`这种写法，代码量和功能小巧的是十分简单明了的，但是代码量一多，功能一复杂，我相信review代码的时候头都痛。相对的如果是`Composition Api`在功能复杂、代码量巨大的组件下，我们配合自定义Hook，将代码通过功能分块写，变量和方法在一起定义和调用，这样后期我们改功能A只需要关注功能A块下的代码，不会像Vue2在`Option Api`需要同时关注methos和data。

### Composition Api 好！

> 谢谢 [`大帅老猿`](https://juejin.cn/post/6890545920883032071) 老师做的动图，`Composition Api VS Option Api` 的优缺点十分明了展示了

#### `Option Api`代码量少好，代码量多容易导致高耦合！

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bd101840df446c78d52e9c14711aae7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/568b0ced69f241d282cf2c512e4e5f33~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

说明：这是`Vue2 Option Api `的写法，一个组件下含有`data 、methos、computed、watch`，同一个功能需要分开写在这些函数上，如果代码量少，那看起来似乎十分明了清晰。一旦代码量大功能复杂，各个功能分开写，维护的时候`data 、methos、computed、watch`都需要来回切，反而显得过于分散。

#### `Composition Api `解耦`Vue2 Option Api `实现低耦合

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d05799744a6341fd908ec03e5916d7b6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

说明：如果是`Composition Api`在功能复杂、代码量巨大的组件下，我们配合自定义Hook，将代码通过功能分块写，变量和方法在一起定义和调用，这样后期我们改功能A只需要关注功能A块下的代码，不会像Vue2在`Option Api`需要同时关注methos和data。

## `getCurrentInstance`

`getCurrentInstance` 支持访问内部组件实例。

`getCurrentInstance` 只暴露给高阶使用场景，典型的比如在库中。强烈反对在应用的代码中使用 `getCurrentInstance`。请**不要**把它当作在组合式 API 中获取 `this` 的替代方案来使用。

```ts
import { getCurrentInstance } from 'vue'

const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance()

    internalInstance.appContext.config.globalProperties // 访问 globalProperties
  }
}
```



`getCurrentInstance` **只能**在 [setup](https://v3.cn.vuejs.org/api/composition-api.html#setup) 或[生命周期钩子](https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子)中调用。

> 如需在 [setup](https://v3.cn.vuejs.org/api/composition-api.html#setup) 或[生命周期钩子](https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子)外使用，请先在 `setup` 中调用 `getCurrentInstance()` 获取该实例然后再使用。

```ts
const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance() // 有效

    const id = useComponentId() // 有效

    const handleClick = () => {
      getCurrentInstance() // 无效
      useComponentId() // 无效

      internalInstance // 有效
    }

    onMounted(() => {
      getCurrentInstance() // 有效
    })

    return () =>
      h(
        'button',
        {
          onClick: handleClick
        },
        `uid: ${id}`
      )
  }
}

// 在组合式函数中调用也可以正常执行
function useComponentId() {
  return getCurrentInstance().uid
}
```