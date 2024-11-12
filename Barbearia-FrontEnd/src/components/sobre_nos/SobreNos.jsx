import React from "react";
import "./SobreNos.css";

class SobreNos extends React.Component {
    render() {
        return (
            <div className="sobre-nos-container">
                <div className="sobre_nos_bk1">
                    <div className="sobre-nos-texto">
                        <h1>SOBRE NÓS</h1>
                        <p>
                            Na Chester Barber Shop, acreditamos que um bom corte de cabelo pode transformar o seu dia. 
                            Desde 2024, estamos no coração da cidade, proporcionando um ambiente acolhedor e amigável onde 
                            todos se sentem como parte da família. Nossos barbeiros experientes combinam técnicas tradicionais 
                            com tendências modernas para garantir que você saia sempre satisfeito e confiante.
                        </p>
                        <p2>
                            A melhor barbearia da cidade Chester Barber Shop!
                        </p2>
                    </div>
                </div>
                <div className="sobre_nos_bk2">
                    <div className="imagens-container">
                        <div className="imagem imagem-1"></div>
                        <div className="imagem imagem-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SobreNos;