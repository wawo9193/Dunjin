import React, { Component } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import './stylesheets/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            clicked: '',
            show: false
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePW = this.handlePW.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleEmail(event) { this.setState({ email: event.target.value }); }
    handlePW(event) { this.setState({ password: event.target.value }); }

    logCheck(event) {
        this.setState({ clicked: event.target.value });
    }

    showModal(event) {
        event.preventDefault();
        this.setState({ show: true });
    }

    hideModal() {
        this.setState({ show: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/users/login', {
            email: this.state.email,
            password: this.state.password,
            clicked: this.state.clicked
        },{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((response) => {
            if (response.status === 200) {
                this.props.onSubmit(true, "Login");
            } else {
                this.props.onSubmit(false, "");
            }

        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const ModalBody = (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label> E-mail: </label>
                        <br/>
                        <input type="email" name="email" onChange={this.handleEmail} /> 
                        <br/>       
                        <label> Password: </label>
                        <br/>
                        <input type="password" name="password" onChange={this.handlePW} />
                        <br/>
                        <input className="btn" type="submit" value={"Signup"} onClick={e => {this.logCheck(e, "value")}} />
                    </form>
                </div>
            </div>
        );
        return (
            <div className="window">
                <div className="innerWindow">
                    <h1>dunjin</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label> E-mail: </label>
                        <br/>
                        <input type="email" name="email" onChange={this.handleEmail} /> 
                        <br/>       
                        <label> Password: </label>
                        <br/>
                        <input type="password" name="password" onChange={this.handlePW} />
                        <br/>
                        <input className="btn" type="submit" value={"Login"} onClick={e => this.logCheck(e, "value")} />
                        <input className="btn" type="submit" value={"Signup"} onClick={e => {this.showModal(e, "value")}} />
                    </form>
                </div>
                <Modal handleClose={this.hideModal} show={this.state.show} title={"Signup"} children={ModalBody} />
            </div>
        );
    }
}

export default Login;
