import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./views/home/LoginForm";
import Dashboard from "./views/home/Dashboard";
import UsersActivate from "./views/config/user-activate/UserActivate";

import "./App.css";
import RolePermissions from "./views/config/role-permissions/rolePermissions";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role-permission" element={<RolePermissions />} />
        <Route path="/user-activate" element={<UsersActivate />} />

      </Routes>
    </Router>
  );
};

export default App;
