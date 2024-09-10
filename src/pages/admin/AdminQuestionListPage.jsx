import React from "react";
import Header from "../../layouts/Header";
import AdminQuestionList from "../../components/admin/AdminQuestionList";

const AdminQuestionListPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <AdminQuestionList />
      </div>
    </div>
  );
};

export default AdminQuestionListPage;
