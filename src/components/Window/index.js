import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Window = ({title, Component}) => (
    <Row className="justify-content-md-center mt-5">
        <Col md={5}>
            <Card>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    { Component }
                </Card.Body>
            </Card>
        </Col>
    </Row>
);

const Wrapper = styled.div`

`
export default Window;