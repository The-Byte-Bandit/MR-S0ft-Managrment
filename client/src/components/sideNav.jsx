import { sideNavLinks } from '../constants/constant';
import styles from '../style';
import { Link } from 'react-router-dom';

function SideNav() {
  
  return (
    <div className='side-nav-bg w-full h-full justify-between border-b-[1.5px] border-r-[1.5px] rounded-tr rounded-br'>
      <div className={`${styles.paddingL1} w-full justify-center items-center flex flex-1 flex-col`}>
        <div className='flex justify-center items-center h-[77px] text-white'>
          MR-Soft
        </div>

        <nav className='flex  w-full flex-col my-4'>
          <ul className='flex w-full flex-col gap-3'>
            {sideNavLinks.map((link) => (
              <li 
                key={link.id}
                className='inline-block hover:scale-95 cursor-pointer  hover:bg-weak-100'
              >
                <Link to={`/home/${link.url}`} className='flex gap-6 items-center ml-[0.9rem] relative'>
                  <span className='text-[14px] text-white montserrat-regular'>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideNav;
