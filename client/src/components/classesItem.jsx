import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, fetchMaterials } from '../redux/actions/userActions';
import { pdf2, video2 } from '../constants/constant';

function ClassItem() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.user.token);
    const materials = useSelector((state) => state.user.materials);
    const loading = useSelector((state) => state.user.loading);
    const { user } = useSelector((state) => state.user.user);
    const { id } = useParams();
    const { name } = useParams();
    const role = user.role;

    const [filterType, setFilterType] = useState('all'); // 'all', 'pdf', or 'video'

    useEffect(() => {
        dispatch(fetchCourses(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (id) {
            dispatch(fetchMaterials(id, token));
        }
    }, [dispatch, id, token]);

    // Filter materials based on the selected filter type
    const filteredMaterials =
        filterType === 'all'
            ? materials
            : materials?.filter((material) => {
                  if (filterType === 'pdf') {
                      return material.type === 'pdf';
                  } else if (filterType === 'youtube') {
                      return material.type === 'youtube';
                  }
                  return true;
              });

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{name}</h2>
                {role === 'teacher' && (
                    <a
                        href={`/home/course-materials/${id}`}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Upload
                    </a>
                )}
            </div>

            <div className="flex space-x-4 mb-8">
                <button
                    onClick={() => setFilterType('pdf')}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                        filterType === 'pdf'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    PDFs
                </button>
                <button
                    onClick={() => setFilterType('youtube')}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                        filterType === 'video'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    Videos
                </button>
                <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                        filterType === 'all'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    All
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {filterType === 'pdf' && 'PDF Materials'}
                    {filterType === 'youtube' && 'Video Materials'}
                    {filterType === 'all' && 'All Materials'}
                </h2>
                {loading ? (
                    <p className="text-gray-500">Loading materials...</p>
                ) : filteredMaterials?.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredMaterials.map((material) => (
                            <li
                                key={material._id}
                                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
                            >
                                <a
                                    href={
                                        material.type === 'pdf'
                                            ? `http://localhost:5000${material.url}`
                                            : material.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    {material.name || (material.type === 'pdf' ? 'View PDF' : 'Watch Video')}
                                </a>
                                <span className="text-gray-600 uppercase text-sm font-medium">
                                    {material.type.toUpperCase()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No materials available for this filter.</p>
                )}
            </div>
        </div>
    );
}

export default ClassItem;
