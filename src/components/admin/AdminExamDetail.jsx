import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminExamDetail = () => {
  const { examId } = useParams();
  const [examQuestions, setExamQuestions] = useState([]);
  const [examUsers, setExamUsers] = useState([]);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_URL}/question-exam/questions?examId=${examId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          // console.log(result)
          if (result.status === 200) {
            setExamQuestions(result.data.items);
          }
        }
      } catch (error) {}
    };
    fetchQuestions();
  }, [accessToken, examId]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch(
        `${API_URL}/user-exam/users?examId=${examId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
          setExamUsers(result.data.items);
        }
      }
    };
    fetchAllUsers();
  }, [accessToken, examId]);

  const handleAssignQuestionToUser = async () => {
    try {
      const response = await fetch(`${API_URL}/exams/assign?id=${examId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        if (result.status === 200) {
          toast.success("Tạo đề thành công", {
            autoClose: 2000,
          });
        } else {
          toast.error(result.message, {
            autoClose: 2000,
          });
        }
      } else {
        toast.error(result.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // hanlde
    }
  };

  return (
    <div className="bg-white">
      <div className="relative">
        <h1 className="text-2xl font-bold mx-5 pt-5">
          Danh sách đã tham gia exam {examId}
        </h1>
        <div className="absolute top-4 right-2">
          <Link
            to={`/admin/exams/${examId}/manage`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Chỉnh sửa
          </Link>
          <Link
            to={`/admin/exams/${examId}/ranking`}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Chi tiết
          </Link>
          <button
            className="ml-2 mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleAssignQuestionToUser}
          >
            Tạo đề
          </button>
        </div>
      </div>
      <div className="flex justify-between shadow-lg p-5 rounded-lg">
        <div className="w-1/2 pr-2">
          <h2 className="text-xl font-semibold mb-3">Danh sách sinh viên</h2>
          <table className="w-full border-collapse mb-3 text-center">
            <thead>
              <tr>
                <th className="border px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">IP</th>
              </tr>
            </thead>
            <tbody>
              {examUsers.map((examUsers, id) => (
                <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                  <td className="border px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-2">{examUsers.user.id}</td>
                  <td className="border px-4 py-2">
                    {examUsers.user.username.toUpperCase()}
                  </td>
                  <td className="border px-4 py-2">{examUsers.user.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/2 pl-2">
          <h2 className="text-xl font-semibold mb-3">Danh sách bài tập</h2>
          <table className="w-full border-collapse mb-3 text-center">
            <thead>
              <tr>
                <th className="border px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Tên bài</th>
                <th className="border px-4 py-2">Group</th>
              </tr>
            </thead>
            <tbody>
              {examQuestions.map((questionExam, id) => (
                <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                  <td className="border px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="border px-4 py-2">
                    {questionExam.question.id}
                  </td>
                  <td className="border px-4 py-2">
                    {questionExam.question.name}
                  </td>
                  <td className="border px-4 py-2">
                    {questionExam.question.group.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminExamDetail;
