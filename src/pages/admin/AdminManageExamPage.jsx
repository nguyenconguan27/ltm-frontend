import React from "react";
import Header from "../../layouts/Header";
import AdminManageExam from "../../components/admin/AdminManageExam";

const AdminManageExamPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <AdminManageExam />
      </div>
    </div>
  );
};

export default AdminManageExamPage;
