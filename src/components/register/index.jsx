import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getIP, validateStudentCode } from "../../services/UserServices";
import { AuthContext } from "../../context/AuthProvider";
import { API_URL } from "../../constants/endpoints";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import { userApi } from "../../api/user.api";
import { PRACTICE_EXERCISES } from "../../constants/routes";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [IP, setIP] = useState("Detecting...");
  const [invalidStudentCode, setInvalidStudentCode] = useState(false);
  const { loginAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: ({ username, ipAddress, password }) =>
      authApi.register({ username, ipAddress, password }),
  });

  useEffect(() => {
    const fetchIP = async () => {
      const userIP = await getIP();
      setIP(userIP);
    };
    fetchIP();
  }, []);

  const registerUser = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          ipAddress: IP,
          password: password,
        }),
      });
      console.log(response);
      const responseJson = await response.json();
      console.log(responseJson);
      if (!response.ok) {
        toast.error(responseJson.message, {
          autoClose: 2000,
        });
      } else {
        if (responseJson.status === 201) {
          toast.success("Đăng kí thành công!", {
            autoClose: 2000,
          });
          loginAuth(responseJson.data);
          if (responseJson.data.user.role === "ROLE_USER") navigate("/exams");
          else navigate("/admin/exams");
        } else {
          toast.error(responseJson.message, {
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      // handle
    }
  };

  const handleRegister = async () => {
    try {
      const registerResponse = await registerMutation.mutateAsync(
        {
          username: username,
          ipAddress: IP,
          password: password,
        },
        {
          onSuccess: (data) => {
            toast.success("Đăng kí thành công!", {
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
      console.log(registerResponse);
      const userData = await userApi.getDetail(
        registerResponse?.data?.data?.userId
      );
      loginAuth({
        user: userData.data.data,
        accessToken: registerResponse.data.data.accessToken,
        refreshToken: registerResponse.data.data.refreshToken,
      });
      navigate(PRACTICE_EXERCISES);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (IP === "Detecting...") {
      toast.error("Vui lòng chờ detect IP!", {
        autoClose: 2000,
      });
    } else if (password !== confirmPassword) {
      toast.error("Hai mật khẩu không khớp!", {
        autoClose: 2000,
      });
    } else if (validateStudentCode(username)) {
      if (username !== "" && IP !== "" && password !== "") {
        handleRegister();
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
      <div className="flex items-center gap-x-4 mt-6">
        <div className="w-10 bg-white">
          <img src="/static/images/icons/confirmPassword.png" alt="" />
        </div>
        <div className="flex-1 ">
          <input
            type="password"
            className="w-full px-4 py-2 rounded-md border-2 border-black border-solid outline-none focus:border-[#0A68FF]"
            placeholder="Xác nhận lại mật khẩu"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <Link to={`/login`}>Đăng nhập</Link>
        <button
          className={`${
            username?.length !== 0 && IP?.length !== 0
              ? `bg-[#0A68FF]`
              : `bg-[#808089]`
          }  px-4 py-2 rounded-md text-white outline-none`}
          onClick={handleAddUser}
        >
          Đăng ký
        </button>
      </div>
    </form>
  );
};

export default Register;
