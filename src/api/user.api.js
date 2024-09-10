import axios from "axios";
import { API_URL } from "../constants/endpoints";
import http from "../utils/http";

export const userApi = {
  getDetail: (userId) => http.get(`${API_URL}/users/${userId}`),
  getAll: () => http.get(`${API_URL}/users`),
};
