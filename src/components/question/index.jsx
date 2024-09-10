import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";
import Question from "./Question";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Questions = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const { accessToken, user } = useContext(AuthContext);

  const exerciesData = useQuery();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        `${API_URL}/user-question-exam/detail?userId=${user.id}&examId=${examId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        if (result.status === 200) {
          setQuestions(result.data.items);
        }
      }
    };
    fetchQuestions();
  }, [accessToken, user.id, examId]);
  return (
    <div>
      {questions?.map((question, index) => (
        <Question key={index} question={question} />
      ))}
    </div>
  );
};

export default Questions;
