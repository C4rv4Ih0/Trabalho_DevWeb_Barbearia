// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './verAgendamentos.css';
import AgendamentoDataService from '../../services/AgendamentoDataService.js';
import NavBarAdm from '../navbarAdm/NavBarAdm.jsx';

export default class VerAgendamentos extends Component {
  constructor(props) {
    super(props);
    
    this.retrieveAgendamentos = this.retrieveAgendamentos.bind(this);

    this.state = {
      agendamentos: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/Login';
      return;
    }

    this.retrieveAgendamentos();
  }

  async retrieveAgendamentos(){
    const token = localStorage.getItem('token');

    try {
      const response = await AgendamentoDataService.getAgendamentosComDetalhes(token);
      this.setState({
        agendamentos: response.data,
      });
    } catch (e) {
      console.log("Erro: " + e);
      window.location.href = '/Login';
    }
  }

  async deleteAgendamento(id){
    const token = localStorage.getItem('token');

    try {
      await AgendamentoDataService.delete(id, token);
      this.retrieveAgendamentos();
    } catch (e) {
      console.log("Erro ao deletar o agendamento: " + e);
    }
  }

  editAgendamento(id){
    window.location.href = `/NovoAgendamento?id=${id}`
  }

  render() {
    const { agendamentos } = this.state;

    return(
      <><NavBarAdm />
      <div className="container mt-4">
        <div className="background-container">
          <div className="esquerda-img" />
          <div className="direita-img" />
        </div>
        <h1 className='titulo'>Agendamentos</h1>
        {agendamentos.length === 0 ? (
          <tr>
            <td colSpan="5">Nenhum agendamento encontrado.</td>
          </tr>
        ) : (
          <table className="table table-striped table-dark table-hover tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Barbeiro</th>
                <th>Corte</th>
                <th>Preço</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((agendamento) => (
                <tr key={agendamento.id}>
                  <td>{agendamento.nome}</td>
                  <td>{agendamento.funcionario.nome}</td>
                  <td>{agendamento.tipoDeCorte.nome}</td>
                  <td>{agendamento.tipoDeCorte.preco}</td>
                  <td>{agendamento.data}</td>
                  <td>{agendamento.hora.hora.slice(0, 5)}</td>
                  <td>
                    <button className="btn btn-warning editar" onClick={() => this.editAgendamento(agendamento.id)}>Editar</button>
                    <button className="btn btn-danger ml-2 deletar" onClick={() => this.deleteAgendamento(agendamento.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div></>
    );
  }
}