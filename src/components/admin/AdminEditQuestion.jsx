import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { questionGroupApi } from "../../api/questionGroup.api";
import { questionApi } from "../../api/question.api";

const AdminEditQuestion = () => {
  const { questionId } = useParams();
  const method = questionId ? "PUT" : "POST";

  const [activeTab, setActiveTab] = useState("question");
  const [addGroupCount, setAddGroupCount] = useState(0);
  const { data: questionDetailData } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => questionApi.getById(questionId),
    enabled: questionId !== undefined,
  });

  const [question, setQuestion] = useState({
    id: "",
    name: "",
    content: "",
    groupId: "",
    code: "",
    level: 0,
    subGroup: "",
    type: 0,
    status: 0,
    solution: "",
    hint: "",
  });
  const [group, setGroup] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    setQuestion({
      id: questionDetailData?.data.data.id || "",
      name: questionDetailData?.data.data.name || "",
      content: questionDetailData?.data.data.content || "",
      groupId: questionDetailData?.data.data.group.id || "",
      code: questionDetailData?.data.data.code || "",
      level: questionDetailData?.data.data.level || 0,
      subGroup: questionDetailData?.data.data.subGroup || "",
      type: questionDetailData?.data.data.type || 0,
      status: questionDetailData?.data.data.status || 0,
      solution: questionDetailData?.data.data.solution || "",
      hint: questionDetailData?.data.data.hint || "",
    });
  }, [questionDetailData]);

  const { data: groupsData } = useQuery({
    queryKey: ["groups"],
    queryFn: () => questionGroupApi.getAll(),
  });
  const groups = groupsData?.data.data.items || [];
  const queryClient = useQueryClient();
  const addQuestionGroupMutation = useMutation({
    mutationFn: () => questionGroupApi.add(group),
    onSuccess: () => {
      toast.success("Add new group successfully");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Add new group falied");
    },
  });
  const addQuestionMutation = useMutation({
    mutationFn: () => questionApi.add(question),
    onSuccess: () => {
      toast.success("Add new question successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Add new question failed");
    },
  });
  const updateQuestionMutation = useMutation({
    mutationFn: () => questionApi.update(question),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Update question successfully");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Update question failed");
    },
  });

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({ ...prevQuestion, [name]: value }));
  };

  const handleGroupChange = (event) => {
    const { name, value } = event.target;
    setGroup((prevGroup) => ({ ...prevGroup, [name]: value }));
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (method === "POST") {
      addQuestionMutation.mutate();
    } else {
      updateQuestionMutation.mutate();
    }
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    addQuestionGroupMutation.mutate();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="tabs flex justify-between">
        <button
          className={`tab-button ${activeTab === "question" ? "active" : ""}`}
          onClick={() => setActiveTab("question")}
        >
          {questionId ? "Cập nhật bài tập" : "Thêm Bài Tập"}
        </button>
        <button
          className={`tab-button ${activeTab === "group" ? "active" : ""}`}
          onClick={() => setActiveTab("group")}
        >
          Thêm Chủ Đề
        </button>
      </div>
      {activeTab === "question" && (
        <div className="tab-content">
          <h2 className="text-2xl font-bold mb-4">
            {questionId ? "Cập nhật bài tập" : "Thêm Bài Tập"}
          </h2>
          <form onSubmit={handleQuestionSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Tên Bài Tập
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={question?.name}
                onChange={handleQuestionChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Nội Dung
              </label>
              <textarea
                id="content"
                name="content"
                value={question?.content}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Mã
              </label>
              <input
                id="code"
                name="code"
                value={question?.code}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subGroup"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Nhóm Con
              </label>
              <input
                id="subGroup"
                name="subGroup"
                value={question?.subGroup}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="level"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Độ khó
              </label>
              <input
                id="level"
                name="level"
                value={question?.level}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Trạng thái
              </label>
              <input
                id="status"
                name="status"
                value={question?.status}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="solution"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Lời giải
              </label>
              <input
                id="solution"
                name="solution"
                value={question?.solution}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="hint"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Gợi ý
              </label>
              <input
                id="hint"
                name="hint"
                value={question?.hint}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="groupId"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Chủ Đề
              </label>
              <select
                id="groupId"
                name="groupId"
                value={question?.groupId}
                onChange={handleQuestionChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Chọn Chủ Đề</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {questionId ? "Cập nhật bài tập" : "Thêm Bài Tập"}
            </button>
          </form>
        </div>
      )}
      {activeTab === "group" && (
        <div className="tab-content">
          <h2 className="text-2xl font-bold mb-4">Thêm Chủ Đề</h2>
          <form onSubmit={handleGroupSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Tên Chủ Đề
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={group.name}
                onChange={handleGroupChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Mã
              </label>
              <input
                id="code"
                name="code"
                value={group.code}
                onChange={handleGroupChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Thêm Chủ Đề
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminEditQuestion;
