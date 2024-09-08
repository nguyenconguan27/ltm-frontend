import axios from "axios";
import { API_URL } from "../constants/endpoints";
import http from "../utils/http";

export const examApi = {
  getExamsByUser: (userId) => http.get(`${API_URL}/users/${userId}/exams`),
  getAll: () => http.get(`${API_URL}/exams`),
  getExamDetail: (examId) => http.get(`${API_URL}/exams/${examId}`),
  updateExam: ({ examId, name, code, examTypeId, startTime, endTime }) =>
    http.put(`${API_URL}/exams/${examId}`, {
      name,
      code,
      examTypeId,
      startTime,
      endTime,
    }),
  addExam: ({ name, code, examTypeId, startTime, endTime }) =>
    http.post(`${API_URL}/exams`, {
      name,
      code,
      examTypeId,
      startTime,
      endTime,
    }),
};
