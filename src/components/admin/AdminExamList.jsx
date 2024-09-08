import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { API_URL } from "../../constants/endpoints";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { examApi } from "../../api/exam.api";

const AdminExamList = () => {
  //   const [exams, setExams] = useState([]);
  //   const { accessToken } = useContext(AuthContext);

  const { data: examsData } = useQuery({
    queryKey: ["exams"],
    queryFn: () => examApi.getAll(),
  });
  //   useEffect(() => {
  //     const fetchExercises = async () => {
  //       try {
  //         const response = await fetch(`${API_URL}/exams/all`, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         if (response.ok) {
  //           const result = await response.json();
  //           if (result.status === 200) {
  //             setExams(result.data);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error loading:", error);
  //       }
  //     };
  //     fetchExercises();
  //   }, [accessToken]);

  const handleAddExam = () => {};

  return (
    <div className="bg-white rounded-lg">
      <div className="relative">
        <h1 className="text-2xl font-bold mx-5 pt-5">Danh sách exam</h1>
        <div className="absolute top-4 right-2">
          <Link
            to={"/admin/exams/add"}
            className="ml-2 mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleAddExam}
          >
            Thêm exam
          </Link>
        </div>
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
            {examsData?.data?.data.items.map((exam, id) => (
              <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                <td className="border px-4 py-2">{exam.id}</td>
                <td className="border px-4 py-2">
                  <div className="text-blue-500 hover:text-blue-700">
                    {exam.title}
                  </div>
                </td>
                <td className="border px-4 py-2">{exam.startTime}</td>
                <td className="border px-4 py-2">{exam.endTime}</td>
                <td className="border px-4 py-2 flex justify-around">
                  <Link
                    to={`/admin/exams/${exam.id}/detail`}
                    className="bg-blue-400 px-4 py-1 rounded-md"
                  >
                    Xem
                  </Link>
                  <Link
                    to={`/admin/exams/${exam.id}/edit`}
                    className="bg-green-500 px-4 py-1 rounded-md"
                  >
                    Sửa
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminExamList;
