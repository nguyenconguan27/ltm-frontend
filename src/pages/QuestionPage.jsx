import React from "react";
import Header from "../layouts/Header";
import Questions from "../components/question/index";

const QuestionsPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <Questions />
      </div>
    </div>
  );
};

export default QuestionsPage;
