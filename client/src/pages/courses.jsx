// import React from 'react';
// import SmallCard from '../components/smallCard';
// import LargeCard from '../components/largeCard';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { add } from '../constants/constant';

// function Courses() {
//   const courses = useSelector((state) => state.user.courses);

//   return (
//     <div className="p-6 w-full h-full space-y-6">

//       {/* Header Section with Add Button */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
//         <Link to="/home/add-course" className="flex no-underline items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue50 rounded-lg hover:bgblue-25 transition duration-200">
//           <img src={add} alt="add course" className="w-5" />
//           Add New Course
//         </Link>
//       </div>
//       {/* <Link to="/home/add-course" className="   flex justify-end mb-4 no-underline">
//             <div className="px-4 py-2 gap-[6px] rounded-lg hover:bg-blue25 justify-center items-center transition duration-200  text-white  bg-blue50 flex flex-row">
//                 <img src={add} alt='add course' className='w-[11px]'/> Add Course
//             </div>
//         </Link> */}

//       {/* Course Count Card */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <SmallCard 
//           heading="Total Courses"
//           figure={courses?.length || 0}
//           className="shadow-md"
//         />
//       </div>

//       {/* List of Courses */}
//       <section>
//         <h1  className="text-2xl font-bold text-gray-700">Available Courses</h1>
//         {courses && courses.length > 0 ? (
//           <LargeCard courses={courses} />
//         ) : (
//           <p className="text-gray-500 text-center mt-10">No courses available</p>
//         )}
//       </section>
//     </div>
//   );
// }

// export default Courses;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { add } from '../constants/constant';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'chart.js/auto';

function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.user.courses);
  const token = useSelector((state) => state.user.user.token);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  useEffect(() => {
    dispatch(fetchCourses(token));
  }, [dispatch, token]);

  // Transform courses data to capture weekly class counts
  const weeklyClassData = courses.map(course => ({
    name: course.title,
    weeklyClasses: course.weeklyClasses || 0,
  }));

  // Pagination calculations
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div className="p-6 w-full h-full space-y-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Header Section with Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Courses Overview</h1>
        <Link
          to="/home/add-course"
          className="no-underline flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue50 rounded-lg hover:bg-blue25 transition duration-200"
        >
          <img src={add} alt="add course" className="w-5" />
          Add New Course
        </Link>
      </div>

      {/* Course Analytics - Weekly Classes Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Classes Created Weekly</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={weeklyClassData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: 'Courses', position: 'insideBottom', dy: 10 }} />
            <YAxis label={{ value: 'Weekly Classes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="weeklyClasses" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* List of Courses Table with Pagination */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Available Courses</h2>
        {courses && courses.length > 0 ? (
          <div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Classes Created Weekly
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course) => (
                    <tr key={course._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{course.title}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{course.weeklyClasses || 'N/A'}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          to={`/home/courses/${course._id}`}
                          className="hover:text-[#3a896c] no-underline p-2 rounded-md bg-[#cbf5e5] text-[#176448]"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              <nav className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1 ? 'bg-blue50 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No courses available</p>
        )}
      </section>
    </div>
  );
}

export default Courses;
