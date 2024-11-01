import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, fetchMinimalTeachers, createClass } from '../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddClass() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token);
  const courses = useSelector((state) => state.user.courses);
  const teachers = useSelector((state) => state.user.minimalTeachers);
  const loading = useSelector((state) => state.user.loading);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    teachers: [],
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    dispatch(fetchCourses(token));
    dispatch(fetchMinimalTeachers(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (status === 201) {
      toast.success("Class created successfully!");
      setFormData({ courseId: '', title: '', teachers: [], startDate: null, endDate: null });
    } else if (error) {
      toast.error(error);
    }
  }, [status, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeacherSelection = (teacherId) => {
    setFormData((prevData) => ({
      ...prevData,
      teachers: prevData.teachers.includes(teacherId)
        ? prevData.teachers.filter((id) => id !== teacherId)
        : [...prevData.teachers, teacherId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClass(formData, token));
  };

  const isButtonDisabled = !formData.courseId || !formData.title || formData.teachers.length === 0 || loading;

  return (
    <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full sm:max-w-[640px] lg:max-w-[800px] xl:max-w-[1000px] mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold text-blue50">Add New Class</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className="form-control p-3 border rounded-lg"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Class Title"
              className="form-control p-3 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-blue50 font-medium">Assign Teachers</label>
            <div className="flex flex-wrap gap-2">
              {teachers.map((teacher) => (
                <div
                  key={teacher._id}
                  onClick={() => handleTeacherSelection(teacher._id)}
                  className={`p-2 border rounded-full cursor-pointer text-sm ${
                    formData.teachers.includes(teacher._id)
                      ? 'bg-blue100 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {teacher.firstname} {teacher.lastname}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              placeholderText="Start Date"
              className="form-control p-3 border rounded-lg"
              required
            />
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              placeholderText="End Date"
              className="form-control p-3 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full sm:w-auto px-6 py-3 mt-6 rounded-lg transition duration-200 ${
              isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue50 text-white hover:bg-blue25'
            }`}
            disabled={isButtonDisabled}
          >
            {loading ? 'Creating Class...' : 'Create Class'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClass;
