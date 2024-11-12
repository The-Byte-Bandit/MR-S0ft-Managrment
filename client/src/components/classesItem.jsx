import { useCallback,useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { assignment, pdf2, video2 } from '../constants/constant';
import { useSelector, useDispatch, } from 'react-redux';
import { fetchCourses, fetchMaterials } from '../redux/actions/userActions';
function ClassDetail() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.user.token);
    const courses = useSelector((state) => state.user.courses);
    const materials = useSelector((state) => state.user.materials);
    const loading = useSelector((state) => state.user.loading);
    const { user } = useSelector(state => state.user.user);
    const { id } = useParams();
    const { name } = useParams();
    const role = user.role
    // const [classDetail, setClassDetail] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');
    // const token = localStorage.getItem('token');
    // useEffect(() => {
    //     const fetchClassDetail = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/class', {
    //                 headers: { Authorization: `Bearer ${token}` },
    //               });
    //             console.log('ok',response.data);
    //         } catch (err) {
    //             setError('Failed to fetch class details. Please try again later.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchClassDetail();
    // }, [id]);

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    // if (error) {
    //     return <p>{error}</p>;
    // }

    useEffect(() => {
        dispatch(fetchCourses(token));
      }, [dispatch, token]);
    
      useEffect(() => {
        if (id) {
          dispatch(fetchMaterials(id, token));
        }
      }, [dispatch, id, token]);

    // Fetch the class details using the id or handle accordingly
    return (
        <div>
        <div class="container mx-auto p-4">
            <div className='flex w-full justify-between'>
                <h2 class="text-2xl font-bold mb-6 text-charcoal">{name}</h2>
                {role === 'teacher' ? 
                <a
                href={`/home/course-materials/${id}`} className="px-4 no-underline py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Upload
                </a>: null}
            </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div class="bg-[rgb(0,51,102)] flex items-center text-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95">
           <div className='w-[20%] p-2 bg-white rounded-full'><img src={pdf2}/></div>
           <h3>PDF</h3>
        </div>

        <div class="bg-green-50 flex items-center text-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95">
           <div className='w-[20%] p-2 bg-white rounded-full'><img src={video2}/></div>
           <h3>Videos</h3>
        </div>

        <div class="bg-red-50 flex items-center text-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95">
           <div className='w-[20%] p-2 bg-white rounded-full'><img src={assignment}/></div>
           <h3>Assignments</h3>
        </div>
    </div>
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
};

export default ClassDetail;