import React, { Component } from "react";
import Modal from "./Modal.js";
import "./Banner.css";

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

    render() {
        return(
            <div>
                <ul>
                    <li>dunjin</li>
                    {/* <li><a href="#">News</a></li>
                    <li><a href="#">Contact</a></li> */}
                    <li className="abt"><a href="#" onClick={e => {this.showModal(e)}}>About</a></li>
                </ul> 
                <Modal handleClose={this.hideModal} show={this.state.show}/>
            </div>
        );
    }
}

export default Banner;