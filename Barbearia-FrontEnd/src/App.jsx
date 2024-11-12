// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from "./components/navbar/NavBar";  
import Inicio from "./components/Inicio/Inicio";
import SobreNos from "./components/sobre_nos/SobreNos";
import Agendamentos from "./components/agendamentos/Agendamentos";
import NovoAgendamento from "./components/novoAgendamento/NovoAgendamento";
import VerAgendamentos from "./components/verAgendamentos/verAgendamentos";
import Contato from "./components/contatos/Contato";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/NovoAgendamento" element={<NovoAgendamento />} />
          <Route path="/verAgendamentos" element={<VerAgendamentos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
