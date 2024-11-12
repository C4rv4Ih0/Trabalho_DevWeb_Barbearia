import http from "../http-common";

class FuncionarioDataService {
  getAll() {
    return http.get("/api/horarios");
  }

  create(data) {
    return http.post("/api/horarios", data);
  }

  update(id, data) {
    return http.put(`/api/horarios/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/horarios/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/horarios`);
  }

  findHorariosDisponiveis(data){
    return http.get(`/api/horarios-disponiveis/${new Date(data).toISOString().split('T')[0]}`);
  }
}

export default new FuncionarioDataService();