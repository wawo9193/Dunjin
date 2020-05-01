import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import './log-in.css';

export default class Login extends React.Component {
    signInClick(props) {
        console.log(this.props);
    }
    signUpClick() {
        console.log("SIGN UP!");
    }
    render() {
        return (
            <div id="loginouter" className="border border-warning rounded">
                <br/>
                <div id="loginbody" className="border bg-white border-info rounded">
                    <img src={ "/key.png" } className="img-space" alt="key"/>
                    <h1 className="text-center">Log in</h1>
                    <br/>
                    <Form>
                        <Form.Group>
                            <Col>
                                <Form.Label htmlFor="emailInput">
                                    Email:
                                </Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" id="emailInput"/>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col>
                                <Form.Label htmlFor="passInput">
                                    Password:
                                </Form.Label>
                                <Form.Control type="password" placeholder="Password" id="passInput"/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <div className="col text-center">
                        <Button className="btn btn-info text-white btn-space" onClick={this.signInClick}> Sign In </Button> 
                        <Button className="btn bg-info text-white btn-space" onClick={this.signUpClick}> Sign Up </Button>
                    </div>
                </div>
            </div>
        );
    }
}