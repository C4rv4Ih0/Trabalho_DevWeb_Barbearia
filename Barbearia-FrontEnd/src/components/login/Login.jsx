// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import UserDataService from '../../services/UserDataService';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      senha: "",
    }
  }

  onChangeEmail = (e) => {
    this.setState({
        email: e.target.value
    });
  };

  onChangeSenha = (e) => {
    this.setState({
        senha: e.target.value
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const dados = {
      email: this.state.email,
      senha: this.state.senha,
    };
  
      try {
        const response = await UserDataService.authenticate(dados);

        if (response && response.authenticated) {
          console.log("Login bem-sucedido!");
          window.location.href = "/verAgendamentos";
        } else {
          console.error("Erro: Resposta inesperada da API", response);
          alert("Erro na autenticação. Verifique suas credenciais.");
        }
      } catch (error) {
        console.error("Erro na autenticação:", error);
        alert("Erro na autenticação. Tente novamente mais tarde.");
      }
  };

  render(){
    return(
      <div className="login-container">
      <div className="login-card">
        <h3 className="text-center">Login</h3>
        <form onSubmit={this.handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Digite seu email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Digite sua senha"
              value={this.state.senha}
              onChange={this.onChangeSenha}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
      <div className="logo_CBS"></div>
    </div>
    );
  }
}