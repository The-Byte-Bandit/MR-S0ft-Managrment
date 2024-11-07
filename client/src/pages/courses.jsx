import React from 'react';
import SmallCard from '../components/smallCard';
import LargeCard from '../components/largeCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { add } from '../constants/constant';

function Courses() {
  const courses = useSelector((state) => state.user.courses);

  return (
    <div className="p-6 w-full h-full space-y-6">

      {/* Header Section with Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
        <Link to="/home/add-course" className="flex no-underline items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue50 rounded-lg hover:bgblue-25 transition duration-200">
          <img src={add} alt="add course" className="w-5" />
          Add New Course
        </Link>
      </div>
      {/* <Link to="/home/add-course" className="   flex justify-end mb-4 no-underline">
            <div className="px-4 py-2 gap-[6px] rounded-lg hover:bg-blue25 justify-center items-center transition duration-200  text-white  bg-blue50 flex flex-row">
                <img src={add} alt='add course' className='w-[11px]'/> Add Course
            </div>
        </Link> */}

      {/* Course Count Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SmallCard 
          heading="Total Courses"
          figure={courses?.length || 0}
          className="shadow-md"
        />
      </div>

      {/* List of Courses */}
      <section>
        <h1  className="text-2xl font-bold text-gray-700">Available Courses</h1>
        {courses && courses.length > 0 ? (
          <LargeCard courses={courses} />
        ) : (
          <p className="text-gray-500 text-center mt-10">No courses available</p>
        )}
      </section>
    </div>
  );
}

export default Courses;
