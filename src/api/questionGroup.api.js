import { API_URL } from "../constants/endpoints";
import http from "../utils/http";

export const questionGroupApi = {
  getAll: () => http.get(`${API_URL}/groups`),
  add: (group) => http.post(`${API_URL}/groups`, group),
};
