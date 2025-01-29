import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatbotView from "./views/chat/Chatbot";
import LoginView from "./views/home/Login";
import RegisterView from "./views/home/Register";
import ChatView from "./views/chat/Chat";
import NotFoundPage from "./views/components/NotFoundView";
import ProtectedRoute from "./helpers/ProtectedRoute"; 
import UnauthorizedPage from "./views/components/UnauthorizedPage";
import RolePermissionView from "./views/home/roleAndPermission";
import UserUsage from "./views/users/UserUsage";

const App: React.FC = () => {
  const isAuthenticated = false; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ChatbotView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ChatView />
            </ProtectedRoute>
          }
        />
         <Route
          path="/role-permission"
          element={
              <RolePermissionView />
          }
        />
          <Route
          path="/sidebar"
          element={
              <UserUsage />
          }
          
        />
        {/* Página de error 401 */}
        <Route path="/401" element={<UnauthorizedPage />} />
        {/* Página 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
