
import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Link from "./components/Link";
import Banner from "./components/Banner";
import Login from "./components/Login";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    };
  }

  handleSubmit = (isAuth, status) => {

    if (status === "Logout") {
      axios.get('/logout');
    }

    this.setState({ loggedIn: isAuth });
  }

  render () {
    if (this.state.loggedIn) {
      return (
        <div>
          <Banner onSubmit={this.handleSubmit} />
          <div className="App">
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