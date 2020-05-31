import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from "axios";
import Transact from "./Transact";
import Bal from "./Bal";
import Group from "./Group";
import "./stylesheets/Link.css";

class Link extends Component {
    constructor() {
        super();

        this.state = {
            accounts: [],
            transactions: [],
            categories: [],
            connected:false,
            balance:false,
            transact:false,
            spending:false,
            load:false
        };

        // this.handleCategories = this.handleCategories.bind(this);
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
        this.openPage = this.openPage.bind(this);
    }

    handleOnSuccess(public_token, metadata) {
        // send token to client server
        axios.post("/auth/public_token", { public_token: public_token }).then(res => {
            if (res.status===200) {
                axios.get("/accounts/balance/get").then(bres => {
                    axios.get("/transactions").then(tres => {
                        axios.get("/categories/get").then(cres => {
                            this.setState({ connected: true, accounts: bres.data.response, transactions: tres.data, categories: cres.data.results });
                        })
                    });
                });
            }
        });
    }

    handleOnExit(err, metadata) {
        if (err) alert(err.display_message + '\n' + err.display_code);
    }

    handleCategories = (res) => {
        axios.post("/categories/post", {
            cat: res.catdog
        })
        .then(function(response) {
            console.log(response);
        })
    }

    openPage = (event, cat) => {
        event.preventDefault();

        if (cat === 'balance') {
            this.setState({ balance: true, transact: false, spending: false });
        } else if (cat === 'transactions') {
            this.setState({ balance: false, transact: true, spending: false });
        } else if (cat === 'categories') {
            this.setState({ balance: false, transact: false, spending: true });
        }
    }

    onLoad(){
        axios.get("/accounts/balance/get").then(bres => {
            axios.get("/transactions").then(tres => {
                axios.get("/categories/get").then(cres => {
                    this.setState({ accounts: bres.data.response, transactions: tres.data, categories: cres.data.results, load: true });
                })
            });
        });
    }

    checkID(){
        axios.get("/auth").then((res) => {
            if (res.status === 202) {
                this.setState({ connected: true, atshow: true });
            }
        });
    }

    componentWillMount() {
        this.checkID();
    }

    render() {
        const connect = this.state.connected ? "noDisplay" : "";
        const afterConnect = this.state.connected ? "" : "noDisplay";

        const transact = this.state.transact ? "" : "noDisplay";
        const balance = this.state.balance ? "" : "noDisplay"; 
        const spending = this.state.spending ? "" : "noDisplay";

        const tlink = this.state.transact ? "tablinks" : "";
        const blink = this.state.balance ? "tablinks" : "";
        const slink = this.state.spending ? "tablinks" : "";
        
        if (this.state.connected && !this.state.load) {
            this.onLoad();
        }

        return (
            <>
                <div className="bgInfo">
                    <div className={connect}>
                        <PlaidLink
                            style={{
                                    backgroundColor:"#c41c6a",
                                    fontSize:"large"
                                }}
                            clientName="React Plaid Setup"
                            env="sandbox"
                            product={["auth", "transactions"]}
                            publicKey="c46bbe6410966ad208a81aa46d28f7"
                            onExit={this.handleOnExit}
                            onSuccess={this.handleOnSuccess}
                        >
                            Click to connect your bank!
                        </PlaidLink>
                    </div>
                    <div className={afterConnect}>
                        <div className="tab">
                            <span className={blink} onClick={e => this.openPage(e, 'balance')}>Balance</span>
                            <span className={tlink} onClick={e => this.openPage(e, 'transactions')}>Transactions</span>
                            <span className={slink} onClick={e => this.openPage(e, 'categories')}>Spending by category</span>
                        </div>

                        <div id="balance" className={balance}>
                            <Bal 
                                income={this.state.transactions}
                                balance={this.state.accounts}
                            />
                        </div>

                        <div id="transactions" className={transact}>
                            <Transact
                                transactions={this.state.transactions}
                                onSelect={this.handleCategories}
                            />
                        </div>

                        <div id="categories" className={spending}>
                            <Group 
                                transactions={this.state.transactions}
                                categories={this.state.categories}
                            />
                        </div> 
                    </div>
                </div>
            </>
        );
    }
}

export default Link;