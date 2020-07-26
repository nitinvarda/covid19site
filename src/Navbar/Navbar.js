import React from 'react';
import { Link } from "react-router-dom";



const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top" >

            <a className="navbar-brand"><Link to="/" style={{ color: "white" }}>Covid19-India</Link></a>


            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <a className="nav-link"><Link to="/" style={{ color: "white" }}>Home</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" ><Link to="/helpline" style={{ color: "white" }}>Helpline Numbers</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" ><Link to="/safety-measures" style={{ color: "white" }}>Safety Measures</Link></a>
                    </li>
                </ul>
            </div>
        </nav>

    );
}

export default NavBar;