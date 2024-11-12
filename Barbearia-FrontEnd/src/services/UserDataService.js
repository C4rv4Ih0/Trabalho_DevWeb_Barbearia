import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/api/users");
  }

  get(id){
    return http.get(`/api/users/${id}`);
  }

  create(data) {
    return http.post("/api/users", data);
  }

  update(id, data) {
    return http.put(`/api/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/users`);
  }

  async authenticate(data) {
    const response = await http.post("/api/authenticate", data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/Login';
  }
}

export default new UserDataService();