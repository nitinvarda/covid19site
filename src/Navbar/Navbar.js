import React from 'react';
import { Link } from "react-router-dom";



const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top" >

            <Link className="navbar-brand" to="/" style={{ color: "white" }}>Covid19-India</Link>


            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" style={{ color: "white" }}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/helpline" style={{ color: "white" }}>Helpline Numbers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/safety-measures" style={{ color: "white" }}>Safety Measures</Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}

export default NavBar;