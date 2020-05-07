
import React, { Component } from "react";
// import PlaidLink from "react-plaid-link";
import {PlaidLink} from "react-plaid-link";
import axios from "axios";
import Transact from "./Transact";

class Link extends Component {
  constructor() {
    super();

    this.state = {
      transactions: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleOnSuccess(public_token, metadata) {
    // send token to client server
    axios.post("/auth/public_token", {
      public_token: public_token
    });
  }

  handleOnExit() {
    // handle the case when user exits Link
  }

  handleClick(res) {
    axios.get("/transactions").then(res => {
      this.setState({ transactions: res.data });
    });
    axios.get("/accounts/balance/get").then(res => {
        this.setState({ account: res.data });
    });
  }

  render() {
      console.log(this.state.transactions);
    return (
      <div>
        <PlaidLink
          clientName="React Plaid Setup"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey="c46bbe6410966ad208a81aa46d28f7"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Open Link and connect your bank!
        </PlaidLink>
        <div>
          <button onClick={this.handleClick}>Get Transactions</button>
        </div>
        <div>
            <table style={{width:"800px"}}>
                <tr>
                    <th>Name</th>
                    <th>Amount ($)</th>
                    <th>Date</th>
                </tr>
                {this.state.transactions.map(item => (
                    <Transact 
                        t_date={item.date}
                        t_name={item.name} 
                        t_amount={item.amount}
                    />
                ))}
            </table>
        </div>
      </div>
    );
  }
}

export default Link;