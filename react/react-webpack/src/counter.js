import React, { useState } from 'react';

//export default function Counter({initialCount}) {
  export default function Counter(props) {
  
  const [count, setCount] = useState(props.initialCount-0);

  return (
    <>
      Count: {count}
      <button onClick={() => setCount(props.initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}

