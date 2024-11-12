// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Agendamentos.css";
import AgendamentoDataService from "../../services/AgendamentoDataService";
import { useNavigate } from "react-router-dom";

const Agendamentos = () => {
    const [setAgendamentos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        retrieveAgendamentos();
    }, []);

    const retrieveAgendamentos = () => {
        AgendamentoDataService.getAll()
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="agendamento-container">
            <div className="lado-esquerdo"></div>
            <div className="Logo" />
            <div className="lado-direito">
                <div className="info-section">
                    <div className="text">
                        <p>Nossos serviços</p>
                    </div> 
                    <div className="info-item">
                        <div className="info-image barba"></div>
                        <p className="info-text">
                            <div className="text2">
                                <p>Barba</p>
                            </div> 
                            Transformar a barba em uma obra de arte é a nossa especialidade.<br />
                            Com técnicas refinadas e um toque contemporâneo, <br />oferecemos um serviço impecável que redefine padrões.
                        </p>
                    </div>
                    <div className="info-item">
                        <div className="info-image corte"></div>
                        <p className="info-text">
                            <div className="text3">
                                <p>Corte</p>
                            </div>
                            Oferecemos uma variedade incrível de cortes de cabelo que se <br /> adaptam a diferentes estilos e personalidades.<br /> 
                            De cortes clássicos a modernos, garantimos um look impecável.
                        </p>
                    </div>
                </div>
                <div className="action-buttons">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate('/NovoAgendamento')}
                    >
                        Novo Agendamento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Agendamentos;
