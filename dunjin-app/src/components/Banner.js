import React, { Component } from "react";
import Modal from "./Modal.js";
import "./stylesheets/Banner.css";

function ModalBody() {
    return (
        <p>This is a dashboard where you can connect to a bank using
            the Plaid API and display transactions from the previous 30 days.</p>
    )
}

class Banner extends Component {

    constructor() {

        super();

        this.state = {
            show: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal(e) {
        this.setState({
            show: true
        });
        e.preventDefault();
    }

    hideModal(e) {
        this.setState({
            show: false
        })
    }

    handleSubmit = () => {
        this.props.onSubmit(false, "Logout");
    }

    render() {
        return(
            <div>
                <div className="bannerBg">
                    <ul>
                        <li>dunjin</li>
                        {/* <li><a href="#">text</a></li> */}
                        <li className="rightElements"><a href="#" onClick={this.handleSubmit}>Log out</a></li>
                        <li className="rightElements"><a href="#" onClick={e => {this.showModal(e)}}>About</a></li>
                    </ul> 
                    <Modal handleClose={this.hideModal} show={this.state.show} title={"About"} children={<ModalBody />}/>
                </div>
            </div>
        );
    }
}

export default Banner;