import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import HomeLayout from "./layout/homeLayout";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import Classes from "./pages/classes";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import AdminPrivateRoute from "./components/adminPrivateRoute";
import Teachers from "./pages/teachers";
import Students from "./pages/students";
import AddStudent from "./pages/addStudent";
import AddTeacher from "./pages/addTeacher";
import AddCourse from "./pages/addCourse";
import AddClass from "./pages/addClass";
import CourseDetail from "./pages/courseDetails";

function App() {
  return (
    <div className='w-[100%] h-full min-h-screen bg-gray-100'>
      <Router>
        <Routes>
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<Navigate to="dashboard" />} /> 
            <Route path="dashboard" element={<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>} />
            <Route path="courses" element={<AdminPrivateRoute><Courses /></AdminPrivateRoute>} />
            <Route path="courses/:id" element={<AdminPrivateRoute><CourseDetail /></AdminPrivateRoute>} />
            <Route path="classes" element={<AdminPrivateRoute><Classes /></AdminPrivateRoute>} />
            <Route path="teachers" element={<AdminPrivateRoute><Teachers /></AdminPrivateRoute>} />
            <Route path="students" element={<AdminPrivateRoute><Students /></AdminPrivateRoute>} />
            <Route path="add-student" element={<AdminPrivateRoute><AddStudent /></AdminPrivateRoute>}/>
            <Route path="add-teacher" element={<AdminPrivateRoute><AddTeacher /></AdminPrivateRoute>}/>
            <Route path="add-course" element={<AdminPrivateRoute><AddCourse /></AdminPrivateRoute>}/>
            <Route path="add-class" element={<AdminPrivateRoute><AddClass /></AdminPrivateRoute>}/>
          </Route>

          {/* Public routes for sign-in and sign-up */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
