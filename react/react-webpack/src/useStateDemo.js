import React, { useState } from "react";
//import ReactDOM from "react-dom";

function Child1(porps) {
  console.log(porps);
  const { num, handleClick } = porps;
  return (
    <div
      onClick={() => {
        handleClick(num + 1);
      }}
    >
      child
    </div>
  );
}

function Child2(porps) {
  // console.log(porps);
  const { text, handleClick } = porps;
  return (
    <div>
      child2
      <Grandson text={text} handleClick={handleClick} />
    </div>
  );
}

function Grandson(porps) {
  console.log(porps);
  const { text, handleClick } = porps;
  return (
    <div
      onClick={() => {
        handleClick(text + 1);
      }}
    >
      grandson
    </div>
  );
}

export  default function Parent() {
  let [num, setNum] = useState(0);
  let [text, setText] = useState(1);

  return (
    <div>
      <Child1 num={num} handleClick={setNum} />
      <Child2 text={text} handleClick={setText} />
    </div>
  );
}
