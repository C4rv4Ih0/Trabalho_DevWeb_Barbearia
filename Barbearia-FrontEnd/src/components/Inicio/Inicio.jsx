// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inicio.css";


export default class Inicio extends Component {
    render() {
        return (
            <main id="inicio">
                <div className="container-fluid main d-flex align-items-center justify-content-center">
                    <div className="col-25 col-md-5 d-flex flex-column align-items-center w-100">
                        <div className="background-img"></div>
                        <div className="container-sm Logo-ChesterBarberShop text-center">
                            <img src="/src/assets/images/Home_Logo_Barbearia_1.png" />
                        </div>
                        <div className="Frase1">
                        <a>
                            Aqui é barba, cabelo e bigode!<br />
                            Venha dar aquele tapa no visual na melhor barbearia da região.
                        </a>
                        </div>
                        <div className="text-center">
                        <NavLink to="/agendamentos">
                                <button className="btn btn-warning btn-lg custom-button">Agende já seu corte</button>
                        </NavLink>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
