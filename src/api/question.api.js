import axios from "axios";
import { API_URL } from "../constants/endpoints";
import http from "../utils/http";

export const questionApi = {
  getQuestionsInExam: () => http.get(`${API_URL}/`),
  getAll: () => http.get(`${API_URL}/questions`),
  update: (question) =>
    http.put(`${API_URL}/questions/${question.id}`, question),
  add: (question) => http.post(`${API_URL}/questions`, question),
  getById: (questionId) => http.get(`${API_URL}/questions/${questionId}`),
};
