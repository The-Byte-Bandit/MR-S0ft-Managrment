import React from 'react';
import SmallCard from '../components/smallCard';
import LargeCard from '../components/largeCard'; // Assuming this component can handle displaying classes
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ClasssCard from '../components/classCard';

function Classes() {
  // Assume classes are stored in Redux state under state.class.classes
  const classes = useSelector((state) => state.user.classes); 

  return (
    <div className="p-6 w-full h-full">

      {/* Add Class Button */}
      <div className="flex justify-end mb-4">
        <Link to="/add-class" className="btn bg-blue50 text-white px-4 py-2 rounded-lg hover:bg-blue100 transition">
          Add Class
        </Link>
      </div>

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
