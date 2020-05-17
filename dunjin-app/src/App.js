
import React, { Component } from "react";
import "./App.css";
import Link from "./components/Link";
import Banner from "./components/Banner";
import Login from "./components/Login";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      attempts: 0
    };
  }

  handleSubmit = (authVal) => {
    this.setState({ loggedIn: authVal });
  }

  render () {
    if (this.state.loggedIn) {
      return (
        <div>
          <Banner onSubmit={this.handleSubmit} />
          <div className="App">
            <h1>Dunjin</h1>
            <Link />
            <br/>
          </div>
        </div>
      ); 
    }
    return (
      <div className="loginScreen">
        <Login onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App;