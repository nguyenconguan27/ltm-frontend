import React from "react";
import Header from "../../layouts/Header";
import AdminEditExam from "../../components/admin/AdminEditExam";

const AdminEditExamPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <AdminEditExam />
      </div>
    </div>
  );
};

export default AdminEditExamPage;
