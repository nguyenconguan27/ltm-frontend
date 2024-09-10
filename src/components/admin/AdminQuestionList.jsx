import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { questionApi } from "../../api/question.api";

const AdminQuestionList = () => {
  //   const [questions, setQuestions] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const { data: questionsData } = useQuery({
    queryKey: ["questions"],
    queryFn: () => questionApi.getAll(),
  });
  console.log(questionsData);
  const questions = questionsData?.data.data.items || [];

  // useEffect(() => {
  //     const fetchAllQuestions = async () => {
  //         try {
  //             const response = await fetch(`${API_URL}/questions/all`, {
  //                 headers: {
  //                     "Authorization": `Bearer ${accessToken}`
  //                 }
  //             });
  //             if (response.ok) {
  //                 const data = await response.json();
  //                 // console.log(data)
  //                 setQuestions(data.data.items)
  //             }
  //         } catch(error) {
  //             // handle
  //         }

  //     }
  //     fetchAllQuestions()
  // }, [accessToken])
  return (
    <div className="bg-white p-5">
      <div className="relative">
        <h1 className="text-2xl font-bold mx-5 pt-5">Danh sách bài tập</h1>
        <div className="absolute top-4 right-2">
          <Link
            to={"/admin/questions/add"}
            className="ml-2 mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Thêm bài tập
          </Link>
        </div>
      </div>

      <table className="w-full border-collapse mb-5 text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center bg-gray-100">STT</th>
            <th className="border px-4 py-2 bg-gray-100">Tên bài tập</th>
            <th className="border px-4 py-2 bg-gray-100">Chủ đề</th>
            <th className="border px-4 py-2 bg-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, id) => (
            <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
              <td className="border px-4 py-2 text-center">{question.id}</td>
              <td className="border px-4 py-2">{question.name}</td>
              <td className="border px-4 py-2">{question.group.name}</td>
              <td className="border px-4 py-2 flex justify-evenly">
                <Link
                  to={`/admin/questions/${question.id}/detail`}
                  className="bg-green-500 px-4 py-1 rounded-md"
                >
                  Sửa
                </Link>
                <button className="bg-orange-400 px-4 py-1 rounded-md">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuestionList;
