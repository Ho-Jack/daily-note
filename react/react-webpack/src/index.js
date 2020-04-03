import React from "react";
import ReactDOM from "react-dom";

import Button from './button.js';
import Counter from './counter'
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Counter count={1}/>
      <Button/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
