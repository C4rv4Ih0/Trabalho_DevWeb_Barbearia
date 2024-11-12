import http from "../http-common";

class FuncionarioDataService {
  getAll() {
    return http.get("/api/tipos-corte");
  }

  create(data) {
    return http.post("/api/tipos-corte", data);
  }

  update(id, data) {
    return http.put(`/api/tipos-corte/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/tipos-corte/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/tipos-corte`);
  }
}

export default new FuncionarioDataService();