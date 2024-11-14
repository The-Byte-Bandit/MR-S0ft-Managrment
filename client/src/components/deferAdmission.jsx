import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deferAdmission} from '../redux/actions/userActions';


import 'react-toastify/dist/ReactToastify.css';

function DeferAdmissionForm({ onClose, studentId, token }) {
  const dispatch = useDispatch();
  const [deferReason, setDeferReason] = useState('');
  const [defermentDate, setDefermentDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      deferAdmission(studentId, { deferReason, defermentDate, returnDate }, token)
    ).then(() => onClose());
  };


    
  return (
    <div className="fixed inset-0 bg-[#0000004c]  bg-opacity-30 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Defer Admission</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="deferReason" className="block text-gray-700 font-semibold">
              Reason for Deferral
            </label>
            <textarea
              id="deferReason"
              className="w-full mt-2 p-2 border rounded"
              value={deferReason}
              onChange={(e) => setDeferReason(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="defermentDate" className="block text-gray-700 font-semibold">
              Deferment Date
            </label>
            <input
              type="date"
              id="defermentDate"
              className="w-full mt-2 p-2 border rounded"
              value={defermentDate}
              onChange={(e) => setDefermentDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="returnDate" className="block text-gray-700 font-semibold">
              Expected Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              className="w-full mt-2 p-2 border rounded"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeferAdmissionForm;
