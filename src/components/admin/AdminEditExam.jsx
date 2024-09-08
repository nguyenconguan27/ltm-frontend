import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { examApi } from "../../api/exam.api";
import { examTypeApi } from "../../api/examType.api";
const AdminEditExam = () => {
  const { examId } = useParams();
  const [activeTab, setActiveTab] = useState("exam");
  const { data: examDetailData } = useQuery({
    queryKey: ["exams", examId],
    queryFn: () => examApi.getExamDetail(examId),
    enabled: examId !== undefined,
  });
  const [exam, setExam] = useState({
    examId: "",
    code: "",
    name: "",
    examTypeId: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    setExam({
      examId: examDetailData?.data.data.id || "",
      name: examDetailData?.data.data.name || "",
      code: examDetailData?.data.data.code | "",
      examTypeId: examDetailData?.data.data.examType.id || "",
      startTime: examDetailData?.data.data.startTime || "",
      endTime: examDetailData?.data.data.endTime || "",
    });
  }, [examDetailData]);

  const [examtype, setExamtype] = useState({
    name: "",
    code: "",
  });

  const queryClient = useQueryClient();
  const examUpdateMutation = useMutation({
    mutationFn: () => examApi.updateExam(exam),
    onSuccess: () => {
      toast.success("Update new exam successfully!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const examAddMutation = useMutation({
    mutationFn: () => examApi.addExam(exam),
    onSuccess: () => {
      toast.success("Add new exam successfully!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: examTypeData } = useQuery({
    queryKey: ["examtype"],
    queryFn: () => examTypeApi.getAll(),
  });

  const examTypeMutation = useMutation({
    mutationFn: (newexamtype) => examTypeApi.addExamType(newexamtype),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examtype"] });
      toast.success("Add new Exam type successfully!");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "startTime" || name === "endTime") {
      setExam((preExam) => ({
        ...preExam,
        [name]: new Date(value).toISOString(),
      }));
    } else {
      setExam((preExam) => ({
        ...preExam,
        [name]: value,
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(endpoint, {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify(exam),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       if (!examId && result.status === 201) {
  //         toast.success("Thêm exam thành công!", {
  //           autoClose: 2000,
  //         });
  //         navigate(`/admin/exams`);
  //       } else if (examId && result.status === 200) {
  //         toast.success("Cập nhật exam thành công!", {
  //           autoClose: 2000,
  //         });
  //         navigate(`/admin/exams`);
  //       } else {
  //         toast.error(result.message, {
  //           autoClose: 2000,
  //         });
  //       }
  //       // Xử lý khi thành công, ví dụ: reset form hoặc hiển thị thông báo
  //     } else {
  //       toast.error("Đã có lỗi xảy ra", {
  //         autoClose: 2000,
  //       });
  //       // Xử lý khi thất bại, ví dụ: hiển thị thông báo lỗi
  //     }
  //   } catch (error) {
  //     console.error("Error adding exam:", error);
  //   }
  // };

  const handleExamtypeChange = (event) => {
    const { name, value } = event.target;
    setExamtype((prevExamtype) => ({ ...prevExamtype, [name]: value }));
  };

  const handleExamtypeSubmit = (e) => {
    e.preventDefault();
    examTypeMutation.mutate(examtype);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (examId) {
      examUpdateMutation.mutate();
    } else {
      examAddMutation.mutate();
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex justify-between items-end">
        <button
          className={`tab-button ${activeTab === "examtype" ? "active" : ""}`}
          onClick={() => setActiveTab("exam")}
        >
          Thêm Cuộc Thi
        </button>
        <button
          className={`tab-button ${activeTab === "examtype" ? "active" : ""}`}
          onClick={() => setActiveTab("examtype")}
        >
          Thêm Loại Cuộc Thi
        </button>
      </div>

      {activeTab === "exam" && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">
            {examId ? `Cập nhật` : `Thêm Exam`}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Tên Exam
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={exam.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Code
            </label>
            <input
              type="number"
              id="code"
              name="code"
              value={exam.code}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Thời gian bắt đầu
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={
                exam.startTime
                  ? new Date(exam.startTime).toISOString().slice(0, 16)
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Thời gian kết thúc
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={
                exam.endTime
                  ? new Date(exam.endTime).toISOString().slice(0, 16)
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="examTypeId"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Chủ Đề
            </label>
            <select
              id="examTypeId"
              name="examTypeId"
              value={exam.examTypeId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Chọn Loại Cuộc Thi</option>
              {examTypeData?.data?.data.items.map((examtype) => (
                <option key={examtype.id} value={examtype.id}>
                  {examtype.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {examId ? `Cập nhật` : `Thêm Exam`}
          </button>
        </form>
      )}
      {activeTab === "examtype" && (
        <div className="tab-content">
          <form onSubmit={handleExamtypeSubmit}>
            <h2 className="text-2xl font-bold mb-4">Thêm Loại Cuộc</h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Tên Loại Cuộc
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={examtype.name}
                onChange={handleExamtypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="code "
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Mã
              </label>
              <input
                id="code"
                name="code"
                value={examtype.code}
                onChange={handleExamtypeChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Thêm Loại Cuộc Thi
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminEditExam;
