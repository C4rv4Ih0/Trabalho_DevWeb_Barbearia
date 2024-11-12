import React from "react";
import "./Contato.css";

class Contato extends React.Component {
    render() {
        return (
            <div className="contato-container">
                <div className="left-section">
                    <div className="logo-container">
                        <div className="logo"></div>
                    </div>
                </div>
                <div className="right-section">
                    <div className="contato-content">
                        <h1>CONTATO</h1>
                        <p>
                            Entre em contato conosco pelas redes sociais! <br /> Estamos prontos para atender você.
                        </p>
                        <div className="contato-links">
                            <a href="https://wa.me/11234567890" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-whatsapp"></i> WhatsApp
                            </a>
                            <a href="https://instagram.com/chesterbarbershop" className="instagram-link" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                        </div>
                        <div className="localizacao">
                            <h2>Localização</h2>
                            <div className="localizacao-info">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>Rua da Barbearia, 123 - Centro, Chester</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contato;
