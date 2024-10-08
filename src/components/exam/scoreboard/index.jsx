import React, { useContext, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import UserQuestions from "./UserQuestion";
import { useParams } from "react-router-dom";
import { API_URL, SOCKET_URL } from "../../../constants/endpoints";
import { AuthContext } from "../../../context/AuthProvider";

const ScoreBoard = () => {
  const { examId } = useParams();
  const [scoreBoard, setScoreBoard] = useState({});
  const { accessToken, user } = useContext(AuthContext);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${API_URL}/exams/scoreboard?examId=${examId}&userId=${user.id}`,
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
            setScoreBoard(data.data);
          }
        }
      } catch (error) {
        // hanlde
      }
    };
    fetchAllUsers();
    const socket = () => {
      return new SockJS(SOCKET_URL);
    };
    const client = Stomp.over(socket);
    client.debug(() => {});
    client.connect(
      {},
      () => {
        client.subscribe(`/group/scoreboard/${user.id}`, (msg) => {
          const result = JSON.parse(msg.body);
          setScoreBoard(result);
        });
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [accessToken, user.id, examId]);

  return (
    <div className="bg-white rounded-md p-4">
      <table className="relative min-w-full divide-y divide-gray-200 dark:divide-neutral-700 ">
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
            {scoreBoard?.userQuestionExams?.map((question, id) => (
              <th
                key={id}
                className="px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-neutral-500"
              >
                {" "}
                {question.alias}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <UserQuestions key={scoreBoard.id} scoreBoard={scoreBoard} />
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
