import React, { createContext, useEffect, useState } from "react";
import { getIP } from "../services/UserServices";
import { toast } from "react-toastify";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  getUserIdFromLS,
  saveAccesTokenToLS,
  saveRefreshTokenToLS,
  saveUserIdToLS,
} from "../utils";
import { userApi } from "../api/user.api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Sửa thành true để hiển thị "Loading..." khi ứng dụng khởi động
  const [IP, setIP] = useState("Detecting...");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const userIP = await getIP();
        if (userIP) {
          setIP(userIP);
        }
      } catch (error) {
        toast.error("Vui lòng kiếm tra kết nối mạng");
      }
    };
    fetchIP();
  }, []);

  const getUser = async () => {
    const userId = getUserIdFromLS();
    if (userId) {
      try {
        const userData = await userApi.getDetail(userId);
        setUser(userData.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUser();
    setAccessToken(getAccessTokenFromLS());
    setRefreshToken(getRefreshTokenFromLS());
    setIsLoading(false);
  }, []);

  const loginAuth = (utils) => {
    setUser(utils.user);
    setAccessToken(utils.accessToken);
    setRefreshToken(utils.refreshToken);
    saveAccesTokenToLS("Bearer " + utils.accessToken);
    saveRefreshTokenToLS(utils.refreshToken);
    saveUserIdToLS(utils.user.id);
  };

  const logout = () => {
    clearLS();
    setUser(null);
    setAccessToken("");
    setRefreshToken("");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginAuth, logout, accessToken, refreshToken, IP }}
    >
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
