import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { arrowRightDoubleLine, arrowLeftDoubleLine, arrowLeftSLine, arrowRightSLine } from '../constants/constant';
import { Link } from 'react-router-dom';

function LargeCard({ courses = [] }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Course List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {courses.length > 0 ? (
          courses.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full text-blue-600 font-extrabold text-xl mb-4">
                {course?.title?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold text-gray-900  mb-2 truncate" title={course.title}>
                {course.title}
              </h3>
              {/* <p className="text-gray-500 text-sm mb-4">
                {course?.description || 'No description available'}
              </p> */}
              <Link to={`/home/courses/${course._id}`}>
              {/* {`/home/user-details/${user.role}/${user.id}`} */}
              <button
              
                className="w-full bg-blue50 text-white px-3 py-2 rounded-lg hover:bg-blue25 transition-colors"
                aria-label={`View details of ${course.title}`}
              >

                View
              </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No courses available</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-3">
          <button
            onClick={() => selectPageHandler(1)}
            disabled={page === 1}
            className="p-2 disabled:opacity-40"
            aria-label="First page"
          >
            <img src={arrowLeftDoubleLine} alt="First" className="w-5" />
          </button>
          <button
            onClick={() => selectPageHandler(page - 1)}
            disabled={page === 1}
            className="p-2 disabled:opacity-40"
            aria-label="Previous page"
          >
            <img src={arrowLeftSLine} alt="Previous" className="w-5" />
          </button>

          <span className="text-gray-600 font-semibold text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => selectPageHandler(page + 1)}
            disabled={page === totalPages}
            className="p-2 disabled:opacity-40"
            aria-label="Next page"
          >
            <img src={arrowRightSLine} alt="Next" className="w-5" />
          </button>
          <button
            onClick={() => selectPageHandler(totalPages)}
            disabled={page === totalPages}
            className="p-2 disabled:opacity-40"
            aria-label="Last page"
          >
            <img src={arrowRightDoubleLine} alt="Last" className="w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

LargeCard.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default LargeCard;
