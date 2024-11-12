import http from "../http-common";

class FuncionarioDataService {
  getAll() {
    return http.get("/api/funcionarios");
  }

  create(data) {
    return http.post("/api/funcionarios", data);
  }

  update(id, data) {
    return http.put(`/api/funcionarios/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/funcionarios/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/funcionarios`);
  }
}

export default new FuncionarioDataService();