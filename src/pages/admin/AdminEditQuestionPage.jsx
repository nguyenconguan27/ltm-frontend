import React from "react";
import Header from "../../layouts/Header";
import AdminEditQuestion from "../../components/admin/AdminEditQuestion";

const AdminEditQuestionPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <AdminEditQuestion />
      </div>
    </div>
  );
};
export default AdminEditQuestionPage;
