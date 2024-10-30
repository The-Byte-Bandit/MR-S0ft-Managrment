import React from 'react';
import SmallCard from '../components/smallCard';
import LargeCard from '../components/largeCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { add } from '../constants/constant';


function Courses() {
  // Assume courses are stored in Redux state under state.course.courses
  const courses = useSelector((state) => state.user.courses);

  return (
    <div className="p-6 w-full h-full">


        <Link to="/add-course" className="   flex justify-end mb-4 no-underline">
            <div className="px-4 py-2 gap-[6px] rounded-lg hover:bg-blue25 justify-center items-center transition duration-200  text-white  bg-blue50 flex flex-row">
                <img src={add} alt='add course' className='w-[11px]'/> Add Course
            </div>
        </Link>
      

      <div className="mb-4">
        <SmallCard 
            heading={'Course count'}
            figure={courses?.length}
        />
      </div>

      {/* List of Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
        {/* <ul className="list-disc ml-5">
          {courses && courses.length > 0 ? (
            courses?.map((course) => (
              <li key={course._id} className="mb-2">
                <Link to={`/course/${course._id}`} className="text-blue-600 hover:underline">
                  {course.title}
                </Link>
              </li>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </ul> */}
        <LargeCard
            courses={courses}
        />
      </div>
    </div>
  );
}

export default Courses;
