import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { fetchCourses, fetchMaterials, uploadMaterial } from '../redux/actions/userActions';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

function CourseMaterials() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [name, setName] = useState(''); // Title for YouTube video
  const [uploadType, setUploadType] = useState('pdf'); // Toggle between PDF and YouTube
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token);
  const courses = useSelector((state) => state.user.courses);
  const materials = useSelector((state) => state.user.materials);
  const loading = useSelector((state) => state.user.loading);
  const { courseId } = useParams();

  useEffect(() => {
    dispatch(fetchCourses(token));
    if (courseId) {
      setSelectedCourseId(courseId);
    }
  }, [dispatch, token, courseId]);

  useEffect(() => {
    if (selectedCourseId) {
      dispatch(fetchMaterials(selectedCourseId, token));
    }
  }, [dispatch, selectedCourseId, token]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (uploadType === 'pdf') {
      if (!file) {
        toast.error("Please upload a PDF file");
        return;
      }
      formData.append('pdf', file);
      formData.append('type', 'pdf');
    } else {
      if (!url || !name) {
        toast.error("Please provide both YouTube link and title");
        return;
      }
      formData.append('url', url);
      formData.append('name', name);
      formData.append('type', 'youtube');
    }

    formData.append('courseId', selectedCourseId);
    const success = await dispatch(uploadMaterial(formData, token));
    if (success) {
      dispatch(fetchMaterials(selectedCourseId, token));
      setFile(null);
      setUrl('');
      setName('');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Course Materials</h1>

        {/* Upload Type Selection */}
        <div className="mb-4 flex space-x-4">
          <button
            type="button"
            onClick={() => setUploadType('pdf')}
            className={`px-4 py-2 rounded-lg ${
              uploadType === 'pdf' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            PDF
          </button>
          <button
            type="button"
            onClick={() => setUploadType('youtube')}
            className={`px-4 py-2 rounded-lg ${
              uploadType === 'youtube' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            YouTube
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="space-y-4 mb-8">
          {uploadType === 'pdf' ? (
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Upload PDF</label>
              <input type="file" accept=".pdf" onChange={handleFileChange} />
            </div>
          ) : (
            <>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-semibold">YouTube Title</label>
                <input
                  type="text"
                  className="form-control p-3 border rounded-lg"
                  placeholder="Enter video title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
            </>
          )}

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
              <a
                href={`http://localhost:5000${material.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View PDF
              </a>
            ) : (
              <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {material.name || 'Watch Video'}
              </a>
            )}
          </span>
          <span className="text-gray-600">{material.type ? material.type.toUpperCase() : 'UNKNOWN'}</span>
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
