import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarPage = () => (
    <Navbar expand="md">
        <Navbar.Brand>
            <Link to="/">
                <img
                    src="assets/img/logo.png"
                    width="100"
                    height="65"
                    className="d-inline-block align-top mb-1"
                    alt="Hugo"
                />
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
            <Nav className="mr-auto">
                <Link to="counter" className="nav-link">Counter</Link>
                <Link to="temperature" className="nav-link">Temperature</Link>
                <Link to="flight" className="nav-link">Flight</Link>
                <Link to="timer" className="nav-link">Timer</Link>
                <Link to="crud" className="nav-link">CRUD</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default withRouter(NavbarPage);