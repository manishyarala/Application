import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

// const sayHi = () => {
//   return <h1>Hi from function</h1>;
// };

ReactDOM.render(
  //this router manages all routes and has history in props
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
