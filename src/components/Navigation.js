import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";


function Navigation() {
    return (
        <Navbar bg="dark" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand> Purplemana </Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
                <LinkContainer exact to="/">
                    <Nav.Link > Home </Nav.Link>
                </LinkContainer >
                <LinkContainer to="/shopify">
                    <Nav.Link> Shopify </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/inventory">
                    <Nav.Link> Inventory </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}

export default Navigation;