import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails,  } from '../redux/actions/userActions';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserEdit, FaBan } from 'react-icons/fa';

function UserDetails() {
  const { role, id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const token = useSelector(state => state.user.user.token);

  useEffect(() => {
    dispatch(fetchUserDetails(id, token));
  }, [dispatch, id, role, token]);

  const handleDisableUser = () => {
    // dispatch(disableUser(id));
    toast.success("User disabled successfully!");
  };

  const handleDeferAdmission = () => {
    // dispatch(deferAdmission(id));
    toast.success("Admission deferred successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          {loading ? 'Loading...' : `${user?.firstname} ${user?.lastname}`}
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-600">First Name</h3>
                <p className="text-gray-800">{user.firstname}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Last Name</h3>
                <p className="text-gray-800">{user.lastname}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Email</h3>
                <p className="text-gray-800">{user.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Role</h3>
                <p className="text-gray-800 capitalize">{role}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleDisableUser}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <FaBan />
                Disable User
              </button>

              {role === 'student' && (
                <button
                  onClick={handleDeferAdmission}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Defer Admission
                </button>
              )}

              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <FaUserEdit />
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
