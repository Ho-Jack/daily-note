### 高阶函数

> 接收一个函数作为输入，或者输出另一个函数的类函数。

### 高阶组件HOC  (higher-order-component)

> 是一个函数，接收要包装的组件，返回增强后的组件

#### 使用步骤：

1、创建一个函数，名称约定以with开头

2、指定函数参数，参数应该以大写字母开头(作为要渲染的组件)

3、在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回

4、在函数内的类组件中，渲染参数组件，同时将状态通过prop传递给参数组件

5、调用该高阶组件，传入要增强的组件，通过返回值那到增强后的组件，并将其渲染到页面中

```react
function withMouse(WrappedComponent){
   class Mouse extends React.Component{
       //实现可复用的状态逻辑代码
       。。。。。
       //组件参数接收props
        return <WrappedComponent {...this.state} />
   }
    return Mouse
}
//创建一个函数子组件，作为高阶函数的参数，接收props	
const Position = props => {
  return (<div>
    <p>X是:{props.x}</p>
    <p>Y是:{props.y}</p>
  </div>)
}
 //实例化高阶组件，生成增强后的组件
const MousePosition = withMouse(Position)
//渲染组件
<MousePosition/>
```

总结：传如高阶组件函数的参数组件，作用主要是,用于接收props

#### 设置displayName

- 使用高阶组件存在的问题：得到两个相同名称的组件

- 原因：默认情况下，React使用组件名称作为displayName

- 解决：为高阶组件设置displayName 便于调试时区分不同组件

- displayName的作用：用域设置调试的信息（React Developer Tools信息）

- 设置方式：

  ```react
  //在高阶组件函数内
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent.name)}`
  
  //设置displayName的方法
  function  getDisplayName(WrappedComponent){
      return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }
  ```

#### 传递props

- 问题：参数组件中，props丢失

- 原因：高阶组件没用往下传递props

- 解决:  渲染WrappedComponent 时，将`this.state`和`this.props `一起传递给参数组件

  ```react
  <WrappedComponent {...this.state}   {...this.props}></WrappedComponent>
  ```



### 高阶组件的运用场景：

- 抽取重复代码，实现组件复用，常见场景：页面复用。
- 条件渲染，控制组件的渲染逻辑（渲染劫持），常见场景：权限控制。
- 捕获/劫持被处理组件的生命周期，常见场景：组件渲染性能追踪、日志打点。







```react
import React from "react";
import ReactDOM from "react-dom";
//从localstorage里面取值
function loadFromlocal(OldComponent, name) {
  //返回一个新组件
  return class extends React.Component {
    state = {value: null}
    componentDidMount() {
      let value = localStorage.getItem(name)
      this.setState({value})
    }
    render(){
      return <OldComponent value={this.state.value}/>
    }
  }
}
const UserName = (props) => {
  return <input defaultValue={props.value}/>
}
const Password = (props) => {
  return <input defaultValue={props.value}/>
}
let LocalUserName = loadFromlocal(UserName,'name')
let LocalPassword = loadFromlocal(Password,'password')

ReactDOM.render(<div>
  <LocalUserName/><br />
  <LocalPassword/>
</div>, document.getElementById("root"));
```

