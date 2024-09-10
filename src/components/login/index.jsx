import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getIP, validateStudentCode } from "../../services/UserServices";
import { AuthContext } from "../../context/AuthProvider";
import { authApi } from "../../api/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ADMIN_CONTESTS, PRACTICE_EXERCISES } from "../../constants/routes";
import { userApi } from "../../api/user.api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IP, setIP] = useState("Detecting...");
  const [invalidStudentCode, setInvalidStudentCode] = useState(false);
  const { loginAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: ({ username, ipAddress, password }) =>
      authApi.login({
        username: username,
        ipAddress: ipAddress,
        password: password,
      }),
  });

  useEffect(() => {
    const fetchIP = async () => {
      const userIP = await getIP();
      setIP(userIP);
    };
    fetchIP();
  }, []);

  //   const login = async () => {
  //     try {
  //       //   const response = await fetch(`${API_URL}/auth/login`, {
  //       //     method: "POST",
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //     },
  //       //     body: JSON.stringify({
  //       //       username: username,
  //       //       ipAddress: IP,
  //       //       password: password,
  //       //     }),
  //       //   });

  //       const result = await response.data;
  //       console.log(result);
  //       if (response.status !== 200) {
  //         toast.error(result.message, {
  //           autoClose: 2000,
  //         });
  //       } else {
  //         if (result.status === 200) {
  //           toast.success("Đăng nhập thành công!", {
  //             autoClose: 2000,
  //           });
  //           loginAuth(result.data);
  //           if (result.data.user.role === "ROLE_USER")
  //             navigate("/practice/questions");
  //           else navigate("/admin/exams");
  //         } else {
  //           toast.error(result.message, {
  //             autoClose: 2000,
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       // handle
  //     }
  //   };

  const login = async () => {
    try {
      const loginResponse = await loginMutation.mutateAsync(
        { username: username, ipAddress: IP, password: password },
        {
          onSuccess: (data) => {
            toast.success(data.data.message, {
              autoClose: 2000,
            });
          },
          onError: (error) => {
            toast.error(error.response.data.message, {
              autoClose: 2000,
            });
          },
        }
      );
      const userData = await userApi.getDetail(
        loginResponse.data?.data?.userId
      );
      loginAuth({
        user: userData.data.data,
        accessToken: loginResponse.data.data.accessToken,
        refreshToken: loginResponse.data.data.refreshToken,
      });
      if (userData.data.data.role === "ROLE_USER") {
        navigate(PRACTICE_EXERCISES);
      } else {
        navigate(ADMIN_CONTESTS);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginUser = (e) => {
    e.preventDefault();
    if (IP === "Detecting...") {
      toast.error("Vui lòng chờ detect IP!", {
        autoClose: 2000,
      });
    } else if (validateStudentCode(username)) {
      if (username !== "" && IP !== "" && password !== "") {
        login();
        setInvalidStudentCode(false);
      }
    } else {
      setInvalidStudentCode(true);
    }
  };

  return (
    <form className="bg-white w-[450px] p-8 rounded-lg  shadow-[0px_2px_10px_#00000014]">
      <div className="text-center text-xl font-bold mb-4">
        Thông tin của bạn
      </div>
      <div className="flex items-center gap-x-4">
        <div className="w-10 bg-white">
          <img src="/static/images/icons/user.png" alt="" />
        </div>
        <div className="flex-1 ">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border-2 border-black border-solid outline-none focus:border-[#0A68FF]"
            placeholder="Nhập mã sinh viên"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      {invalidStudentCode && (
        <div className="text-sm text-orange-400 float-right">
          <p>Mã sinh viên phải đúng định dạng, ví dụ: B20DCCN999</p>
        </div>
      )}
      <div className="flex items-center gap-x-4 mt-6">
        <div className="w-10 bg-white">
          <img src="/static/images/icons/password.png" alt="" />
        </div>
        <div className="flex-1 ">
          <input
            type="password"
            className="w-full px-4 py-2 rounded-md border-2 border-black border-solid outline-none focus:border-[#0A68FF]"
            placeholder="Nhập mật khẩu"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-4 mt-8">
        <div className="w-10 bg-white ro">
          <img src="/static/images/icons/ip-address.png" alt="" />
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border-2 border-black border-solid outline-none focus:border-[#0A68FF] cursor-not-allowed"
            placeholder="IP của bạn"
            disabled
            value={IP}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <Link to={`/register`}>Đăng ký</Link>
        <button
          className={`${
            username?.length !== 0 && IP?.length !== 0
              ? `bg-[#0A68FF]`
              : `bg-[#808089]`
          }  px-4 py-2 rounded-md text-white outline-none`}
          onClick={handleLoginUser}
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
};

export default Login;
