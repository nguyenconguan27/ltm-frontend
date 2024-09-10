import React from "react";

const Question = (props) => {
  const assignedQuestion = props.question;

  return (
    <div className="flex items-center px-6 py-8">
      <div className="rounded-md bg-white px-6 py-4 w-full">
        <div className="text-xl font-bold">
          {assignedQuestion.question.alias}
        </div>
        <div className="text-lg whitespace-pre-line leading-10">
          <div>
            Mã bài tập <strong>{assignedQuestion.alias}</strong>
          </div>
          {assignedQuestion.question.content.split("\\n").map((e, id) => (
            <p key={id}>{e}</p>
          ))}
        </div>
        <div className="float-right">
          Status:{" "}
          {assignedQuestion.ac ? (
            <span className="text-green-500"> "Hoàn thành" </span>
          ) : (
            <span className="">Chưa hoàn thành</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
