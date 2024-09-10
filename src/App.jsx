import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthProvider";
import QuestionsPage from "./pages/QuestionPage";
import ScoreBoardPage from "./pages/ScoreBoardPage";
import LogPage from "./pages/LogPage";
import LoginPage from "./pages/LoginPage";
import AdminExamListPage from "./pages/admin/AdminExamListPage";
import AdminExamDetailPage from "./pages/admin/AdminExamDetailPage";
import AdminUserListPage from "./pages/admin/AdminUserListPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
// import AppProvider from './context/AppProvider';
import PublicRoute from "./routes/PublicRoute";
import AdminRankingPage from "./pages/admin/AdminRankingPage";
import AdminEditExamPage from "./pages/admin/AdminEditExamPage";
import AdminQuestionListPage from "./pages/admin/AdminQuestionListPage";
import AdminEditQuestionPage from "./pages/admin/AdminEditQuestionPage";
import ExamListPage from "./pages/ExamListPage";
import AdminManageExamPage from "./pages/admin/AdminManageExamPage";
import PracticeQuestionsPage from "./pages/PracticeQuestionPage";
import PracticeScoreBoardPage from "./pages/PracticeScoreBoardPage";
import TestPage from "./pages/TestPage";
import TestLayout from "./pages/TestLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        placeholderData: (prev) => prev,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {/* <AppProvider> */}
          <Routes>
            <Route path="/test" element={<TestPage />} />
            <Route path="/testlayout" element={<TestLayout />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<PracticeQuestionsPage />} />
              <Route
                path="practice/questions"
                element={<PracticeQuestionsPage />}
              />
              <Route
                path="practice/scoreboard"
                element={<PracticeScoreBoardPage />}
              />
              <Route
                path="exam/:examId/questions"
                element={<QuestionsPage />}
              />
              <Route
                path="exam/:examId/scoreboard"
                element={<ScoreBoardPage />}
              />
              <Route path="log" element={<LogPage />} />
              <Route path="exams" element={<ExamListPage />} />
              <Route path="/admin/" element={<AdminRoute />}>
                <Route index path="exams" element={<AdminExamListPage />} />
                <Route path="exams/add" element={<AdminEditExamPage />} />
                <Route
                  path="exams/:examId/edit"
                  element={<AdminEditExamPage />}
                />
                <Route
                  path="exams/:examId/detail"
                  element={<AdminExamDetailPage />}
                />
                <Route
                  path="exams/:examId/manage"
                  element={<AdminManageExamPage />}
                />
                <Route
                  path="exams/:examId/ranking"
                  element={<AdminRankingPage />}
                />
                <Route path="users" element={<AdminUserListPage />} />
                <Route path="questions" element={<AdminQuestionListPage />} />
                <Route
                  path="questions/add"
                  element={<AdminEditQuestionPage />}
                />
                <Route
                  path="questions/:questionId/detail"
                  element={<AdminEditQuestionPage />}
                />
              </Route>
            </Route>

            <Route path="/" element={<PublicRoute />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* </AppProvider> */}
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
