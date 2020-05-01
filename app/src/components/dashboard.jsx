import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Form, Col, Button, Row } from 'react-bootstrap';
import './dashboard.css';

export default class Dash extends React.Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="balance" className="text-white">
                                    Current Balance:
                                </Form.Label><br/>
                                <CurrencyFormat thousandSeparator={true} prefix={'$'} placeholder="Enter Balance"/>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="balance" className="text-white">
                                    Add Monthly Bill:
                                </Form.Label><br/>
                                <CurrencyFormat thousandSeparator={true} prefix={'$'} placeholder="Enter Bill Amt."/>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}