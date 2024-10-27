import bg_texture from '../assets/images/icons/bg-texture.png'
import big_lock from '../assets/images/icons/big-lock.svg'
import lock_locked from '../assets/images/icons/lock-locked.svg'
import down_white from '../assets/images/icons/down-white.svg'
import download from '../assets/images/icons/down-white.svg'
import empty from '../assets/images/icons/empty.svg'
import logout from '../assets/images/icons/logout.svg'
import pdf from '../assets/images/icons/pdf.svg'
import video from '../assets/images/icons/video.svg'
import Saly from '../assets/images/icons/Saly-10.png'


const  userID = localStorage.getItem('userId')

export const sideNavLinks =[
    {
        id: "courses",
        title: "Courses",
        url: "courses",
    }, 
]

export const BASE_URL = 'http://localhost:5000';

export {
    Saly,
    pdf,
    video,
    logout,
    empty,
    down_white,
    download,
    lock_locked,
    big_lock,
    bg_texture,
    
}