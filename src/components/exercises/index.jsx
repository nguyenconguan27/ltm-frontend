import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";
import Exercise from "./Exercise";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Exercises = () => {
  const { examId } = useParams();
  const [exercises, setExercises] = useState([]);
  const { accessToken, user } = useContext(AuthContext);

  const exerciesData = useQuery();

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch(
        `${API_URL}/user-exercise-exam/detail?userId=${user.id}&examId=${examId}`,
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
          setExercises(result.data.items);
        }
      }
    };
    fetchExercises();
  }, [accessToken, user.id, examId]);
  return (
    <div>
      {exercises?.map((exercise, index) => (
        <Exercise key={index} exercise={exercise} />
      ))}
    </div>
  );
};

export default Exercises;
