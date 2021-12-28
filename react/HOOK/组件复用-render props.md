## React组件复用-render props

> 这种方式并不是react新的api，而是利用react自身提点的编码技巧的一种开发模式（设计模式)
>
> 如果一个组件不知道自己渲染什么东西，或者说一个组件的基础功能是提供”可变数据源“，**具体展示UI可以从外部(父组件)注入到子组件中**，那么就可以用这个技术了。
>
> 类似Vue中的slot插槽思想

### 思路：

> 将UI，封装到父组件的一个函数中，并作为子组件的props传递，在子组件中接收props函数并渲染（render props），最终传递state到该函数中

- 1、在子组件中，复用state（获取state和操作state）

- 2、在子组件中，将要复用的状态，作为`props.render(state)`方法的参数，暴露到组件外部

  ​     在父组件中，在使用组件时，添加一个`render`函数作为组件的props的值，通过函数来获取state（需要组件内部实现）

- 3、渲染任意UI ，在`子组件`中使用`props.render()`的返回值作为要渲染的内容

  使用props传递过来的函数的返回值，作为要渲染的UI内容（需要组件内部实现）

父组件：

> 使用复用的state状态来渲染UI
>
> render这个props是一个函数

```react
// 2-2在使用组件时，添加一个`render`函数作为组件的props的值，通过函数来获取state（需要组件内部实现）
// 3、渲染任意UI ，在`子组件`中使用`props.render()`的返回值作为要渲染的内容
<Mouse render={
    (mouse) => {
      return (<div>
        <p>X是:{mouse.x}</p>
        <p>Y是:{mouse.y}</p>
      </div>)
    }
  }></Mouse>
```

子组件：

> 封装复用的状态逻辑代码(1、复用state状态 2、操作state的方法)

```react
class Mouse extend React.Component{
  //state和操作state的方法
 constructor(props) {
    super(props);
    this.state = {
      x: '',
      y: ''
    };
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove)
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove)
  }
  onMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  render () {
       //1、在子组件中，复用state（获取state和操作state）
      // 2-1、在子组件中将要复用的状态，作为`props.render(state)`方法的参数，暴露到组件外部(父组件)
       // render={
       //    (mouse) => {
       //       return (<div>
       //        <p>X是:{mouse.x}</p>
       //        <p>Y是:{mouse.y}</p>
       //      </div>) 
       //    }
      return this.props.render(this.state)
  }
}
```

总结：类似vue子组件向父组件通讯的$emit

###  props.children方式实现 （推荐）

父组件

```react
  <Mouse>
    {
      mouse => {
        return (<div>
          <p>X是:{mouse.x}</p>
          <p>Y是:{mouse.y}</p>
        </div>)
      }
    }
  </Mouse >
```

子组件：

```react
class Mouse extend React.Component{
  render () {
      return (<div>
               { this.props.children(this.state)}
          </div>
      )
  }
}
```

