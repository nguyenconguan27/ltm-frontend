import { API_URL } from "../constants/endpoints";
import http from "../utils/http";

export const examTypeApi = {
  getAll: () => http.get(`${API_URL}/exams/types`),
  addExamType: ({ name, code }) =>
    http.post(`${API_URL}/exams/types`, { name, code }),
};
