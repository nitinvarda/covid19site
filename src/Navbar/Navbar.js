import React from 'react';
// import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import table from './Result-table/Result-table.js';

const NavBar = ()=>{
    return(
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
            





        // <div id="navbar">
        //     <h2 id="page-title">Covid19india</h2>
        //     <ul>
        //         <li><a href="#">Home</a></li>
        //         <li><a href="#helpline-heading">Helpline</a></li>
        //         <li><a href="#measures">Measures</a></li>
        //     </ul>
            
        // </div>
    );
}

export default NavBar;