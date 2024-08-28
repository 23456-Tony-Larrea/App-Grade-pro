import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./views/home/LoginForm";
import Dashboard from "./views/home/Dashboard";
import UsersActivate from "./views/config/user-activate/UserActivate";

import "./App.css";
import RolePermissions from "./views/config/role-permissions/rolePermissions";
import NewUsers from "./views/config/user-activate/NewUser";
import EditUser from "./views/config/user-activate/EditUser";
import UserInactivateTable from "./views/config/user-inactivate/UserInactivate";
import CourseTable from "./views/academic-management/course/Course";
import Home from "./views/components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role-permission" element={<RolePermissions />} />
        <Route path="/user-activate" element={<UsersActivate />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/new-users" element={<NewUsers />} />
        <Route path="/user-inactivate" element={<UserInactivateTable />} />
        <Route path="/course" element={<CourseTable />} />
        

      </Routes>
    </Router>
  );
};

export default App;
