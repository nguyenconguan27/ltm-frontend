import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
import UserExercises from "../exam/scoreboard/UserExercises";

const AdminRanking = () => {
  const { examId } = useParams();
  const [rankings, setRankings] = useState([]);
  const { accessToken } = useContext(AuthContext);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${API_URL}/exams/scoreboard/all?examId=${examId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === 200) {
            setRankings(data.data.sort((a, b) => b.score - a.score));
          }
        }
      } catch (error) {}
    };

    fetchAllUsers();
  }, [accessToken, examId]);

  return (
    <div className="bg-white rounded-md p-4">
      <table className="relative min-w-full examId-y examId-gray-200 dark:divide-neutral-700 ">
        <thead className="border-b-2 border-solid border-black">
          <tr>
            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">
              STT
            </th>
            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500 ">
              Mã sinh viên
            </th>
            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">
              Score
            </th>
            {rankings[0]?.examUserExercises?.map((_, id) => (
              <th
                key={id}
                className="px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-neutral-500"
              >
                {" "}
                {id + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, id) => (
            <UserExercises
              key={id}
              username={ranking.username}
              ip={ranking.ip}
              id={ranking.id}
              score={ranking.score}
              exercises={ranking.examUserExercises}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRanking;
