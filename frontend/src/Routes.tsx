import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import QuestionPage from "./pages/QuestionPage";
import AnswerPage from "./pages/AnswerPage";
import ResponsePage from "./pages/ResponsePage";
const RoutesModule = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionPage />} />
          <Route path="/:id" element={<AnswerPage />} />
          <Route path="/response/:id" element={<ResponsePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RoutesModule;
