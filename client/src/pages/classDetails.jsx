import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchClassDetails,
  deleteClass,
  deleteStudentFromClass,
  deleteTeacherFromClass,
  fetchMinimalStudents,
  fetchMinimalTeachers,
  addTeachersToClass,
  addStudentToClass,
} from '../redux/actions/userActions';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ClassDetails() {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token);
  const userRole = useSelector((state) => state.user.user.role);
  const classDetails = useSelector((state) => state.user.classDetails);
  const studentsList = useSelector((state) => state.user.minimalStudents);
  const teachersList = useSelector((state) => state.user.minimalTeachers);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [searchStudent, setSearchStudent] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    dispatch(fetchClassDetails(classId, token));
    if (showAddStudentModal) dispatch(fetchMinimalStudents(token));
    if (showAddTeacherModal) dispatch(fetchMinimalTeachers(token));
  }, [dispatch, classId, token, showAddStudentModal, showAddTeacherModal]);

  const handleDeleteClass = () => {
    if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      dispatch(deleteClass(classId, token))
        .then(() => {
          toast.success('Class deleted successfully');
          navigate('/home/classes');
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to remove this student from the class?')) {
      dispatch(deleteStudentFromClass(classId, studentId, token));
    }
  };

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to remove this teacher from the class?')) {
      dispatch(deleteTeacherFromClass(classId, teacherId, token));
    }
  };

  const handleAddStudentSubmit = () => {
    if (selectedStudent) {
      dispatch(addStudentToClass(classId, selectedStudent, token)).then(() => {
        setShowAddStudentModal(false);
      });
    }
  };
  
  const handleAddTeacherSubmit = () => {
    if (selectedTeacher) {
      dispatch(addTeachersToClass(classId, selectedTeacher, token)).then(() => {
        setShowAddTeacherModal(false);
      });
    }
  };
  

  const filteredStudents = studentsList?.filter((student) =>
    student.firstname?.toLowerCase().includes(searchStudent.toLowerCase()) ||
    student.lastname?.toLowerCase().includes(searchStudent.toLowerCase())
  );
  const filteredTeachers = teachersList?.filter((teacher) =>
    teacher.firstname?.toLowerCase().includes(searchTeacher.toLowerCase()) ||
    teacher.lastname?.toLowerCase().includes(searchTeacher.toLowerCase())
  );
  

  if (loading) return <p>Loading class details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 w-full">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Class Details</h1>

        {classDetails && (
          <div>
            {/* Class Information */}
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Basic Information</h2>
              <p className="text-lg mt-2">
                <strong>Class Name:</strong> {classDetails?.className}
              </p>
              <p className="text-lg">
                <strong>Course Name:</strong> {classDetails?.courseName}
              </p>
              <p className="text-lg">
                <strong>Start Date:</strong> {new Date(classDetails?.startDate).toLocaleDateString()}
              </p>
              <p className="text-lg">
                <strong>End Date:</strong> {new Date(classDetails?.endDate).toLocaleDateString()}
              </p>
              <p className="text-lg">
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-3 py-1 rounded-full ${
                    classDetails?.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {classDetails?.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>

            {/* Teachers Section */}
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Teachers</h2>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                {classDetails?.teachers?.map((teacher) => (
                  <li key={teacher.teacherId} className="flex items-center justify-between">
                    <span className="text-lg">{teacher.teacherName}</span>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.teacherId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowAddTeacherModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Teacher
              </button>
            </div>

            {/* Students Section */}
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Students</h2>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                {classDetails?.students?.map((student) => (
                  <li key={student.studentId} className="flex items-center justify-between">
                    <span className="text-lg">{student.studentName}</span>
                    <button
                      onClick={() => handleDeleteStudent(student.studentId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowAddStudentModal(true)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add Student
              </button>
            </div>
          </div>
        )}
      </div>
{/* Add Student Modal */}
{showAddStudentModal && (
  <div className="fixed inset-0 bg-[#0000004c] bg-opacity-30 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Student</h2>
      <input
        type="text"
        placeholder="Search student..."
        value={searchStudent}
        onChange={(e) => {
          setSearchStudent(e.target.value);
          setSelectedStudent(''); // Reset selected student when searching
        }}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />
      <ul className="space-y-2 max-h-64 overflow-y-auto border-t border-gray-200 pt-2">
        {filteredStudents.map((student) => (
          <li
            key={student._id}
            className={`cursor-pointer p-2 rounded ${
              selectedStudent === student._id ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              setSelectedStudent(student._id);
              setSearchStudent(`${student.firstname} ${student.lastname}`);
            }}
          >
            {student.firstname} {' '} {student.lastname}
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddStudentSubmit}
        disabled={!selectedStudent} // Disable the button if no student is selected
        className={`mt-4 px-4 py-2 ${
          selectedStudent ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
        } text-white rounded-lg`}
      >
        Add
      </button>
    </div>
  </div>
)}


{/* Add Teacher Modal */}
{showAddTeacherModal && (
  <div className="fixed inset-0 bg-[#0000004c] bg-opacity-30 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Teacher</h2>
      <input
        type="text"
        placeholder="Search teacher..."
        value={searchTeacher}
        onChange={(e) => {
          setSearchTeacher(e.target.value);
          setSelectedTeacher(''); // Reset selected teacher when searching
        }}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />
      <ul className="space-y-2 max-h-64 overflow-y-auto border-t border-gray-200 pt-2">
        {filteredTeachers.map((teacher) => (
          <li
            key={teacher._id}
            className={`cursor-pointer p-2 rounded ${
              selectedTeacher === teacher._id ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              setSelectedTeacher(teacher._id);
              setSearchTeacher(`${teacher.firstname} ${teacher.lastname}`);
            }}
          >
            {teacher.firstname} {' '} {teacher.lastname}
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddTeacherSubmit}
        disabled={!selectedTeacher} // Disable the button if no teacher is selected
        className={`mt-4 px-4 py-2 ${
          selectedTeacher ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
        } text-white rounded-lg`}
      >
        Add
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default ClassDetails;
