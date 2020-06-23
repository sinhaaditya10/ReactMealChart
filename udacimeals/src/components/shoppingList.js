import React, { Component } from 'react';
import {Modal, Col, Row} from 'react-bootstrap';
class ShoppingList extends Component {
    render() { 
        return (
            <Modal
                size="lg"
            {...this.props}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Body>
                    <Row>
                        <Col align="center">Your Shopping List</Col>
                    </Row>
                    <Row>
                        <Col>
                        Ingredients
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}
 
export default ShoppingList;