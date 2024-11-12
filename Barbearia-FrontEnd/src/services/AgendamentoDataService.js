import http from "../http-common";

class AgendamentoDataService {
  getAll() {
    return http.get("/api/agendamentos");
  }

  get(id){
    return http.get(`/api/agendamentos/${id}`);
  }

  create(data) {
    return http.post("/api/agendamentos", data);
  }

  update(id, data) {
    return http.put(`/api/agendamentos/${id}`, data);
  }

  deleteAll() {
    return http.delete(`/api/agendamentos`);
  }

  getAgendamentosComDetalhes(token) {
    return http.get(`/api/agendamentos-com-detalhes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  delete(id, token) {
    return http.delete(`/api/agendamentos/${id}`, {
      headers: { Authorization: `Bearer ${token}`},
    });
  }
}

export default new AgendamentoDataService();
