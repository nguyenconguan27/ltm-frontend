// AppProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider"; // Đảm bảo import đúng AuthProvider
import { API_URL } from "../constants/endpoints";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(null);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const examId = 1;

  const { accessToken } = useContext(AuthContext); // Sử dụng AuthContext

  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (accessToken) {
          const response = await fetch(`${API_URL}/exams/detail/${examId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          console.log(response.ok);
          if (response.ok) {
            const responseJson = await response.json();
            if (responseJson.status === 200) {
              setStartTime(new Date(responseJson.data.startTime));
            }
          }
        }
      } catch (error) {
        // handle
      }
    };
    fetchExam();
  }, [accessToken, examId]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const difference = startTime - currentTime;

        if (difference <= 0) {
          setIsExamOpen(true);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  return (
    <AppContext.Provider value={{ isExamOpen, startTime }}>
      {/* {!user || user?.role === 'ROLE_ADMIN' || isExamOpen ? children : <WaitingPage />} */}
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
