import React from 'react';
import SmallCard from '../components/smallCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { add } from '../constants/constant';
import StudentCard from '../components/studentCard';

function Students() {
  // Assume Students are stored in Redux state under state.user.Students
  const students = useSelector((state) => state.user.minimalStudents);

  return (
    <div className="p-6 w-full h-full">

      {/* Add Teacher Button */}
      <Link to="/home/add-student" className="   flex justify-end mb-4 no-underline">
            <div className="px-4 py-2 gap-[6px] rounded-lg hover:bg-blue25 justify-center items-center transition duration-200  text-white  bg-blue50 flex flex-row">
                <img src={add} alt='add course' className='w-[11px]'/> Add Student
            </div>
        </Link>

      {/* Teacher Count Summary Card */}
      <div className="mb-4">
        <SmallCard 
          heading="Teacher Count"
          figure={students?.length || 0}
        />
      </div>

      {/* List of students */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Students</h2>
        <StudentCard
          students={students} // Reusing LargeCard for students, assuming it displays teacher info
        />
      </div>
    </div>
  );
}

export default Students;
