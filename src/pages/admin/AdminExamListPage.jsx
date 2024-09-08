import React from "react";
import Header from "../../layouts/Header";
import AdminExamList from "../../components/admin/AdminExamList";

const AdminExamListPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20 p-8">
        <AdminExamList />
      </div>
    </div>
  );
};

export default AdminExamListPage;
