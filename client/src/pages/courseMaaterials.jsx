import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { fetchCourses, fetchMaterials, uploadMaterial } from '../redux/actions/userActions';
import 'react-toastify/dist/ReactToastify.css';

function CourseMaterials() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token);
  const courses = useSelector((state) => state.user.courses);
  const materials = useSelector((state) => state.user.materials);
  const loading = useSelector((state) => state.user.loading);

  // Fetch courses on mount
  useEffect(() => {
    dispatch(fetchCourses(token));
  }, [dispatch, token]);

  // Fetch materials when course is selected
  useEffect(() => {
    if (selectedCourseId) {
      dispatch(fetchMaterials(selectedCourseId, token));
    }
    console.log(materials);
    
  }, [dispatch, selectedCourseId, token]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) {
      toast.error("Please select a course");
      return;
    }

    const formData = new FormData();
    if (file) formData.append('pdf', file);
    formData.append('courseId', selectedCourseId);
    formData.append('type', file ? 'pdf' : 'youtube');
    formData.append('url', url);

    const success = await dispatch(uploadMaterial(formData, token));
    if (success) {
      dispatch(fetchMaterials(selectedCourseId, token)); // Refresh materials
      setFile(null);
      setUrl('');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Course Materials</h1>

        {/* Course Selection */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Select Course</label>
          <select
            className="form-control p-3 border rounded-lg mt-2"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">Choose a course...</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="space-y-4 mb-8">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Upload PDF</label>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">YouTube URL</label>
            <input
              type="url"
              className="form-control p-3 border rounded-lg"
              placeholder="Enter YouTube link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            disabled={loading || !selectedCourseId}
          >
            {loading ? 'Uploading...' : 'Upload Material'}
          </button>
        </form>

        {/* Materials List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Materials</h2>
          {loading ? (
            <p>Loading materials...</p>
          ) : materials?.length > 0 ? (
            <ul className="space-y-4">
              {materials.map((material) => (
                <li key={material._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                  <span className="truncate">
                    {material.type === 'pdf' ? (
                      <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        View PDF
                      </a>
                    ) : (
                      <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Watch Video
                      </a>
                    )}
                  </span>
                  <span className="text-gray-600">{material?.type?.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No materials available for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseMaterials;
