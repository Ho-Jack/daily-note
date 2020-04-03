
#### React
##### React推荐使用jsx或者js文件来表示组件，react支持class组件和function组件2种形式，react使用{}包裹变量，这点需要注意。

（1）class组件
```
import React from 'react';

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'xx'
    };
  }
  render() {
    rerurn(<div>{name}</div>);
  }
}

export default NewComponent;
```

（2）function组件
hooks的出现赋予了function组件管理state的能力。
```
import React, { useState } from 'react';

function NewComponent() {
  const [name, setName] = useState('');
  return (<div>{name}</div>);
}

export default NewComponent;
```

####  props
>react中的props也与vue一样可以传递静态或动态props，静态props一般传递字符串。

(1)函数组件获取props(使用props参数获取父组件传下来的props)：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
```
(2)class组件使用this.props获取组件props：
```
class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name } = this.props;
    return <div>{name}</div>;
  }
}

```
动态props：
```
<Welcome name={name} />
```

#### state
> react中使用state来管理组件内的数据，hooks的出现使得函数组件也具备管理state的能力

(1)class组件state
> class组件在构造函数（constructor）中定义组件内数据（state），修改数据必须通过setState修改，不能直接修改state，这点非常重要。
```
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'xx'
    };
    this.changeName = this.changeName.bind(this);
  }

  changeName() {
    this.setState({
      name: 'new name'
    });
  }

  render() {
    const { name } = this.state;
    return <div onClick={this.changeName}>{name}</div>;
  }
}
```
关于class组建的setState有以下两点说明：

1.setState更新是异步的，但是在setTimeout和原生事件中是同步的。

2.setState更新的是组件的部分数据，react会自动将数据合并。

当需要使用上一个state值时，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
```
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

(2)function组件useState

react 16.0之前函数组件只是纯的渲染组件，hooks的出现赋予了函数组件管理state的能力。

useState返回一个state，以及更新state的函数。如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值

```
import React, { useState } from 'react';

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```
关于setState有以下三点说明：

1.与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。

2.只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

3.只能在 React 的函数组件或自定义hook中调用 Hook。不要在其他 JavaScript 函数中调用。



React State(状态)
this.state={ X:x }
this.setState({X:x})

React Props
> state  更新和修改数据（可以根据与用户交互来改变可以根据与用户交互来改变）
> props   传递数据
 
- defaultProps     组件名.defaultProps = {XX: 'xx'};
- propTypes        组件名.propTypes=     {XX:PropTypes.string.isRequired }
                  static propTypes =    {XX: PropTypes.string.isRequired   } 

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。
 React 默认提供的四个最常用的钩子。
- useState()      状态钩子          [xx,setXx]=useState('')     setXx('')
- useContext()    共享状态钩子    
- useReducer()    action 钩子
   const [state, dispatch] = useReducer(reducer, {xx:''});  // Reducer函数和状态的初始值作为参数
   const reducer=(state, action) => newState  // Reducer函数
- useEffect()   副作用钩子(最常见的就是向服务器请求数据)
     useEffect(()  =>  {// Async Action}, [dependencies])
       第一个参数是一个函数，异步操作的代码放在里面。
       第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，useEffect()就会执行。
ReactDOM.render(template,targetDOM)  渲染元素