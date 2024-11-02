import { useState } from 'react';
import PropTypes from 'prop-types';
import { arrowRightDoubleLine, arrowLeftDoubleLine, arrowLeftSLine, arrowRightSLine } from '../constants/constant';
import { Link } from 'react-router-dom';

function LargeCardTwo({ courses = [] }) {
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
              key={course._id}
              className="flex items-start bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full text-blue-600 font-extrabold text-xl mr-4">
                {course?.title?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate" title={course.title}>
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {course?.description || 'No description available'}
                </p>
              </div>
              {/* <button */}
              <Link
                to={`/home/courses/${course._id}`} // Dynamic link based on course ID
                className="ml-auto no-underline bg-blue50 text-white px-3 py-2 rounded-lg hover:bg-blue25 transition-colors"
                aria-label={`View details of ${course.title}`}
              >
                View
              </Link>
              {/* </button> */}
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

LargeCardTwo.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default LargeCardTwo;











// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { arrowRightDoubleLine, arrowLeftDoubleLine, arrowLeftSLine, arrowRightSLine } from '../constants/constant';

// function LargeCardTwo({ courses = [] }) {
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(courses.length / itemsPerPage);

//   const selectPageHandler = (selectedPage) => {
//     if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
//       setPage(selectedPage);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Available Courses</h2>
//         </div>

//         {/* Table Header */}
//         <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 text-gray-600 font-semibold text-sm">
//           <div>Course Title</div>
//           <div>Description</div>
//           <div>Action</div>
//         </div>

//         {/* Course List */}
//         <div>
//           {courses.length > 0 ? (
//             courses.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((course) => (
//               <div
//                 key={course.id}
//                 className="grid grid-cols-4 gap-4 p-4 items-center border-b border-gray-200 hover:bg-gray-50 transition duration-200"
//               >
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
//                     {course?.title?.charAt(0).toUpperCase()}
//                   </div>
//                   <span className="text-gray-800 font-medium">{course.title}</span>
//                 </div>
//                 <div className="text-gray-600 text-sm">
//                   {course?.description || 'No description available'}
//                 </div>
//                 <button
//                   className="bg-blue50 text-white px-4 py-2 rounded-lg hover:bg-blue25 transition duration-200"
//                   aria-label={`View details of ${course.title}`}
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="p-4 text-center text-gray-500">No courses available</div>
//           )}
//         </div>

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center p-4 bg-gray-100 border-t border-gray-200">
//             <span className="text-gray-600 text-sm">
//               Page {page} of {totalPages}
//             </span>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => selectPageHandler(1)}
//                 disabled={page === 1}
//                 className="p-2 disabled:opacity-40"
//                 aria-label="First page"
//               >
//                 <img src={arrowLeftDoubleLine} alt="First" className="w-5" />
//               </button>
//               <button
//                 onClick={() => selectPageHandler(page - 1)}
//                 disabled={page === 1}
//                 className="p-2 disabled:opacity-40"
//                 aria-label="Previous page"
//               >
//                 <img src={arrowLeftSLine} alt="Previous" className="w-5" />
//               </button>
//               <button
//                 onClick={() => selectPageHandler(page + 1)}
//                 disabled={page === totalPages}
//                 className="p-2 disabled:opacity-40"
//                 aria-label="Next page"
//               >
//                 <img src={arrowRightSLine} alt="Next" className="w-5" />
//               </button>
//               <button
//                 onClick={() => selectPageHandler(totalPages)}
//                 disabled={page === totalPages}
//                 className="p-2 disabled:opacity-40"
//                 aria-label="Last page"
//               >
//                 <img src={arrowRightDoubleLine} alt="Last" className="w-5" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// LargeCardTwo.propTypes = {
//   courses: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       description: PropTypes.string,
//     })
//   ).isRequired,
// };

// export default LargeCardTwo;
