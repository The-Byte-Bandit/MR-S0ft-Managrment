import { useState } from 'react';
import PropTypes from 'prop-types';
import { arrowRightDoubleLine, arrowLeftDoubleLine, arrowLeftSLine, arrowRightSLine } from '../constants/constant';
import { Link } from 'react-router-dom';

function ClasssCard({ classses }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(classses?.length / itemsPerPage);
  console.log(classses);
  

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <div className=" ">
      {/* class List */}
      <div className="space-y-4">
        {classses.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((classes) => (
          <div
            key={classes._id}
            className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full text-blue-600 font-bold mr-4">
              {classes?.className?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{classes.className}</h3>
            </div>
            <Link to={`/home/class-details/${classes._id}`}>
              <button className="ml-auto bg-blue50 text-white px-4 py-1 rounded-[8px] hover:bg-blue25 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button onClick={() => selectPageHandler(1)} disabled={page === 1} className="p-2 hover:cursor-pointer">
          <img src={arrowLeftDoubleLine} alt="First" className="w-5" />
        </button>
        <button onClick={() => selectPageHandler(page - 1)} disabled={page === 1} className="p-2 hover:cursor-pointer">
          <img src={arrowLeftSLine} alt="Previous" className="w-5" />
        </button>

        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button onClick={() => selectPageHandler(page + 1)} disabled={page === totalPages} className="hover:cursor-pointer p-2">
          <img src={arrowRightSLine} alt="Next" className="w-5" />
        </button>
        <button onClick={() => selectPageHandler(totalPages)} disabled={page === totalPages} className="p-2 hover:cursor-pointer">
          <img src={arrowRightDoubleLine} alt="Last" className="w-5 hover:cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

ClasssCard.propTypes = {
  classses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      className: PropTypes.string.isRequired,
    //   description: PropTypes.string,
    })
  ).isRequired,
};

export default ClasssCard;
