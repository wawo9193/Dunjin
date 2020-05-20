
import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from "axios";
import Transact from "./Transact";
import Net from "./Net";
import "./stylesheets/Link.css";

class Link extends Component {
    constructor() {
        super();

        this.state = {
            transactions: [],
            cshow: false,
            tshow: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
    }

    handleOnSuccess(public_token, metadata) {
        // send token to client server
        axios.post("/auth/public_token", {
            public_token: public_token
        });
        this.setState({cshow: true});
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
        this.setState({tshow: true});
    }

    checkID(){
        axios.get("/auth").then((response) => {
            console.log(response.status + " before");
            if (response.status === 202) {
                console.log("foundid");
                this.setState({ cshow: true });
            }
        });
    }

    componentDidMount() {
        this.checkID();
    }

    render() {
        const beforeConnect = this.state.cshow ? "" : "noDisplay";
        const afterConnect = this.state.cshow ? "noDisplay" : "";
        const getTransact = this.state.tshow ? "" : "noDisplay";

        return (
            <div>
                <div className={getTransact}>
                    <Net 
                        income={this.state.transactions.reduce(function(acc,elt) {
                            console.log(elt.amount);
                            if (elt.amount>0) {
                                return acc + elt.amount;
                            } else {
                                return acc;
                            }
                        },0)}
                        expense={this.state.transactions.reduce(function(acc,elt) {
                            if (elt.amount<0) {
                                return acc + elt.amount;
                            } else {
                                return acc;
                            }
                        },0)}
                    />
                </div>
                <div className={afterConnect}>
                    <PlaidLink
                        clientName="React Plaid Setup"
                        env="sandbox"
                        product={["auth", "transactions"]}
                        publicKey="c46bbe6410966ad208a81aa46d28f7"
                        onExit={this.handleOnExit}
                        onSuccess={this.handleOnSuccess}
                    >
                        Open Link and connect your bank!
                    </PlaidLink>
                </div>
                <div className={beforeConnect}>
                    <button onClick={this.handleClick}>Get Transactions</button>
                </div>
                <div className={getTransact}>
                    <div className="bgTable">
                        <div style={{marginTop:"5px", display:"inline-block"}}>
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
                </div>
            </div>
        );
    }
}

export default Link;