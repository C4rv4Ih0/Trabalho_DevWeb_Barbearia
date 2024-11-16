// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './NovoAgendamento.css';
import AgendamentoDataService from "../../services/AgendamentoDataService";
import FuncionarioDataService from "../../services/FuncionarioDataService";
import TipoDeCorteDataService from "../../services/TipoDeCorteDataService";
import HorarioDataService from "../../services/HorarioDataService";

// Builder para o estado inicial do componente
class StateBuilder {
    constructor() {
        this.state = {
            id: null,
            nome: "",
            telefone: "",
            data: "",
            hora: "",
            horaIdAnterior: "",
            horaId: "",
            funcionarioId: "",
            tipoDeCorteId: "",
            funcionarios: [],
            tipoDeCortes: [],
            horarios: [],
        };
    }

    setId(id) {
        this.state.id = id;
        return this;
    }

    setNome(nome) {
        this.state.nome = nome;
        return this;
    }

    setTelefone(telefone) {
        this.state.telefone = telefone;
        return this;
    }

    setData(data) {
        this.state.data = data;
        return this;
    }

    setHora(hora, horaId) {
        this.state.hora = hora;
        this.state.horaIdAnterior = horaId;
        this.state.horaId = horaId;
        return this;
    }

    setFuncionarios(funcionarios) {
        this.state.funcionarios = funcionarios;
        return this;
    }

    setTipoDeCortes(tipoDeCortes) {
        this.state.tipoDeCortes = tipoDeCortes;
        return this;
    }

    setHorarios(horarios) {
        this.state.horarios = horarios;
        return this;
    }

    build() {
        return this.state;
    }
}

// Builder para os dados do agendamento
class AgendamentoBuilder {
    constructor() {
        this.dados = {
            nome: "",
            telefone: "",
            data: "",
            horaId: "",
            funcionarioId: "",
            tipoDeCorteId: "",
        };
    }

    setNome(nome) {
        this.dados.nome = nome;
        return this;
    }

    setTelefone(telefone) {
        this.dados.telefone = telefone;
        return this;
    }

    setData(data) {
        this.dados.data = data;
        return this;
    }

    setHoraId(horaId) {
        this.dados.horaId = horaId;
        return this;
    }

    setFuncionarioId(funcionarioId) {
        this.dados.funcionarioId = funcionarioId;
        return this;
    }

    setTipoDeCorteId(tipoDeCorteId) {
        this.dados.tipoDeCorteId = tipoDeCorteId;
        return this;
    }

    build() {
        return this.dados;
    }
}

// Componente principal
export default class Agendamentos extends Component {
    constructor(props) {
        super(props);

        this.onChangeData = this.onChangeData.bind(this);
        this.onChangeHoraId = this.onChangeHoraId.bind(this);
        this.onChangeFuncionarioId = this.onChangeFuncionarioId.bind(this);
        this.onChangeTipoDeCorteId = this.onChangeTipoDeCorteId.bind(this);
        this.retrieveFuncionarios = this.retrieveFuncionarios.bind(this);
        this.retrieveTiposDeCorte = this.retrieveTiposDeCorte.bind(this);
        this.retrieveHorarios = this.retrieveHorarios.bind(this);
        this.saveAgendamento = this.saveAgendamento.bind(this);
        this.newAgendamento = this.newAgendamento.bind(this);

        // Inicializa o estado usando o StateBuilder
        this.state = new StateBuilder().build();
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');

        if (id) {
            this.setState({ id }, () => {
                this.getAgendamento(id);
            });
        }

        this.retrieveFuncionarios();
        this.retrieveTiposDeCorte();
    }

    onChangeNome = (e) => {
        this.setState({ nome: e.target.value });
    };

    onChangeTelefone = (e) => {
        this.setState({ telefone: e.target.value });
    };

    onChangeData = (e) => {
        const novaData = e.target.value;
        this.setState({ data: novaData }, () => {
            this.retrieveHorarios(novaData);
        });
    };

    onChangeHoraId = (e) => {
        this.setState({
            horaId: e.target.value,
            horaIdAnterior: "",
        });
    };

    onChangeFuncionarioId = (e) => {
        this.setState({ funcionarioId: e.target.value });
    };

    onChangeTipoDeCorteId = (e) => {
        this.setState({ tipoDeCorteId: e.target.value });
    };

    retrieveFuncionarios() {
        FuncionarioDataService.getAll()
            .then((response) => {
                this.setState({ funcionarios: response.data });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    retrieveTiposDeCorte() {
        TipoDeCorteDataService.getAll()
            .then((response) => {
                this.setState({ tipoDeCortes: response.data });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    retrieveHorarios(data) {
        if (!data) {
            this.setState({ horarios: [] });
            return;
        }

        HorarioDataService.findHorariosDisponiveis(data)
            .then((response) => {
                this.setState({ horarios: response.data });
            })
            .catch((e) => {
                console.log("Erro ao buscar horários disponíveis:", e);
                this.setState({ horarios: [] });
            });
    }

    getAgendamento(id) {
        AgendamentoDataService.get(id)
            .then((response) => {
                const agendamento = response.data;
                const stateBuilder = new StateBuilder()
                    .setNome(agendamento.nome)
                    .setTelefone(agendamento.telefone)
                    .setData(agendamento.data)
                    .setHora(agendamento.hora.hora, agendamento.horaId)
                    .setFuncionarioId(agendamento.funcionarioId)
                    .setTipoDeCorteId(agendamento.tipoDeCorteId);

                this.setState(stateBuilder.build());
                this.retrieveHorarios(agendamento.data);
            })
            .catch((error) => {
                console.log("Erro ao buscar agendamento:", error);
            });
    }

    saveAgendamento(e) {
        e.preventDefault();

        const agendamentoBuilder = new AgendamentoBuilder()
            .setNome(this.state.nome)
            .setTelefone(this.state.telefone)
            .setData(this.state.data)
            .setHoraId(this.state.horaId)
            .setFuncionarioId(this.state.funcionarioId)
            .setTipoDeCorteId(this.state.tipoDeCorteId);

        const dados = agendamentoBuilder.build();

        if (this.state.id) {
            AgendamentoDataService.update(this.state.id, dados)
                .then(() => {
                    alert("Agendamento atualizado com sucesso!");
                    window.location.href = "/VerAgendamentos";
                })
                .catch((error) => {
                    console.log("Erro ao atualizar agendamento:", error);
                });
        } else {
            AgendamentoDataService.create(dados)
                .then(() => {
                    this.newAgendamento();
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    newAgendamento() {
        this.setState(new StateBuilder().build());
    }

    render() {
        const { funcionarios, tipoDeCortes } = this.state;

        return (
            <div className="novoAgendamento-container">

                <div className="novoAgendamento-lado-esquerdo"></div>
                <div className="Logo2" />
                <div className="novoAgendamento-lado-direito">
                    <div className="form-container">
                        <h1>Agendamentos</h1>
                        <form onSubmit={this.saveAgendamento}>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Digite o seu nome"
                                    value={this.state.nome}
                                    onChange={this.onChangeNome}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Digite o seu telefone"
                                    value={this.state.telefone}
                                    onChange={this.onChangeTelefone}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="haircut">Corte</label>
                                <select
                                    id="haircut"
                                    name="haircut"
                                    className="form-control"
                                    value={this.state.tipoDeCorteId}
                                    onChange={this.onChangeTipoDeCorteId}
                                    required
                                >
                                    <option value="" disabled>Selecione o corte</option>
                                    
                                    {tipoDeCortes.map((corte) => (
                                        <option key={corte.id} value={corte.id}>{corte.nome} - R${parseFloat(corte.preco).toFixed(2)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="barber">Barbeiro</label>
                                <select
                                    id="barber"
                                    name="barber"
                                    className="form-control"
                                    value={this.state.funcionarioId}
                                    onChange={this.onChangeFuncionarioId}
                                    required
                                >
                                    
                                    <option value="" disabled>Selecione o barbeiro</option>
                                    
                                    {funcionarios.map((funcionario) => (
                                        <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Data</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-control"
                                    value={this.state.data}
                                    onChange={this.onChangeData}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Horário</label>
                                <select
                                    id="time"
                                    name="time"
                                    className="form-control"
                                    value={this.state.horaId}
                                    onChange={this.onChangeHoraId}
                                    required
                                >
                                    {this.state.horaIdAnterior ? (
                                        <option key={this.state.horaId} value={this.state.horaId}>
                                            {this.state.hora.slice(0, 5)}
                                        </option>
                                    ) : (
                                        <option value="" disabled>Selecione o horário</option>
                                    )}

                                    {this.state.horarios.map(horario => (
                                        <option key={horario.id} value={horario.id}>
                                            {horario.hora.slice(0, 5)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-right">
                                <button type="submit" className="btn btn-primary custom-button2">
                                    {this.state.id ? "Atualizar" : "Agendar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
