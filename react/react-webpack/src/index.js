import React from "react";
import ReactDOM from "react-dom";

// import Button from './button.js';
// import MyButton from './myButton'
// import Counter from './counter'
// import BiBao from './bibao'
// import UserStateDemo from './useStateDemo'
// import FunctionUpdate  from './functionUpdate'
//import LifeTime from './lifeTime';
import UseContext from './useContext'
import "./styles.css";

function App() {
  return (
    <div className="App">
        共享状态钩子：<UseContext/>
      
      {/*
        生命周期：<LifeTime/>
      函数式更新：<FunctionUpdate></FunctionUpdate>
      <br/> <br/>
      闭包：<BiBao/> 
      <br/>
      userStateDemo:
      <UserStateDemo/>
     <br></br> Counter:
       <Counter initialCount='1'/> 
   <MyButton/>
      <Button/> */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
