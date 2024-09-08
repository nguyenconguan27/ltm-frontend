import axios from "axios";
import { API_URL } from "../constants/endpoints";
import http from "../utils/http";

export const exercisesApi = {
  getExercisesInExam: () => http.get(`${API_URL}/`),
};
