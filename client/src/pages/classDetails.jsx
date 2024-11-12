import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassDetails, deleteClass } from '../redux/actions/userActions';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ClassDetails() {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token);
  const userRole = useSelector((state) => state.user.user.user.role);
  const classDetails = useSelector((state) => state.user.classDetails);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchClassDetails(classId, token));
  }, [dispatch, classId, token]);

  const handleDeleteClass = () => {
    if (window.confirm("Are you sure you want to delete this class? This action cannot be undone.")) {
      dispatch(deleteClass(classId, token))
        .then(() => {
          toast.success("Class deleted successfully");
        //   navigate('/home/classes');
        })
        .catch((err) => toast.error(err));
    }
  };

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
              <p className="text-lg mt-2"><strong>Class Name:</strong> {classDetails?.className}</p>
              <p className="text-lg"><strong>Course Name:</strong> {classDetails?.courseName}</p>
              <p className="text-lg"><strong>Start Date:</strong> {new Date(classDetails?.startDate).toLocaleDateString()}</p>
              <p className="text-lg"><strong>End Date:</strong> {new Date(classDetails?.endDate).toLocaleDateString()}</p>
              <p className="text-lg">
                <strong>Status:</strong> 
                <span className={`ml-2 px-3 py-1 rounded-full ${classDetails?.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {classDetails?.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>

            {/* Teachers Section */}
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Teachers</h2>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                {classDetails?.teachers?.map((teacher) => (
                  <li key={teacher.teacherId} className="text-lg">
                    {teacher.teacherName}
                  </li>
                ))}
              </ul>
            </div>

            {/* Students Section */}
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Students</h2>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                {classDetails?.students?.map((student) => (
                  <li key={student.studentId} className="text-lg">
                    {student.studentName}
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">Materials</h2>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                {classDetails?.materials?.map((material) => (
                  <li key={material._id} className="text-lg">
                    <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {material.name || (material.type === 'pdf' ? 'View PDF' : 'Watch Video')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delete Button for Admin Only */}
            {userRole === 'admin' && (
              <div className="mt-6">
                <button
                  onClick={handleDeleteClass}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete Class
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassDetails;
