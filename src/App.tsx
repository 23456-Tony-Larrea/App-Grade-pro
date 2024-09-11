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
import SubjectTable from "./views/academic-management/subjects/subjects";
import GradeOne from "./views/admin-qualifications/contribution-1/ContributionOne";
import GradeTwo from "./views/admin-qualifications/contribution-2/ContributionTwo";
import GradeThree from "./views/admin-qualifications/contribution-3/ContributionThree";
import Exam from "./views/admin-qualifications/final-exam/ContributionThree";
import StudentTable from "./views/academic-management/students/TableStudent";
import FormStudent from "./views/academic-management/students/FormStudent";
import FormTeacher from "./views/academic-management/Teacher/FormTeacher";
import TeacherTable from "./views/academic-management/Teacher/TableTeacher";
import TotalAttendance from "./views/attendance management/total-attendance/totalAttendance";
import ForgotDialog from "./views/home/ForgotDialog";
import ForgotUsername from "./views/forgot-username-password/forgot-username-view";
import ForgotPassword from "./views/forgot-username-password/forgot-password-view";
import UserActive from "./views/config/user-activate/UserActivate";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role-permission" element={<RolePermissions />} />
        <Route path="/user-active" element={<UserActive />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/new-users" element={<NewUsers />} />
        <Route path="/user-inactivate" element={<UserInactivateTable />} />
        <Route path="/course" element={<CourseTable />} />
        <Route path="/subject" element={<SubjectTable />} />
        <Route path="/grade-one" element={<GradeOne />} />
        <Route path="/grade-two" element={<GradeTwo />} />
        <Route path="/grade-three" element={<GradeThree />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/students" element={<StudentTable />} />
        <Route path="/new-students" element={<FormStudent mode="insert" />} />
        <Route path="/edit-student/:id" element={<FormStudent mode="edit" />} />
        <Route path="/teacher" element={<TeacherTable />} />
        <Route path="/new-teacher" element={<FormTeacher mode="insert" />} />
        <Route path="/edit-teacher/:id" element={<FormTeacher mode="edit" />} />
        <Route path="/total-attendece" element={<TotalAttendance />} />
        <Route path="/modal-username-password" element={<ForgotDialog />} />
        <Route path="/forgot-username" element={<ForgotUsername />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
    </Router>
  );
};

export default App;
