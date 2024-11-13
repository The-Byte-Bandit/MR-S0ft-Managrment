import { sideNavLinks, down_white } from '../constants/constant';
import styles from '../style';
import { Link, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { fetchCourses, fetchMinimalStudents, fetchMinimalTeachers, fetchClasses, fetchStudentClasses } from '../redux/actions/userActions';
import {userLogout} from "../redux/actions/userActions"


function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user.user);
  const courses = useSelector(state => state.user.courses);
  const classes = useSelector(state => state.user.classes);
  const token = useSelector(state => state.user.user.token);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'course_advisor')) {
      // Fetch courses for admin or course-advisor roles
      dispatch(fetchCourses(token));
      dispatch(fetchMinimalStudents(token));
      dispatch(fetchMinimalTeachers(token));
      dispatch(fetchClasses(token,user.userId));
    }else if (user && (user.role === 'student' || user.role === 'teacher')){
      dispatch(fetchStudentClasses(token,user.userId));
    }
  }, [user, dispatch]);



  
  const handleLogout = () => {
    dispatch(userLogout(navigate));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu open/close state
  };


  return (
    <div className='side-nav-bg w-full h-full justify-between border-b-[1.5px] border-r-[1.5px] rounded-tr rounded-br'>
      <div className={`${styles.paddingL1} w-full h-full justify-center items-center flex flex-1 flex-col`}>
        <div className='flex justify-center items-center h-[77px] text-white'>
          MR-Soft
        </div>

        <nav className='flex w-full h-full flex-col my-4'>
          <ul className='flex w-full h-full flex-col gap-3'>
            {sideNavLinks?.map((link) => {
              if (link.roles.includes(user.role)) {
                if (link.title === 'Classes' && (user.role === 'teacher' || user.role === 'student')) {
                  return (
                    <li 
                      key={link.id}
                      className='inline-block cursor-pointer hover:scale-95 hover:bg-weak-100'
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div key={link.id} className='flex gap-6 items-center ml-[0.9rem] relative text-white montserrat-regular'>
                        {link.title} <img src={down_white} alt='down' className='w-[25px]'/>
                      </div>
                      {isDropdownOpen && (
                        <ul className='ml-[2px] w-full'>
                          {classes?.map((classes) => (
                            <li key={classes.id} onClick={()=>{console.log(classes)}} className='py-1 w-full h-full'>
                              <Link to={`/home/classes/${classes._id}/${classes.className}`} className='no-underline inline-block hover:no-underline focus:no-underline text-[12px] text-white montserrat-regular w-full h-full truncate'>
                              {classes.className}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                } else if (link.title === 'Logout') {
                  return (
                    <li 
                      key={link.id} 
                      className='inline-block mt-auto cursor-pointer hover:scale-95 hover:bg-weak-100'
                      onClick={handleLogout}
                    >
                      <Link to="/login" className='no-underline hover:no-underline focus:no-underline flex gap-6 items-center ml-[0.9rem] relative text-white montserrat-regular'>
                        {link.title}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={link.id} className='inline-block hover:scale-95 cursor-pointer hover:bg-weak-100'>
                    <Link to={`/home/${link.url}`} className='no-underline hover:no-underline focus:no-underline flex gap-6 items-center ml-[0.9rem] relative text-white montserrat-regular'>
                      {link.title}
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideNav;
