// src/actionTypes.js

// User Authentication
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

// Admin Authentication
export const ADMIN_SIGNUP_SUCCESS = 'ADMIN_SIGNUP_SUCCESS';
export const ADMIN_SIGNUP_ERROR = 'ADMIN_SIGNUP_ERROR';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN_ERROR';

// Course Management
export const COURSE_CREATE_SUCCESS = 'COURSE_CREATE_SUCCESS';
export const COURSE_CREATE_ERROR = 'COURSE_CREATE_ERROR';
export const COURSE_UPDATE_SUCCESS = 'COURSE_UPDATE_SUCCESS';
export const COURSE_UPDATE_ERROR = 'COURSE_UPDATE_ERROR';
export const COURSE_DELETE_SUCCESS = 'COURSE_DELETE_SUCCESS';
export const COURSE_DELETE_ERROR = 'COURSE_DELETE_ERROR';

// Class Management
export const CLASS_CREATE_SUCCESS = 'CLASS_CREATE_SUCCESS';
export const CLASS_CREATE_ERROR = 'CLASS_CREATE_ERROR';
export const CLASS_UPDATE_SUCCESS = 'CLASS_UPDATE_SUCCESS';
export const CLASS_UPDATE_ERROR = 'CLASS_UPDATE_ERROR';
export const CLASS_DELETE_SUCCESS = 'CLASS_DELETE_SUCCESS';
export const CLASS_DELETE_ERROR = 'CLASS_DELETE_ERROR';

// Fetching Classes
export const FETCH_CLASSES_SUCCESS = 'FETCH_CLASSES_SUCCESS';
export const FETCH_CLASSES_ERROR = 'FETCH_CLASSES_ERROR';

// Fetching Courses
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_ERROR = 'FETCH_COURSES_ERROR';

// Minimal data for list views
export const FETCH_MINIMAL_STUDENTS_SUCCESS = 'FETCH_MINIMAL_STUDENTS_SUCCESS';
export const FETCH_MINIMAL_STUDENTS_ERROR = 'FETCH_MINIMAL_STUDENTS_ERROR';
export const FETCH_MINIMAL_TEACHERS_SUCCESS = 'FETCH_MINIMAL_TEACHERS_SUCCESS';
export const FETCH_MINIMAL_TEACHERS_ERROR = 'FETCH_MINIMAL_TEACHERS_ERROR';

// Full details for specific entities
export const FETCH_STUDENT_DETAILS_SUCCESS = 'FETCH_STUDENT_DETAILS_SUCCESS';
export const FETCH_STUDENT_DETAILS_ERROR = 'FETCH_STUDENT_DETAILS_ERROR';
export const FETCH_USER_DETAILS_SUCCESS = 'FETCH_USER_DETAILS_SUCCESS';
export const FETCH_USER_DETAILS_ERROR = 'FETCH_USER_DETAILS_ERROR';

// Selecting Courses
export const USER_SELECT_COURSES_SUCCESS = 'USER_SELECT_COURSES_SUCCESS';
export const USER_SELECT_COURSES_ERROR = 'USER_SELECT_COURSES_ERROR';

// Submitting Tests
export const USER_SUBMIT_TEST_SUCCESS = 'USER_SUBMIT_TEST_SUCCESS';
export const USER_SUBMIT_TEST_ERROR = 'USER_SUBMIT_TEST_ERROR';

// Fetching User Results
export const FETCH_USER_RESULT_DATA_REQUEST = 'FETCH_USER_RESULT_DATA_REQUEST';
export const FETCH_USER_RESULT_DATA_SUCCESS = 'FETCH_USER_RESULT_DATA_SUCCESS';
export const FETCH_USER_RESULT_DATA_FAILURE = 'FETCH_USER_RESULT_DATA_FAILURE';


//Creating Students
export const STUDENT_CREATE_SUCCESS = 'STUDENT_CREATE_SUCCESS';
export const STUDENT_CREATE_ERROR = 'STUDENT_CREATE_ERROR';

//Creating Teachers
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_ERROR = 'USER_CREATE_ERROR';


//Loading State
export const SET_LOADING  = "SET_LOADING"
export const CLEAR_LOADING = "CLEAR_LOADING"
export const RESET_ERROR = "RESET_ERROR"
export const RESET_STATUS = "RESET_STATUS"

//Delete Course
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
export const DELETE_COURSE_ERROR = 'DELETE_COURSE_ERROR';

//fetch single cours
export const COURSE_FETCH_SUCCESS = 'COURSE_FETCH_SUCCESS'
export const COURSE_FETCH_ERROR = 'COURSE_FETCH_ERROR'

//Fetch all users
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//Deactivate user
export const DEACTIVATE_USER_REQUEST = 'DEACTIVATE_USER_REQUEST';
export const DEACTIVATE_USER_SUCCESS = 'DEACTIVATE_USER_SUCCESS';
export const DEACTIVATE_USER_ERROR = 'DEACTIVATE_USER_ERROR';
//Materials
export const FETCH_MATERIALS_SUCCESS = 'FETCH_MATERIALS_SUCCESS';
export const FETCH_MATERIALS_ERROR = 'FETCH_MATERIALS_ERROR';
export const UPLOAD_MATERIAL_SUCCESS = 'UPLOAD_MATERIAL_SUCCESS';
export const UPLOAD_MATERIAL_ERROR = 'UPLOAD_MATERIAL_ERROR';
export const SET_ERROR = 'SET_ERROR';
//Logout
export const USER_LOGOUT = "USER_LOGOUT"