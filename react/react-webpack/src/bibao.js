/* 闭包 */
import React ,{useState}from 'react'
export default function Bibao(){
    let [number,setNumber] = useState(0);
    function alertNumber(){
      setTimeout(()=>{
        // alert 只能获取到点击按钮时的那个状态
        alert(number);
      },1000);
    }
    return (
        <>
            <p>{number}</p>
            <button onClick={()=>setNumber(number+1)}>+</button>
            <button onClick={alertNumber}>alertNumber</button>
        </>
    )
  }
