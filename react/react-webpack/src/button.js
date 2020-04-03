/* import React, { Component } from "react";
export default class Button extends Component {
  constructor() {
    super();
    this.state = { buttonText: "Click me, please" };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => {
      return { buttonText: "Thanks, been clicked!" };
    });
  }
  render() {
    const { buttonText } = this.state;
    return <button onClick={this.handleClick}>{buttonText}</button>;
  }
}
 */

/* React Hooks 的意思是，组件尽量写成纯函数，
如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 
React Hooks 就是那些钩子。 */

/* 
下面介绍 React 默认提供的四个最常用的钩子。
   useState()   状态钩子
   useContext() 共享状态钩子
   useReducer() action 钩子
   useEffect()
*/
 //useState()用于为函数组件引入状态（state）纯函数不能有状态，所以把状态放在钩子里面。
 import React, { useState } from "react";

export default function  Button()  {
  /* useState()这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。
  该函数返回一个数组，数组的第一个成员是一个变量（上例是buttonText），指向状态的当前值。
  第二个成员是一个函数，用来更新状态，约定是set前缀加上状态的变量名（上例是setButtonText）。 */
  const  [count, setCount] =  useState(0);
 
  function handleClick()  {
    return setCount(count+1);
  }

  return <div> <button  onClick={handleClick}>{count}</button></div>
}