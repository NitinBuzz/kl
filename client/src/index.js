import React from "react";
import ReactDOM from "react-dom";

import Chatter from "./components/Chatter";

import "./index.css";

function App() {
  return (
    <div className="main">
      <div className="AppTitle">
        <h1>Mr. World Wide</h1>
        <h2>Bring it on...!</h2>
      </div>
      <div>
        <Chatter messages={[]} name="nitin" endpoint="http://142.93.215.49:5010" />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
