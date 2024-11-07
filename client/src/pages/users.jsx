// src/pages/Users.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { FaUser, FaPlusCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Users() {
  const dispatch = useDispatch();
  const { groupedUsers, loading, error } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on a new search
  };

  // Filter users by search term
  const filteredUsers = Object.keys(groupedUsers).flatMap((role) =>
    groupedUsers[role].filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        role.toLowerCase().includes(searchTerm)
    ).map((user) => ({ ...user, role }))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">User Management</h1>
        <Link
          to="/home/add-user"
          className="flex items-center gap-2 bg-blue50 no-underline text-white px-4 py-2 rounded-lg shadow hover:bg-blue25 transition duration-200"
        >
          <FaPlusCircle className="text-xl" />
          Create New User
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Search Input */}
      <div className="flex items-center mb-8">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by name or role"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 w-full border rounded-lg"
        />
      </div>

      {/* User Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {Object.keys(groupedUsers).map((role) => (
          <div key={role} className="flex items-center bg-white p-6 rounded-lg shadow-lg">
            <FaUser className="text-blue50 text-3xl mr-4 " />
            <div>
              <h3 className="text-lg font-semibold">{role}s</h3>
              <p className="text-xl font-bold text-gray-700">{groupedUsers[role].length}</p>
            </div>
          </div>
        ))}
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="text-center py-4">Loading...</td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                        to={`/home/user-details/${user.role}/${user.id}`}
                        className="text-gray-700 no-underline hover:text-blue-500 transition inline-block w-full"
                    >
                        {user.name}
                    </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                    <Link
                        to={`/home/user-details/${user.role}/${user.id}`}
                        className="text-gray-700 no-underline hover:text-blue-500 inline-block transition w-full"
                    >
                        {user.role}
                    </Link>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Users;
