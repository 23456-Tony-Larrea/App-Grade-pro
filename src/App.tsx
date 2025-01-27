import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatbotView from "./views/chat/Chatbot";
import LoginView from "./views/home/Login";
import RegisterView from "./views/home/Register";
import ChatView from "./views/chat/Chat";
import NotFoundPage from "./views/components/NotFoundView";
import ProtectedRoute from "./helpers/ProtectedRoute"; // Importa el helper
import UnauthorizedPage from "./views/components/UnauthorizedPage";

const App: React.FC = () => {
  const isAuthenticated = false; // Cambia esto según tu lógica de autenticación

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
        {/* Página de error 401 */}
        <Route path="/401" element={<UnauthorizedPage />} />
        {/* Página 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
