import React from 'react';
import SmallCard from '../components/smallCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TeacherCard from '../components/teacherCard';
import { add } from '../constants/constant';

function Teachers() {
  // Assume teachers are stored in Redux state under state.user.teachers
  const teachers = useSelector((state) => state.user.minimalTeachers);

  return (
    <div className="p-6 w-full h-full">

      {/* Add Teacher Button */}
      <Link to="/home/add-teacher" className="   flex justify-end mb-4 no-underline">
            <div className="px-4 py-2 gap-[6px] rounded-lg hover:bg-blue25 justify-center items-center transition duration-200  text-white  bg-blue50 flex flex-row">
                <img src={add} alt='add course' className='w-[11px]'/> Add Teacher
            </div>
        </Link>

      {/* Teacher Count Summary Card */}
      <div className="mb-4">
        <SmallCard 
          heading="Teacher Count"
          figure={teachers?.length || 0}
        />
      </div>

      {/* List of Teachers */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Teachers</h2>
        <TeacherCard
          teachers={teachers} // Reusing LargeCard for teachers, assuming it displays teacher info
        />
      </div>
    </div>
  );
}

export default Teachers;
