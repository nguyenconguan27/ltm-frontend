import React from "react";
import Header from "../../layouts/Header";
import AdminExamDetail from "../../components/admin/AdminExamDetail";

const AdminExamDetailPage = () => {
  return (
    <div className="">
      <Header />
      <div className="mt-20 p-8">
        <AdminExamDetail />
      </div>
    </div>
  );
};

export default AdminExamDetailPage;
