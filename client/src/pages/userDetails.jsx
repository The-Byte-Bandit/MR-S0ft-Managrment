import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, fetchStudentDetails, deactivateUser, reActivateUser} from '../redux/actions/userActions';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import DeferAdmissionForm from '../components/deferAdmission';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserEdit, FaBan, FaCheckCircle } from 'react-icons/fa';

function UserDetails() {
  const { role, id } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const studentDetails = useSelector((state) => state.user.studentDetails);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const token = useSelector((state) => state.user.user.token);
  const status = useSelector((state) => state.user.status);
  const [showDeferModal, setShowDeferModal] = useState(false);

  const handleDeferAdmission = () => {
    setShowDeferModal(true);
  };

  const isStudent = role.toLowerCase() === 'student';
  const user = isStudent ? studentDetails : userDetails;

  useEffect(() => {
    if (isStudent) {
      dispatch(fetchStudentDetails(id, token));
    } else {
      dispatch(fetchUserDetails(id, token));
    }
  }, [dispatch, id, isStudent, token]);

  const handleDisableUser = () => {
    if(user.isActive){
      dispatch(deactivateUser(id,role, token))
    }else{
      dispatch(reActivateUser(id,role, token))
    }
   
  };


  const formatValue = (key, value) => {
    // console.log(key, value);
    
    if (key === 'isActive') {
      return value ? 'Active' : 'Deactivated';
    }
    if (key === 'isDeferred') {
      return value ? 'Deferred' : 'Active';
    }
    if (typeof value === 'string' && Date.parse(value)) {
      return new Date(value).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
    return Array.isArray(value) ? value.map((item) => item.className || item).join(', ') : value || 'N/A';
  };

  const formatKey = (key) => {

    
    if (key === 'isActive') return 'Status';
    if (key === 'isDeferred') return 'Deferment Status';
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  useEffect(() => {
    if (status === 201) {
      toast.success("Student deffered successfully!");
      
    } else if (error) {
      toast.error(error);
    }
  }, [status, error]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          {loading ? 'Loading...' : `${user?.firstname || ''} ${user?.lastname || ''}`}
        </h1>
        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="space-y-4">
            {/* Basic User Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(user).map(([key, value]) => (
                <div key={key}>
                  <h3 className="text-lg font-semibold text-gray-600 capitalize">{formatKey(key)}</h3>
                  <p className="text-gray-800">{formatValue(key, value)}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">

            <button
              onClick={handleDisableUser}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200"
              style={{
                backgroundColor: user.isActive ? '#DC2626' : '#16A34A', // Red for disable, green for activate
                color: 'white'
              }}
            >
              {user.isActive ? <FaBan /> : <FaCheckCircle />}
              {user.isActive ? 'Disable User' : 'Activate User'}
            </button>
            {isStudent && (
        <button
          onClick={handleDeferAdmission}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Defer Admission
        </button>
      )}

              
            </div>
          </div>
        )}
        
      {showDeferModal && (
        <DeferAdmissionForm
          onClose={() => setShowDeferModal(false)}
          studentId={id}
          token={token}
        />
      )}
      </div>
    </div>
  );
}

export default UserDetails;
