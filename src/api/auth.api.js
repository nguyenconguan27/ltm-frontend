import axios from "axios";
import { API_URL } from "../constants/endpoints";
import http from "../utils/http";

export const authApi = {
  login: ({ username, ipAddress, password }) =>
    http.post(`${API_URL}/auth/login`, { username, ipAddress, password }),
  register: ({ username, ipAddress, password }) =>
    http.post(`${API_URL}/auth/register`, { username, ipAddress, password }),
};
