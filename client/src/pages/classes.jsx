import React, { useState } from 'react';
import SmallCard from '../components/smallCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { add } from '../constants/constant';
import dayjs from 'dayjs';

function Classes() {
  const classes = useSelector((state) => state.user.classes);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 10;

  // Filter classes by search term
  const filteredClasses = classes.filter((classItem) =>
    classItem.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered data
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass);

  // Calculate total pages
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  // Filter classes by status
  const today = dayjs();
  const ongoingClasses = classes.filter(
    (classItem) => today.isAfter(dayjs(classItem.startDate)) && today.isBefore(dayjs(classItem.endDate))
  );
  const completedClasses = classes.filter(
    (classItem) => today.isAfter(dayjs(classItem.endDate))
  );
  const comingSoonClasses = classes.filter(
    (classItem) => today.isBefore(dayjs(classItem.startDate))
  );

  return (
    <div className="p-6 w-full h-full space-y-6">
      {/* Add Class Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Classes</h1>
        <Link to="/home/add-class" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue50 rounded-lg hover:bg-blue25 no-underline transition duration-200">
          <img src={add} alt="Add class" className="w-4" />
          Add Class
        </Link>
      </div>

      {/* Search Input */}
      <div className="mt-4 mb-6">
        <input
          type="text"
          placeholder="Search by class name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on new search
          }}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Class Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SmallCard heading="Ongoing Classes" figure={ongoingClasses.length} />
        <SmallCard heading="Completed Classes" figure={completedClasses.length} />
        <SmallCard heading="Coming Soon" figure={comingSoonClasses.length} />
      </div>

      {/* Table of All Classes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">All Classes</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentClasses.map((classItem) => {
                const classStatus = today.isBefore(dayjs(classItem.startDate))
                  ? "Coming Soon"
                  : today.isAfter(dayjs(classItem.endDate))
                  ? "Completed"
                  : "Ongoing";

                return (
                  <tr key={classItem._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{classItem.className}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`px-2 py-1 font-semibold rounded-full ${classStatus === "Ongoing" ? "bg-green-200 text-green-800" : classStatus === "Completed" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}>
                        {classStatus}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {dayjs(classItem.startDate).format("MMMM D, YYYY")}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {dayjs(classItem.endDate).format("MMMM D, YYYY")}
                    </td>
                    <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link
                        to={`/home/class-details/${classItem._id}`}
                        className="text-blue-800 hover:text-blue-700 bg-blue-200 px-1 py-1 font-semibold w-full rounded-full no-underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 p-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue50 text-white hover:bg-blue25"}`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Classes;
