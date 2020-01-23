import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import './log-in.css';


export default class Login extends React.Component {
    render() {
        return (
            <div id="loginouter">
                <div id="loginbody" className="border border-danger bg-danger rounded">
                    <h1 className="text-center">Log in</h1>
                    <br/>
                    <Form>
                        <Form.Group>
                            <Col>
                                <Form.Label for="emailInput">
                                    Email:
                                </Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" id="emailInput"/>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col>
                                <Form.Label for="passInput">
                                    Password:
                                </Form.Label>
                                <Form.Control type="password" placeholder="Password" id="passInput"/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <div class="col text-center">
                        <Button className="btn btn-warning text-white btn-space btn-outline-warning"> Sign In </Button> 
                        <Button className="btn bg-warning text-white btn-space btn-outline-warning"> Sign Up </Button>
                    </div>
                </div>
            </div>
        );
    }
}