import React from "react";
import Header from "../layouts/Header";
import ExamList from "../components/exam/examlist";

const ExamListPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <ExamList />
      </div>
    </div>
  );
};

export default ExamListPage;
