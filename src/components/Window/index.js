import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Window = ({title, Component}) => (
    <Row className="justify-content-md-center mt-5">
        <Col md={6}>
            <Card>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    { Component }
                </Card.Body>
            </Card>
        </Col>
    </Row>
);

export default Window;