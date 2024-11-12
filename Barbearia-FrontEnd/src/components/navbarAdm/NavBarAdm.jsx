// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "@assets/images/Home_cbs_logo_1.png"; 
import "./NavBarAdm.css";

export default function NavBarAdm() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
            <div className="container">
                <NavLink to="/verAgendamentos" className="navbar-brand">
                    <img src={logo} alt="Chester BarberShop Logo" />
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleMenu} 
                    aria-controls="navbarNav" 
                    aria-expanded={isOpen} 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <div className="navbar-nav mr-auto">
                        <NavLink to="/verAgendamentos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={toggleMenu}>Todos os Agendamentos</NavLink>
                        <NavLink to="/logout" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={toggleMenu}>Logout</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
