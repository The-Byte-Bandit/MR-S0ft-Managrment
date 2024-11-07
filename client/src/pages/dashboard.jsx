import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, fetchClasses, fetchMinimalStudents, fetchMinimalTeachers } from '../redux/actions/userActions';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token);
  const courses = useSelector((state) => state.user.courses);
  const classes = useSelector((state) => state.user.classes);
  const students = useSelector((state) => state.user.minimalStudents);
  const teachers = useSelector((state) => state.user.minimalTeachers);

  useEffect(() => {
    dispatch(fetchCourses(token));
    dispatch(fetchClasses(token));
    dispatch(fetchMinimalStudents(token));
    dispatch(fetchMinimalTeachers(token));
  }, [dispatch, token]);

  // Calculate total metrics
  const totalCourses = courses.length;
  const totalClasses = classes.length;
  const totalStudents = students.length;
  const totalTeachers = teachers.length;

  // Prepare data for the charts
  const classData = courses.map((course) => ({
    name: course.title,
    classes: classes.filter((cls) => cls.courseId === course._id).length,
  }));

  console.log(classData);
  
  const studentTeacherData = [
    { name: 'Students', value: totalStudents },
    { name: 'Teachers', value: totalTeachers },
  ];

  const COLORS = ['#36A2EB', '#FF6384'];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

      {/* Top-level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{totalCourses}</h2>
          <p className="text-gray-700">Courses</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{totalClasses}</h2>
          <p className="text-gray-700">Classes</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{totalStudents}</h2>
          <p className="text-gray-700">Students</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">{totalTeachers}</h2>
          <p className="text-gray-700">Teachers</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Classes per Course */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Classes per Course</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="classes" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Students vs Teachers */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Students vs Teachers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={studentTeacherData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {studentTeacherData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {classes.slice(0, 5).map((cls) => (
            <li key={cls._id} className="p-2 bg-gray-100 rounded-lg flex justify-between">
              <span>{cls.className}</span>
              <span className="text-gray-500">
                {cls.startDate ? `Starts: ${new Date(cls.startDate).toLocaleDateString()}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
