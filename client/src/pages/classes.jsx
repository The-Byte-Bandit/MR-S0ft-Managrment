import React from 'react';
import SmallCard from '../components/smallCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ClasssCard from '../components/classCard';
import { add } from '../constants/constant';

function Classes() {
  // Assume classes are stored in Redux state under state.class.classes
  const classes = useSelector((state) => state.user.classes); 

  return (
    <div className="p-6 w-full h-full">

      {/* Add Class Button */}

      <Link to="/home/add-class" className="   flex justify-end mb-4 no-underline">
            <div className="px-4 py-2 gap-[6px] rounded-lg hover:bg-blue25 justify-center items-center transition duration-200  text-white  bg-blue50 flex flex-row">
                <img src={add} alt='add course' className='w-[11px]'/> Add Class
            </div>
        </Link>

      {/* Class Count Summary Card */}
      <div className="mb-4">
        <SmallCard 
          heading="Class Count"
          figure={classes?.length || 0}
        />
      </div>

      {/* List of Classes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Classes</h2>
        <ClasssCard
          classses={classes} // Reusing LargeCard for classes
        />
      </div>
    </div>
  );
}

export default Classes;
