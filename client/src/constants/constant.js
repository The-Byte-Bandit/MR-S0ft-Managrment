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
import arrowRight from "../assets/images/icons/Arrow-right.svg"
import largeArrowRight from "../assets/images/icons/largeArrowRight.svg"
import arrowLeft from "../assets/images/icons/arrow-left-down-line.svg"
import secondArrowLeft from "../assets/images/icons/secondArrowLeft.svg"
import arrowDown from "../assets/images/icons/arrowDown.svg"
import whiteArrowRight from "../assets/images/icons/whiteArrowRight.svg"
import percentageArrowUp from "../assets/images/icons/percentageArrowUp.svg"
import arrowRightSLine from "../assets/images/icons/arrow-right-s-line.svg"
import arrowLeftSLine from "../assets/images/icons/arrow-left-s-line.svg"
import arrowLeftDoubleLine from "../assets/images/icons/arrow-left-double-line.svg"
import arrowRightDoubleLine from "../assets/images/icons/arrow-right-double-line.svg"
import add from "../assets/images/icons/add.svg"
import video2 from '../assets/images/icons/video.png'
import pdf2 from '../assets/images/icons/pdf.png'
import assignment from '../assets/images/icons/assignment.png'

const  userID = localStorage.getItem('userId')

// constants/constant.js
export const sideNavLinks = [
    {
        id: "dashboard",
        title: "Dashboard",
        url: "dashboard",
        roles: ["admin"]
    },
    {
        id: "courses",
        title: "Courses",
        url: "courses",
        roles: ["admin", "course_advisor"]
    },
    {
        id: "classes",
        title: "Classes",
        url: "classes",
        roles: ["admin", "teacher", "student"]
    },
    // {
    //     id: "teachers",
    //     title: "Teachers",
    //     url: "teachers",
    //     roles: ["admin"]
    // },
    {
        id: "students",
        title: "Students",
        url: "students",
        roles: ["course_advisor"]
    },
    {
        id: "users",
        title: "Users",
        url: "users",
        roles: ["admin"]
    },
    {
        id: "logout",
        title: "Logout",
        url: "logout",
        roles: ["admin", "course_advisor", "teacher", "student"]
    }
];


export const BASE_URL = 'http://localhost:5000';

export {
    assignment,
    Saly,
    pdf2,
    pdf,
    video2,
    video,
    logout,
    empty,
    down_white,
    download,
    lock_locked,
    big_lock,
    bg_texture,
    arrowRight,
    largeArrowRight,
    arrowLeft,
    secondArrowLeft,
    arrowDown,
    whiteArrowRight,
    percentageArrowUp,
    arrowRightSLine,
    arrowLeftSLine,
    arrowLeftDoubleLine,
    arrowRightDoubleLine,
    add,
}