import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/endpoints";
import { AuthContext } from "../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { examApi } from "../../../api/exam.api";

const ExamList = () => {
  // const [userExams, setUserExams] = useState([])
  const { accessToken, user } = useContext(AuthContext);
  const { data: examsData } = useQuery({
    queryKey: ["exams", user.id],
    queryFn: () => examApi.getExamsByUser(user.id),
  });
  // useEffect(() => {
  //     const fetchExams = async () => {
  //         try {
  //             const response = await fetch(`${API_URL}/user-exam/all?userId=${user.id}`, {
  //                 headers: {
  //                     "Authorization": `Bearer ${accessToken}`,
  //                     "Content-Type": "application/json"
  //                 }
  //             });
  //             if (response.ok) {
  //                 const result = await response.json();
  //                 if (result.status === 200) {
  //                     setUserExams(result.data.items);
  //                 }
  //             }
  //         } catch (error) {
  //             console.error('Error loading:', error);
  //         }
  //     };
  //     fetchExams()
  // }, [accessToken, user.id])

  //   const handleRegisterExam = async (examId) => {
  //     try {
  //       const response = await fetch(`${API_URL}/user-exam/register`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         body: JSON.stringify({
  //           examId: examId,
  //           userId: user.id,
  //         }),
  //       });

  //       const result = await response.json();
  //       if (response.ok) {
  //         if (result.status === 200) {
  //           setUserExams(
  //             userExams.map((userExam) =>
  //               userExam.exam.id === examId
  //                 ? { ...userExam, registered: true }
  //                 : userExam
  //             )
  //           );
  //           toast.success("Đăng kí cuộc thi thành công!", { autoClose: 2000 });
  //         } else {
  //           toast.error(result.message, { autoClose: 2000 });
  //         }
  //       } else {
  //         toast.error(result.message, { autoClose: 2000 });
  //       }
  //     } catch (error) {
  //       console.error("Error adding topic:", error);
  //       toast.error("Đã có lỗi xảy ra", { autoClose: 2000 });
  //     }
  //   };

  const renderAction = (userExam) => {
    const startTime = new Date(userExam.exam.startTime);
    const endTime = new Date(userExam.exam.endTime);
    const now = new Date();
    if (endTime < now) {
      return <button className="bg-gray-400 px-4 py-1 rounded-md">Over</button>;
    } else if (now > startTime) {
      if (userExam.registered) {
        return (
          <Link
            to={`/exam/${userExam.exam.id}/exercises`}
            className="bg-green-400 px-4 py-1 rounded-md"
          >
            Vào thi
          </Link>
        );
      } else {
        return (
          <button className="bg-green-400 px-4 py-1 rounded-md cursor-not-allowed">
            Đang diễn ra
          </button>
        );
      }
    } else {
      if (userExam.registered) {
        return (
          <button className="bg-green-400 px-4 py-1 rounded-md cursor-not-allowed">
            Đã đăng kí
          </button>
        );
      } else {
        return (
          <button
            className="bg-blue-400 px-4 py-1 rounded-md"
            // onClick={() => handleRegisterExam(userExam.exam.id)}
          >
            Đăng ký
          </button>
        );
      }
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="relative">
        <h1 className="text-2xl font-bold mx-5 pt-5">Danh sách exam</h1>
      </div>
      <div className="p-5">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-100">STT</th>
              <th className="border px-4 py-2 bg-gray-100">Tên exam</th>
              <th className="border px-4 py-2 bg-gray-100">
                Thời gian bắt đầu exam
              </th>
              <th className="border px-4 py-2 bg-gray-100">
                Thời gian kết thúc exam
              </th>
              <th className="border px-4 py-2 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {examsData?.data?.data.map((userExam, id) => (
              <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                <td className="border px-4 py-2">{userExam.exam.id}</td>
                <td className="border px-4 py-2">
                  <div className="text-blue-500 hover:text-blue-700">
                    {userExam.exam.title}
                  </div>
                </td>
                <td className="border px-4 py-2">{userExam.exam.startTime}</td>
                <td className="border px-4 py-2">{userExam.exam.endTime}</td>
                <td className="border px-4 py-2 flex justify-around">
                  {renderAction(userExam)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamList;
