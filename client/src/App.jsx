// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import './App.css';

// import HomeLayout from "./layout/homeLayout";
// import Courses from "./pages/courses";
// import SignIn from "./pages/signIn";
// import SignUp from "./pages/signUp";
// import AdminPrivateRoute from "./components/adminPrivateRoute";


// function App() {
//   return (
//     <div className='w-[100%] h-full'>
//        <Router>
//         <Routes>
//         <Route path="/home" element={<HomeLayout />}>
//             <Route index element={<Navigate to="courses" />} />
//             <Route path="courses" element={<AdminPrivateRoute><Courses/></AdminPrivateRoute>}>
//             <Route path="classes" element={<AdLogin/>} />*/}
//           </Route>
//           {/* <Route path="/" element={<SignPage />} />
//           <Route path="admin" element={<AdLogin/>} />*/}
//           <Route path="/" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />  
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import HomeLayout from "./layout/homeLayout";
import Courses from "./pages/courses";
import Classes from "./pages/classes";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import AdminPrivateRoute from "./components/adminPrivateRoute";
import Teachers from "./pages/teachers";
import Students from "./pages/students";
import AddStudent from "./pages/addStudent";

function App() {
  return (
    <div className='w-[100%] h-full'>
       <Router>
        <Routes>
          
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<Navigate to="courses" />} /> 
            <Route path="courses" element={<AdminPrivateRoute><Courses /></AdminPrivateRoute>} />
            <Route path="classes" element={<AdminPrivateRoute><Classes /></AdminPrivateRoute>} />
            <Route path="teachers" element={<AdminPrivateRoute><Teachers /></AdminPrivateRoute>} />
            <Route path="students" element={<AdminPrivateRoute><Students /></AdminPrivateRoute>} />
            <Route path="add-student" element={<AdminPrivateRoute><AddStudent /></AdminPrivateRoute>}/>
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
