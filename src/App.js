import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductOrderLayout from "./containers/ProductOrderLayout/ProductOrderLayout";
import "./App.css";
import { __product_list_path } from "./constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="app-container">
        <Router>
          <Route
            path={__product_list_path}
            component={ProductOrderLayout}
          ></Route>
        </Router>
      </div>
    );
  }
}

export default App;
