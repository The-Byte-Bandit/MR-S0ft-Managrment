// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCourseById, deleteCourse } from '../redux/actions/courseActions';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function CourseDetail() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.user.user.token);
//   const courses = useSelector((state) => state.user.courses);
//   const loading = useSelector((state) => state.user.loading);
//   const error = useSelector((state) => state.user.error);
//   const status = useSelector((state) => state.user.status);

//   // Find the course by id from the courses array in the global state
//   const course = courses.find((course) => course._id === id);

//   useEffect(() => {
//     // If the course is not already in the array, fetch it from the server
//     if (!course) {
//       dispatch(fetchCourseById(id, token));
//     }
//   }, [dispatch, id, token, course]);

//   useEffect(() => {
//     if (status === 204) {
//       toast.success('Course deleted successfully');
//       navigate('/home/courses'); // Redirect to courses list after deletion
//     }
//   }, [status, navigate]);

//   const handleDelete = () => {
//     dispatch(deleteCourse(id, token));
//   };

//   return (
//     <div className="p-6 bg-gray-50">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : course ? (
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
//           <p>{course.description || 'No description available'}</p>
//           <button
//             onClick={handleDelete}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//           >
//             Delete Course
//           </button>
//         </div>
//       ) : (
//         <p>No course found</p>
//       )}
//     </div>
//   );
// }

// export default CourseDetail;
