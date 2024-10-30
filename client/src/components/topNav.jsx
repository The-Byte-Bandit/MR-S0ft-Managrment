import { typography } from '../style';
import { useSelector } from 'react-redux';

function TopNav() {
  const user = useSelector((state) => state.user.user.user);
  
  return (
    <div className="flex w-full bg-[#ffffff2b] shadow-sm py-[2px] px-6">
      <div className="flex justify-between items-center w-full">
        
        {/* Greeting Section */}
        <div className="flex items-center gap-4">
          <div>
            <h3 className={`${typography.labelLarge} text-gray-800`}>Hi, {user?.firstname}</h3>
            <p className={`${typography.paragraphSmall} text-gray-500`}>Welcome back!</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full text-blue-600 font-bold shadow-sm">
            {user?.firstname?.charAt(0).toUpperCase()}
          </div>
          <div className="text-gray-800 font-medium truncate">
            <h3 className={`${typography.labelMedium}`}>{user?.firstname} {user?.lastname}</h3>
            <p className="text-sm text-gray-500">{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
