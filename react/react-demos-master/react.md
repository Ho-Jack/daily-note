##  React

### React生命周期分类

### Mount  挂载

- constructor()      加载的时候调用一次，始化state,接受两个参数：props和context
- ~~componentWillMount()    在render方法之前执行~~ (V16.4移除)    UNSAFE_componentWillMount()
- render()              挂载渲染组件
- componentDidMount()    组件第一次渲染已完成，此时Dom节点已经生成，可在这调用ajax请求，返回数据setState后组件会重新渲染

### Update 更新

- getDerivedStateFromProps()   （v16.4新增）
> 根据当前的props来更新组件的state,每个render都会调用此方法 (触发一些回调，如动画或页面跳转等)

- shouldComponentUpdate()   
> 组件接收新的props或state时调用，return true 就会更新dom， return false就能阻止更新，主要用于性能优化(部分更新)

- ~~componentWillUpdate(object nextProps, object nextState)~~~~ (V16.4移除) UNSAFE_componentWillUpdate()

- getSnapshotBeforeUpdate() （v16.4新增）
>  在元素被渲染并写入DOM之前调用，使得组件能在发生更改之前从 DOM 中捕获一些信息，此生命周期的任何返回值将作为参数传递给 componentDidUpdate()
>   (想获得聊天窗口中的滚动位置，可以通过这个方法获取信息)

- render()
> 重新挂载(渲染)组件 (创建虚拟dom,进行diff算法，更新dom树都在此进行)

- componentDidUpdate()

> 会在更新(dom已经更新)后会被立即调用，首次渲染不会执行此方法(可以在这里获取dom)

### Unmount  卸载

- componentWillUnmount()

> 当组件要被从界面上移除的时候，就会调用。在这个函数中，可以做一些组件相关的清理工作
>  (取消计时器、网络请求等)

##### 组件的生命周期分成三个状态：

- Mounting：挂载 已插入真实 DOM

-  Updating：更新 正在被重新渲染

- Unmounting：卸载 已移出真实 DOM 

  ​     

##### React 为每个状态都提供了两种处理函数:

- will 函数在进入状态之前调用，

-  did 函数在进入状态之后调用，三种状态共计五种处理函数。

     ~~componentWillMount()    在render方法之前执行~~ (V16.4移除)    UNSAFE_componentWillMount()

     componentDidMount()     在render方法之后执行

     ~~componentWillUpdate(object nextProps, object nextState)~~ (V16.4移除) UNSAFE_componentWillUpdate()

     componentDidUpdate(object prevProps, object prevState)

     componentWillUnmount()    组件的卸载

此外，React 还提供两种特殊状态的处理函数。

~~componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用~~(V16.4移除)  UNSAFE_componentWillReceiveProps()

shouldComponentUpdate(object nextProps, object nextState)：组件接收新的props或state时调用,return true 就会更新dom， return false就能阻止更新(主要用于性能优化,组件判断是否重新渲染时调用)

```react
import React from 'react';
class Father extends React.Component{
    static defaultProps = {name:"Fan"} // 默认属性
    constructor(props){
        super(props)
        console.log("cinstructor") // 1
        this.state = {number:0} 
    }
    UNSAFE_componentWillMount(){
        console.log("Father: UNSAFE_componentWillMount") //2
    }
    shouldComponentUpdate(nextProps,nextState){
   
        console.log("Father: shouldComponentUpdate") // 2-1
        // if(nextState.number%2 === 0){
        //     return true
        // }else{
        //     return false;
        // }
        return true;
    }
    componentWillUpdate(){
        console.log("Father: componentWillUpdate") // 2-2
    }
    UNSAFE_componentWillUpdate(){
        console.log("Father: UNSAFE_componentWillUpdate") // 2-2
    }
    componentDidUpdate(){
        console.log("Father: componentDidUpdate") 
    }
    handleClick = ()=>{
        this.setState({number:this.state.number+1})
    }
    render(){
        console.log("Father: render")  // 3       2-3
        return(
            <div>
                <h1>父组件</h1>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
                <hr/>
             {/*   影响多次渲染 */}
                {this.state.number%2===0 ? <Son number={this.state.number}></Son> : null}  
            </div>
        )
    }
    componentDidMount(){
        console.log("Father: componentDidMount") // 7    2-7
    }
}

class Son extends React.Component{
    UNSAFE_componentWillMount(){
        console.log("Son: UNSAFE_componentWillMount") // 4    2-4
    }
    componentDidMount(){
        console.log("Son: componentDidMount") //6     2-6
    }
    componentWillReceiveProps(){
        console.log("Son: componentWillReceiveProps")
    }
    shouldComponentUpdate(){
        console.log("Son: shouldComponentUpdate")
        // return false;
        return true;
    }
    componentWillUpdate(){
        console.log("Son: componentWillUpdate") //    
    }
    componentDidUpdate(){
        console.log("Son: componentDidUpdate") 
    }
    render(){
        console.log("Son: render")    //5   2-5
        return(
            <div>
                <h1>子组件</h1>
                <p>{this.props.number}</p>
            </div>
        )
    }
    componentWillUnmount(){
        console.log("Son: componentWillUnmount") 
    }
}
export default Father;
```









##### React推荐使用jsx或者js文件来表示组件，react支持class组件和function组件2种形式，react使用{}包裹变量，这点需要注意。

- React 一直都提倡使用**函数组件**，但是有时候需要使用 state 或者其他一些功能时，只能使用**类组件**，因为函数组件没有实例，没有生命周期函数，只有类组件才有,所以才有 **Hooks** ,让你在不编写 class 的情况下使用 state 以及其他的 React 特性

#### （1）class组件

```
import React from 'react';

 export default class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'xx'
    };
    this.handleClick = this.handleClick.bind(this);
  }
   handleClick() {
        this.setState({
            num: this.state.num + 1,
        })
    }
  render() {
    rerurn(<div onclick=this.handleClick>{name}</div>);
  }
}

// export default NewComponent;
```

### 类组件的不足

- **状态逻辑难复用：** 在组件之间复用状态逻辑很难，可能要用到 **render props** （**渲染属性**）或者 **HOC**（**高阶组件**），但无论是渲染属性，还是高阶组件，都会在原先的组件外包裹一层父容器（一般都是 div 元素），**导致层级冗余**

- 趋向复杂难以维护：

  - 在生命周期函数中混杂不相干的逻辑（如：在 `componentDidMount` 中注册事件以及其他的逻辑，在 `componentWillUnmount` 中卸载事件，这样分散不集中的写法，很容易写出 bug ）
  - 类组件中到处都是对状态的访问和处理，导致组件难以拆分成更小的组件

- this 指向问题

  - 父组件给子组件传递函数时，必须绑定 this 

  

#### （2）function组件
hooks的出现赋予了function组件管理state的能力。

```
import React, { useState } from 'react';

export default function NewComponent() {
  const [name, setName] = useState('');
  return (<div>{name}</div>);
}

//export default NewComponent;
```






###  **props**
>react中的props也与vue一样可以传递静态或动态props，静态props一般传递字符串。

> state  更新和修改数据（可以根据与用户交互来改变可以根据与用户交互来改变）
> props   传递数据

- defaultProps     组件名.defaultProps = {XX: 'xx'};   

  ​                          **static** defaultProps ={XX: 'xx'};

- propTypes        组件名.propTypes=     {XX:PropTypes.string.isRequired }
                           static propTypes =    {XX: PropTypes.string.isRequired   } 

(1)函数组件获取props(使用props参数获取父组件传下来的props)：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
静态props：

```js
const element = <Welcome name="Sara" />;
```



(2)class组件使用this.props获取组件props：

```js
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
```html
<Welcome name={name} />
```



## React State(状态)

> - class组件使用state来管理组件内的数据
>        this.state={ X:x }
>       this.setState({X:x})
>
> - hooks的出现使得函数组件也具备管理state的能力
>
>      useState

(1)class组件state
> class组件在构造函数（constructor）中定义组件内数据（state），修改数据必须通过setState修改，不能直接修改state，这点非常重要。
```js
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
```js
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

(2)function组件useState

react 16.0之前函数组件只是纯的渲染组件，hooks的出现赋予了函数组件管理state的能力。

useState返回一个state，以及更新state的函数。如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值

```js
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

### 每次渲染都是独立的闭包

> 闭包作用： 
>
> - 读取函数内部的变量
> - 使这些变量常驻内存（延长外部函数局部变量的生命周期）
>
> 缺点：
>
> - 常驻内存，增加内存使用量。
> - 使用不当会很容易造成内存泄露。

- 每一次渲染都有它自己的 Props 和 State
- 每一次渲染都有它自己的事件处理函数
- 当点击更新状态的时候，函数组件都会重新被调用，那么每次渲染都是独立的，取到的值不会受后面操作的影响

```js
function Counter2(){
  let [number,setNumber] = useState(0);
  function alertNumber(){
    setTimeout(()=>{
      // alert 只能获取到点击按钮时的那个状态
      alert(number);
    },3000);
  }
  return (
      <>
          <p>{number}</p>
          <button onClick={()=>setNumber(number+1)}>+</button>
          <button onClick={alertNumber}>alertNumber</button>
      </>
  )
}
```

### 惰性初始化 state

- **initialState 参数只会在组件的初始化渲染中起作用，后续渲染时会被忽略**
- **如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用**

```js
function Counter5(props){
    console.log('Counter5 render');
    // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
    function getInitState(){
        return {number:props.number};
    }
    let [counter,setCounter] = useState(getInitState);
    return (
        <>
           <p>{counter.number}</p>
           <button onClick={()=>setCounter({number:counter.number+1})}>+</button>
           <button onClick={()=>setCounter(counter)}>setCounter</button>
        </>
    )
}
```











React State(状态)
this.state={ X:x }
this.setState({X:x})

React Props
> state  更新和修改数据（可以根据与用户交互来改变可以根据与用户交互来改变）
> props   传递数据

- defaultProps     组件名.defaultProps = {XX: 'xx'};
- propTypes        组件名.propTypes=     {XX:PropTypes.string.isRequired }
                  static propTypes =    {XX: PropTypes.string.isRequired   } 



## React Hooks 

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。
 React 默认提供的四个最常用的钩子。

- useState()      状态钩子(useState返回一个数组：一个 state，一个更新 state 的函数)
                       
                            ```react
         [xx,setXx]=useState('')    
         setXx('')
                            ```
      
- useReducer()    action 钩子
  
     ```react
   const [state, dispatch] = useReducer(reducer, {xx:''});  // Reducer函数和状态的初始值作为参数
      const reducer=(state, action) => newState  // Reducer函数
    调度函数: dispatch(action)  
     ```
  
  
  
   
  
- useContext()    共享状态钩子        context （上下文）

     ```react
     import React, { useContext } from "react";
     import ReactDOM from "react-dom";
     import "./styles.css";
     //第一步： 组件外部建立一个 Context
     const Context = React.createContext({});
     
     const A = () => {
         //第三步：useContext()钩子函数用来引入 Context 对象，从中获取username属性
       const { username } = useContext(Context)
       return (
         <div >
           <p>AAAA</p>
           <p>{username}</p>
         </div>
       )
     }
     const B = () => {
          //第三步：useContext()钩子函数用来引入 Context 对象，从中获取username属性
       const { username } = useContext(Context)
       return (
         <div >
           <h1>BBBB</h1>
           <p>{username}</p>
           <p >冲冲!</p>
         </div>
       )
     }
     
     function App() {
       return (
           //第二步：XX.Provider提供了一个 Context 对象，这个对象可以被子组件共享
         <Context.Provider value={{   username: 'CHJ'  }}>
           <div >
             <A />   //子组件A
             <B />    //子组件B
           </div>
         </Context.Provider>
       );
     }
     
     const rootElement = document.getElementById("root");
     ReactDOM.render(<App />, rootElement);
     
     ```

     

- useEffect()   副作用钩子(最常见的就是向服务器请求数据)
     useEffect(()  =>  {// Async Action}, [dependencies])
       第一个参数是一个函数，异步操作的代码放在里面。
       第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，useEffect()就会执行。

- ReactDOM.render(template,targetDOM)  渲染元素