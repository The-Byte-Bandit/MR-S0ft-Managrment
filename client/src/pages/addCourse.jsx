import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

function AddCourse() {
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]); // List of courses to add
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token);
  const loading = useSelector((state) => state.user.loading);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const addCourseToList = () => {
    if (title.trim()) {
      setCourses([...courses, { title }]);
      setTitle('');
    }
  };

  const removeCourseFromList = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const submitCourses = (e) => {
    e.preventDefault();
    courses.forEach((course) => {
      dispatch(createCourse(course, token));
    });
    setCourses([]);
  };

  // Notifications for success or error
  React.useEffect(() => {
    if (status === 201) {
      toast.success("Courses submitted successfully!");
    } else if (error) {
      toast.error(error);
    }
  }, [status, error]);

  return (
    <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full sm:max-w-[640px] lg:max-w-[800px] xl:max-w-[1000px] mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold text-blue50">Add Course(s)</h2>

        <form onSubmit={submitCourses} className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="form-control p-3 border rounded-lg w-full"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type="button"
              onClick={addCourseToList}
              className="bg-blue50 text-white p-3 rounded-full hover:bg-blue25 transition duration-200 flex items-center justify-center"
            >
              <FaPlus />
            </button>
          </div>

          {/* Display list of added courses */}
          <ul className="mt-4 space-y-2 max-w-[300px]">
            {courses.map((course, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg truncate"
              >
                <span>{course.title}</span>
                <button
                  onClick={() => removeCourseFromList(index)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  <FaMinus />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className={`w-full sm:w-auto px-6 py-3 mt-6 rounded-lg transition duration-200 ${
              loading || courses.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue50 text-white hover:bg-blue25'
            }`}
            disabled={loading || courses.length === 0}
          >
            {loading ? 'Submitting Course(s)...' : 'Submit All Course(s)'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
