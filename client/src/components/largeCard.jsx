import { useState } from 'react';
import PropTypes from 'prop-types';
import { arrowRightDoubleLine, arrowLeftDoubleLine, arrowLeftSLine, arrowRightSLine } from '../constants/constant';

function LargeCardTwo({ courses = [] }) { // Set a default empty array for courses
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <div className=" ">
      {/* Course List */}
      <div className="space-y-4">
        {Array.isArray(courses) && courses.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((course) => ( // Ensure courses is an array
          <div
            key={course.id}
            className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full text-blue-600 font-bold mr-4">
              {course?.title?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{course.title}</h3>
              <p className="text-gray-600 text-sm">{course?.description || 'No description available'}</p>
            </div>
            <button className="ml-auto bg-blue50 text-white px-4 py-1 rounded-[8px] hover:bg-blue25 transition">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button onClick={() => selectPageHandler(1)} disabled={page === 1} className="p-2">
          <img src={arrowLeftDoubleLine} alt="First" className="w-5" />
        </button>
        <button onClick={() => selectPageHandler(page - 1)} disabled={page === 1} className="p-2">
          <img src={arrowLeftSLine} alt="Previous" className="w-5" />
        </button>

        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button onClick={() => selectPageHandler(page + 1)} disabled={page === totalPages} className="p-2">
          <img src={arrowRightSLine} alt="Next" className="w-5" />
        </button>
        <button onClick={() => selectPageHandler(totalPages)} disabled={page === totalPages} className="p-2">
          <img src={arrowRightDoubleLine} alt="Last" className="w-5" />
        </button>
      </div>
    </div>
  );
}

LargeCardTwo.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default LargeCardTwo;
