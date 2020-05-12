import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePW = this.handlePW.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(event) { this.setState({email: event.target.value}); }

    handlePW(event) { this.setState({password: event.target.value}); }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.email + " -> " + this.state.password);
        event.preventDefault();

        axios.post('/users/login', {
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    E-mail:
                    <input type="email" name="email" value={this.state.email} onChange={this.handleEmail} />        
                </label>
                <label>
                    Password:
                    <input type="text" name="password" value={this.state.password} onChange={this.handlePW} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Login;
