import React, { useContext } from "react";
//第一步： 组件外部建立一个 Context
const Context = React.createContext({});

const A = () => {
    //第三步：useContext()钩子函数用来引入 Context 对象，从中获取username属性
  const { username } = useContext(Context)
  return (
    <div >
      <h>AAAA</h>
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

export default function App() {
  return (
      //第二步：XX.Provider提供了一个 Context 对象，这个对象可以被子组件共享
    <Context.Provider value={{   username: 'CHJ'  }}>
      <div >
        <A />   {/* //子组件A */}
        <B />   {/*  //子组件B */}
      </div>
    </Context.Provider>
  );
}


