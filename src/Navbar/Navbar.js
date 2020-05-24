import React from 'react';
import Navbar from 'react-bootstrap/Navbar'; //we are using a react-bootstrap api for importing 'navbar' directly 
import Nav from 'react-bootstrap/Nav';  // we are using a react-bootstrap api for importing 'nav' directly


const NavBar = ()=>{
    return(
        // using bootstrap 4 created a navbar component directly with the brand and reference links
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#home" >Covid19india</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="mr-auto justify-content-end">
                <Nav variant="pills">
                    <Nav.Link href="#table"  >Home</Nav.Link>
                    <Nav.Link href="#helpline-heading" >Helpline</Nav.Link>
                    <Nav.Link href="#safety" >Measures</Nav.Link>     
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;