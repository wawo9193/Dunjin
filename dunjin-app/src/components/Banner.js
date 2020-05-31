import React, { Component } from "react";
import Modal from "./Modal.js";
import "./stylesheets/Banner.css";

class Banner extends Component {
    constructor() {
        super();

        this.state = {
            show: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal(event) {
        this.setState({ show: true });
        event.preventDefault();
    }

    hideModal() {
        this.setState({ show: false })
    }

    handleSubmit = () => {
        this.props.onSubmit(false, "Logout");
    }

    render() {
        const ModalBody = (
            <p>This is a dashboard where you can connect to a bank using
            the Plaid API and display account balances, transactions, and 
            categorized spending.</p>
        )
        return(
            <div>
                <Modal handleClose={this.hideModal} show={this.state.show} title={"About"} children={ModalBody}/>
                <div className="bannerBg">
                    <ul>
                        <li className="leftElements">dunjin</li>
                        <li className="rightElements" onClick={this.handleSubmit}>Log out</li>
                        <li className="rightElements" onClick={e => {this.showModal(e)}}>About</li>
                    </ul> 
                </div>
            </div>
        );
    }
}

export default Banner;