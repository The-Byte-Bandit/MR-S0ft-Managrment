import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMaterials } from '../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewCourseMaterials() {
  const { courseId } = useParams(); // Assuming courseId is provided as a route param
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.user.materials);
  const loading = useSelector((state) => state.user.loading);
  const token = useSelector((state) => state.user.user.token);

  // Fetch materials on mount or when courseId changes
  useEffect(() => {
    if (courseId) {
      dispatch(fetchMaterials(courseId, token));
    }
  }, [dispatch, courseId, token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Course Materials</h1>
        
        {loading ? (
          <p>Loading materials...</p>
        ) : materials?.length > 0 ? (
          <ul className="space-y-4">
            {materials.map((material) => (
              <li key={material._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">{material.name || 'Unnamed Material'}</h3>
                  <span className="text-gray-600">{material.type ? material.type.toUpperCase() : 'N/A'}</span>
                </div>
                <span className="truncate">
                  {material.type === 'pdf' ? (
                    <a href={`http://localhost:5000${material.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View PDF
                    </a>
                  ) : (
                    <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Watch Video
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No materials available for this course.</p>
        )}
      </div>
    </div>
  );
}

export default ViewCourseMaterials;
