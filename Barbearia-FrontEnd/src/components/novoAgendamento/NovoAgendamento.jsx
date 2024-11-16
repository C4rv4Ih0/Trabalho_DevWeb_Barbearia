import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import AgendamentoDataService from "../../services/AgendamentoDataService";
import FuncionarioDataService from "../../services/FuncionarioDataService";
import HorarioDataService from "../../services/HorarioDataService";
import TipoDeCorteDataService from "../../services/TipoDeCorteDataService";
// import GenericInput from "../GenericInput/GenericInput";
import "./NovoAgendamento.css";
import {
  InputRoot,
  Input,
  DefaultOption,
  Label,
  Option,
  Select,
} from "../Input";

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
    const id = queryParams.get("id");

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
              <InputRoot>
                <Label htmlFor="name" label="Nome" />
                <Input
                  type="text"
                  id="name"
                  placeholder="Digite o seu nome"
                  value={this.state.nome}
                  onChange={this.onChangeNome}
                  required
                />
              </InputRoot>
              {/* <GenericInput
                label="Nome"
                type="text"
                id="name"
                placeholder="Digite o seu nome"
                value={this.state.nome}
                onChange={this.onChangeNome}
                required
              /> */}

              <InputRoot>
                <Label htmlFor="phone" label="Telefone" />
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Digite o seu telefone"
                  value={this.state.telefone}
                  onChange={this.onChangeTelefone}
                  required
                />
              </InputRoot>
              {/* <GenericInput
                label="Telefone"
                type="tel"
                id="phone"
                placeholder="Digite o seu telefone"
                value={this.state.telefone}
                onChange={this.onChangeTelefone}
                required
              /> */}

              <InputRoot>
                <Label htmlFor="haircut" label="Corte" />
                <Select
                  id="haircut"
                  value={this.state.tipoDeCorteId}
                  onChange={this.onChangeTipoDeCorteId}
                  required
                >
                  <DefaultOption label="Selecione o tipo de corte" />
                  {tipoDeCortes.map((corte) => (
                    <Option
                      key={corte.id}
                      value={corte.id}
                      label={`${corte.nome} - R$${parseFloat(
                        corte.preco
                      ).toFixed(2)}`}
                    />
                  ))}
                </Select>
              </InputRoot>
              {/* <GenericInput
                label="Corte"
                id="haircut"
                placeholder="Digite o tipo de corte"
                value={this.state.tipoDeCorteId}
                onChange={this.onChangeTipoDeCorteId}
                required
                options={tipoDeCortes}
                optionFormatter={(corte) =>
                  `${corte.nome} - R$${parseFloat(corte.preco).toFixed(2)}`
                }
              /> */}

              <InputRoot>
                <Label htmlFor="barber" label="Barbeiro" />
                <Select
                  id="barber"
                  placeholder="Selecione o barbeiro"
                  value={this.state.funcionarioId}
                  onChange={this.onChangeFuncionarioId}
                  required
                >
                  <DefaultOption label="Selecione o barbeiro" />
                  {funcionarios.map((funcionario) => (
                    <Option
                      key={funcionario.id}
                      value={funcionario.id}
                      label={funcionario.nome}
                    />
                  ))}
                </Select>
              </InputRoot>
              {/* <GenericInput
                label="Barbeiro"
                id="barber"
                placeholder="Selecione o barbeiro"
                value={this.state.funcionarioId}
                onChange={this.onChangeFuncionarioId}
                required
                options={funcionarios}
                optionFormatter={(funcionario) => funcionario.nome}
              /> */}

              <InputRoot>
                <Label htmlFor="date" label="Data" />
                <Input
                  type="date"
                  id="date"
                  value={this.state.data}
                  onChange={this.onChangeData}
                  required
                />
              </InputRoot>
              {/* <GenericInput
                label="Data"
                type="date"
                id="date"
                value={this.state.data}
                onChange={this.onChangeData}
                required
              /> */}

              <InputRoot>
                <Label htmlFor="time" label="Horário" />
                <Select
                  id="time"
                  value={this.state.horaId}
                  onChange={this.onChangeHoraId}
                  required
                >
                  {this.state.horaIdAnterior ? (
                    <DefaultOption
                      value={this.state.horaId}
                      label={this.state.hora.slice(0, 5)}
                      disabled={false}
                    />
                  ) : (
                    <DefaultOption label="Selecione o horário" />
                  )}
                  {this.state.horarios.map((horario) => (
                    <Option
                      key={horario.id}
                      value={horario.id}
                      label={horario.hora.slice(0, 5)}
                    />
                  ))}
                </Select>
              </InputRoot>
              {/* <GenericInput
                label="Horário"
                id="time"
                value={this.state.horaId}
                onChange={this.onChangeHoraId}
                required
                options={this.state.horarios}
                optionFormatter={(horario) => horario.hora.slice(0, 5)}
                shouldRenderInitialOption={this.state.horaIdAnterior}
                initialValue={this.state.horaId}
                initialLabel={this.state.hora.slice(0, 5)}
              /> */}

              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-primary custom-button2"
                >
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
