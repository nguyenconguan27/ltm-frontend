import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";
import Question from "../question/Question";
import { Link, useParams } from "react-router-dom";
import { PRACTICE_LOG, PRACTICE_SCOREBOARD } from "../../constants/routes";

const PracticeQuestions = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const { accessToken, user } = useContext(AuthContext);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_URL}/practice-user-question/detail?userId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          if (result.status === 200) {
            setQuestions(result.data.items);
          }
        }
      } catch (error) {
        // handle
      }
    };
    fetchQuestions();
  }, [accessToken, user.id, examId]);
  return (
    <div className="">
      <div className="flex items-center justify-between px-6 fixed">
        <h2 className="text-2xl font-bold">Danh sách bài luyện tập</h2>
        <div className="flex gap-x-4">
          <Link
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            to={PRACTICE_SCOREBOARD}
          >
            Kết quả
          </Link>
          <Link
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            to={PRACTICE_LOG}
          >
            Log
          </Link>
        </div>
      </div>
      <div>
        {questions.map((question, index) => (
          <Question key={index} question={question} />
        ))}
      </div>
    </div>
  );
};

export default PracticeQuestions;
