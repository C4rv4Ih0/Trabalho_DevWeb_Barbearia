// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Importando useState
import { NavLink } from "react-router-dom"; // Importa NavLink
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "@assets/images/Home_cbs_logo_1.png"; 
import "./NavBar.css";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar a abertura do menu

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Alterna o estado do menu
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
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
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={toggleMenu}>Início</NavLink>
                        <NavLink to="/sobre-nos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={toggleMenu}>Sobre Nós</NavLink>
                        <NavLink to="/agendamentos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={toggleMenu}>Agendamentos</NavLink>
                        <NavLink to="/contato" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={toggleMenu}>Contato</NavLink>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={toggleMenu}>Login</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
