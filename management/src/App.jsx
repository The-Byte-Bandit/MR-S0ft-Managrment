import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import HomeLayout from "./layout/homeLayout";


function App() {
  return (
    <div className='w-[100%] h-full'>
       <Router>
        <Routes>
          {/* <Route path="/home" element={<HomeLayout />}> */}
          <Route path="/" element={<HomeLayout />}>
            
          </Route>
          {/* <Route path="/" element={<SignPage />} />
          <Route path="admin" element={<AdLogin/>} />
          <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
