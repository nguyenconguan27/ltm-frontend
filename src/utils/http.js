import axios from "axios";
import { getAccessTokenFromLS, saveAccesTokenToLS } from ".";
import { API_URL } from "../constants/endpoints";
import { toast } from "react-toastify";

class HTTP {
  instance;
  accessToken;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.authorization = this.accessToken;
        return config;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (
          url === "http://localhost:8080/v1/api/auth/login" ||
          url === "http://localhost:8080/v1/api/auth/login"
        ) {
          this.accessToken = "Bearer " + response.data.data.accessToken;
        } else if (url === "/auth/logout") {
          this.accessToken = "";
        }
        return response;
      },
      (error) => {
        toast.error(error.response?.data.message);
      }
    );
  }
}

const http = new HTTP().instance;

export default http;
