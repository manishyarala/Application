import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";
// const sayHi = () => {
//   return <h1>Hi from function</h1>;
// };

const store = configureStore();

ReactDOM.render(
  //this router manages all routes and has history in props
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
