UmiJs和dva、roadhog是什么关系？

- **roadhog** 是基于 webpack 的封装工具，目的是简化 webpack 的配置

- **dva** 目前是最纯粹的数据流，和 umi 和 roadhog 之间并没有相互的依赖关系，可以分开使用也可以一起使用。Model 是前端分层中的腰部力量，承上启下，负责管理数据（状态）。业界主流的状态管理类库有 [redux](https://redux.js.org/)、[mobx](https://mobx.js.org/intro/concepts.html)，等。在我们的教程中，则使用 [DVA](https://github.com/dvajs/dva) 框架承担这一角色。

- **umi** 可以简单地理解为 **roadhog + 路由**，思路类似 next.js/nuxt.js，辅以一套插件机制，目的是通过框架的方式简化 React 开发;  [umi](https://umijs.org/) 作为编译工具。其实 umi 不仅仅是一个编译工具，它同时也是一个前端框架。它对社区的 [webpack](https://webpack.js.org/)，[react-router](https://reacttraining.com/react-router/) 等进行的封装，使得我们可以基于它快速搭建一个 React 项目。

  

## dva数据流向

数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 `dispatch` 发起一个 action，如果是同步行为会直接通过 `Reducers` 改变 `State` ，如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State`，所以在 dva 中，数据流向非常清晰简明，并且思路基本跟开源社区保持一致（也是来自于开源社区）。

```react
app.model({
  namespace: 'todo',
  state: [],
  reducers: {
    add(state, { payload: todo }) {
      // 保存数据到 state
      return [...state, todo];
    },
  },
  effects: {
    *save({ payload: todo }, { put, call }) {
      // 调用 saveTodoToServer，成功后触发 `add` action 保存到 state
      yield call(saveTodoToServer, todo);
      yield put({ type: 'add', payload: todo });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'load' });
        }
      });
    },
  },
});
```

DVA 的 model 对象有几个基本的属性，需要大家了解。

1. `namespace`：model 的命名空间，只能用字符串。一个大型应用可能包含多个 model，通过`namespace`区分。

2. `state`：当前 model 状态的初始值，表示当前状态。

3. `reducers`：用于处理**同步操作**，可以修改 `state`，由 `action` 触发。reducer 是一个纯函数，它接受当前的 state 及一个 action 对象。action 对象里面可以包含数据体（payload）作为入参，需要返回一个新的 state。

4. `effects`：用于处理**异步操作**（例如：与服务端交互）和业务逻辑，也是由 action 触发。但是，它不可以修改 state，要通过触发 action 调用 reducer 实现对 state 的间接操作。

   （call异步请求数据，put用于触发 action 。）

5. `action`：是 reducers 及 effects 的触发器，一般是一个对象，形如`{ type: 'add', payload: todo }`，通过 type 属性可以匹配到具体某个 reducer 或者 effect，payload 属性则是数据体，用于传送给 reducer 或 effect。

( action.type 的构造是 `namespace 名称` + `/` + `reducer 名称`，
事实上 action.type 也可以是 `namespace 名称` + `/` + `effect 名`)

## onnect 方法

connect 是一个函数，绑定 State 到 View。

```js
import { connect } from 'dva';

function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
//connect(({todos})=>({todos: state.todos}))(App)
```

**connect 方法返回的也是一个 React 组件**，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。

connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于**建立 State 到 Props 的映射关系。**





### 截取官方文档：

[dva](http://dvajs.com/) 是一个基于 Redux 的 轻量级数据流方案，概念来自 elm，支持 side effects、热替换、动态加载、react-native、SSR 等，已在生产环境广泛应用。

[umi](http://umijs.org/) 则是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持[类 next.js 的约定式路由](https://umijs.org/zh/guide/router.html)，以及各种进阶的路由功能，并以此进行功能扩展，比如[支持路由级的按需加载](https://umijs.org/zh/plugin/umi-plugin-react.html#dynamicimport)。然后配以完善的[插件体系](https://umijs.org/zh/plugin/)，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求，同时提供 [Umi UI](https://umijs.org/zh/guide/umi-ui.html) 通过可视化辅助编程（VAP）提高开发体验和研发效率。



如果你熟悉 React 中最基本的两个概念 props 和 state，一定知道 props 和 state 对于一个组件来讲都是数据的来源，而 state 又可以通过 props 传递给子组件，这像是一个鸡生蛋蛋生鸡的问题：到底谁是数据的源头 ？答案是 state，而且是广义的 state：它可以是 react 组件树中各级组件的 state，也可以是 react 组件树外部由其他 js 数据结构表示的 state，而 dva 管理的就是[ react 组件树之外的 state: Redux](https://redux.js.org/)。归根结底，props 是用来传导数据的，而 state 是数据改变的源泉

