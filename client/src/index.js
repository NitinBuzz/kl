import React from "react";
import ReactDOM from "react-dom";

import Chatter from "./components/Chatter";

import "./index.css";

function App() {
  return (
    <div className="main">
    <p className="top-text">This is KLU World Wide Chat App.</p>
    <p className="top-right-text">No Spam || Save important data, chat will be flushed soon.</p>
      <div className="AppTitle">
        <h2 className="index-title">I'm Mr. KLU World Wide</h2>
      </div>
      <div>
        <Chatter messages={[]} name="nitin" endpoint="http://142.93.215.49:5000" />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
