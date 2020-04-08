/* 函数式更新
如果新的 state 需要通过使用先前的 state 计算得出，
那么可以将回调函数当做参数传递给 setState。
该回调函数将接收先前的 state，并返回一个更新后的值。
*/
import React ,{useState}from 'react'
export default    function Counter(){
    let [number,setNumber] = useState(0);
    function lazy(){
        console.log(number);
        
        setTimeout(() => {
           // setNumber(number+1);
            // 这样每次执行时都会去获取一遍 state，而不是使用点击触发时的那个 state
            setNumber(number=>number+1);
        }, 3000);
    }
    return (
        <>
           <p>{number}</p>
           <button onClick={()=>setNumber(number+1)}>+</button>
           <button onClick={lazy}>lazy</button>
        </>
    )
}