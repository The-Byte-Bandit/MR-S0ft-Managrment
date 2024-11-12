import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById, deleteCourse } from '../redux/actions/userActions';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CourseDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token);
  const courses = useSelector((state) => state.user.courses);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  const [classCount, setClassCount] = useState(0);

  // Find the course by id from the courses array in the global state
  const course = courses.find((course) => course._id === id);

  useEffect(() => {
    // If the course is not already in the array, fetch it from the server
    if (!course) {
      dispatch(fetchCourseById(id, token));
    } else {
      // Optionally, fetch analytical data if needed (e.g., number of classes)
      fetchClassData();
    }
  }, [dispatch, id, token, course]);

  useEffect(() => {
    if (status === 204) {
      toast.success('Course deleted successfully');
      navigate('/home/courses'); // Redirect to courses list after deletion
    }
  }, [status, navigate]);

  const handleDelete = () => {
    dispatch(deleteCourse(id, token));
  };

  const fetchClassData = async () => {
    try {
      // Assume a fetchClassCount function is defined to get the class count for this course
      const response = await fetch(`/api/classes?courseId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setClassCount(data.classCount);
    } catch (err) {
      console.error("Failed to fetch class data", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : course ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
          <p className="mb-4">{course.description || 'No description available'}</p>

          {/* Analytical Data */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Course Analytics</h3>
            <p><strong>Number of Classes:</strong> {classCount}</p>
            <p><strong>Enrolled Students:</strong> {course.enrolledStudents || 'N/A'}</p>
            {/* Additional analytics can go here */}
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete Course
          </button>
        </div>
      ) : (
        <p>No course found</p>
      )}
    </div>
  );
}

export default CourseDetail;
