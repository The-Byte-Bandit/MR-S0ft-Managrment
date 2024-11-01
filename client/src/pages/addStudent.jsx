import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchClasses, resetStatus, resetError, createStudent } from '../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {
  const token = useSelector((state) => state.user.user.token);
  const classes = useSelector((state) => state.user.classes);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    classes: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (status === 201) {
      toast.success("Student created successfully!");
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        classes: [],
      });
      dispatch(resetStatus());
    } else if (error) {
      toast.error(error);
    }
  }, [status, error, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) {
      dispatch(resetError());
    }
  };

  const handleClassSelection = (classId) => {
    setFormData((prevData) => ({
      ...prevData,
      classes: prevData.classes.includes(classId)
        ? prevData.classes.filter((id) => id !== classId)
        : [...prevData.classes, classId],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent(formData, token));
  };

  const isButtonDisabled = !formData.firstname || !formData.lastname || !formData.email || loading;

  return (
    <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full sm:max-w-[640px] lg:max-w-[800px] xl:max-w-[1000px] mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold text-blue50">Add Student</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              className="form-control p-3 border rounded-lg"
              placeholder="First name"
              name="firstname"
              value={formData.firstname}
              onChange={onChange}
              required
            />
            <input
              type="text"
              className="form-control p-3 border rounded-lg"
              placeholder="Last name"
              name="lastname"
              value={formData.lastname}
              onChange={onChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              className="form-control p-3 border rounded-lg"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
            <input
              type="text"
              className="form-control p-3 border rounded-lg"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-blue50 font-medium">Select Classes</label>
            <div className="flex flex-wrap gap-2">
              {classes?.map((classItem) =>
                classItem.isActive ? (
                  <div
                    key={classItem._id}
                    onClick={() => handleClassSelection(classItem._id)}
                    className={`p-2 border rounded-full cursor-pointer text-sm ${
                      formData.classes.includes(classItem._id)
                        ? 'bg-blue100 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {classItem.className}
                  </div>
                ) : null
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full sm:w-auto px-6 py-3 mt-6 text-white rounded-lg transition duration-200 ${
              isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue50 hover:bg-blue25'
            }`}
            disabled={isButtonDisabled}
          >
            {loading ? 'Adding Student...' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;



