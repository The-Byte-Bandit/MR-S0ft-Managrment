// src/reducers/index.js
import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  ADMIN_SIGNUP_SUCCESS,
  ADMIN_SIGNUP_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_ERROR,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_ERROR,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_ERROR,
  CLASS_CREATE_SUCCESS,
  CLASS_CREATE_ERROR,
  CLASS_UPDATE_SUCCESS,
  CLASS_UPDATE_ERROR,
  CLASS_DELETE_SUCCESS,
  CLASS_DELETE_ERROR,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_ERROR,
  USER_SELECT_COURSES_SUCCESS,
  USER_SELECT_COURSES_ERROR,
  USER_SUBMIT_TEST_SUCCESS,
  USER_SUBMIT_TEST_ERROR,
  FETCH_USER_RESULT_DATA_REQUEST,
  FETCH_USER_RESULT_DATA_SUCCESS,
  FETCH_USER_RESULT_DATA_FAILURE,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_ERROR,
  FETCH_MINIMAL_STUDENTS_SUCCESS,
  FETCH_MINIMAL_STUDENTS_ERROR,
  FETCH_MINIMAL_TEACHERS_SUCCESS,
  FETCH_MINIMAL_TEACHERS_ERROR,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_STUDENT_DETAILS_SUCCESS,
  FETCH_STUDENT_DETAILS_ERROR,
  SET_LOADING,
  CLEAR_LOADING,
  RESET_ERROR,
  RESET_STATUS,
  USER_LOGOUT,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_ERROR,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  // COURSE_DELETE_SUCCESS,
  // COURSE_DELETE_ERROR,
  COURSE_FETCH_SUCCESS,
  COURSE_FETCH_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DEACTIVATE_USER_REQUEST,
  DEACTIVATE_USER_SUCCESS,
  DEACTIVATE_USER_ERROR,
  UPLOAD_MATERIAL_SUCCESS,
  UPLOAD_MATERIAL_ERROR,
  FETCH_MATERIALS_SUCCESS,
  FETCH_MATERIALS_ERROR,
} from '../actionTypes';

const initialState = {
  user: null, // Object with data from login or signup
  groupedUsers: {
    Admin: [],
    'Course Advisor': [],
    Teacher: [],
    Student: []
  },
  courses: [], // Array of objects
  classes: [], // Array of objects
  minimalStudents: [],
  minimalTeachers:[],
  minimalUsers: [],
  materials: [],
  studentDetails: null,
  userDetails: null,
  testResults: [], // Array of objects
  loading: false, // Boolean to indicate loading state
  error: null, // Error message, if any
  status: null,
  statusText: null,
};

// Main Reducer Function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true, error: null };

    case CLEAR_LOADING:
      return { ...state, loading: false };

    case RESET_ERROR:
      return { ...state, error: null };

      case RESET_STATUS:
        return { ...state, status: null };

    // User Authentication Cases
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case USER_SIGNUP_ERROR:
    case USER_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // Admin Authentication Cases
    case ADMIN_SIGNUP_SUCCESS:
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case ADMIN_SIGNUP_ERROR:
    case ADMIN_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // Course Management Cases
    case FETCH_COURSES_SUCCESS:
      console.log(action.payload);
      
      return {
        ...state,
        courses: action.payload,
        error: null,
      };
    case FETCH_COURSES_ERROR:
      return {
        ...state,
        error: action.payload,
        status: action.payload.status,
      };

    case COURSE_CREATE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload.course],
        status: action.payload.status,
        error: null,
      };
    case COURSE_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
        status: action.payload.status,
      };
    case COURSE_UPDATE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        ),
        error: null,
        status: action.payload.status,
      };
    case COURSE_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        status: action.payload.status,
      };
    case COURSE_DELETE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== action.payload),
        error: null,
        status: action.payload.status,
      };
    case COURSE_DELETE_ERROR:
      return {
        ...state,
        error: action.payload,
        status: action.payload.status,
      };

    // Class Management Cases
    case CLASS_CREATE_SUCCESS:
      return {
        ...state,
        classes: [...state.classes, action.payload],
        error: null,
        status: action.payload.status,
      };
    case CLASS_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
        status: action.payload.status,
      };
    case CLASS_UPDATE_SUCCESS:
      return {
        ...state,
        classes: state.classes.map((cls) =>
          cls._id === action.payload._id ? action.payload : cls
        ),
        error: null,

      };
    case CLASS_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,

      };
    case CLASS_DELETE_SUCCESS:
      return {
        ...state,
        classes: state.classes.filter((cls) => cls._id !== action.payload),
        error: null,

      };
    case CLASS_DELETE_ERROR:
      return {
        ...state,
        error: action.payload,

      };

    // Fetch Classes
    case FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload,
        error: null,

      };
    case FETCH_CLASSES_ERROR:
      return {
        ...state,
        error: action.payload,
 
      };

    // User Select Courses
    case USER_SELECT_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        error: null,

      };
    case USER_SELECT_COURSES_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // User Submit Test
    case USER_SUBMIT_TEST_SUCCESS:
      return {
        ...state,
        testResults: [...state.testResults, action.payload],
        error: null,

      };
    case USER_SUBMIT_TEST_ERROR:
      return {
        ...state,
        error: action.payload,

      };

    // Fetch User Result Data
    case FETCH_USER_RESULT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_RESULT_DATA_SUCCESS:
      return {
        ...state,
        testResults: action.payload,
        loading: false,
        error: null,

      };
    case FETCH_USER_RESULT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_MINIMAL_STUDENTS_SUCCESS:
      return { ...state, minimalStudents: action.payload, error: null, status: action.payload.status };
    case FETCH_MINIMAL_STUDENTS_ERROR:
      return { ...state, error: action.payload, status: action.payload.status };
    case FETCH_MINIMAL_TEACHERS_SUCCESS:
      return { ...state, minimalTeachers: action.payload, error: null, status: action.payload.status };
    case FETCH_MINIMAL_TEACHERS_ERROR:
      return { ...state, error: action.payload, status: action.payload.status };
    case FETCH_STUDENT_DETAILS_SUCCESS:
      return { ...state, studentDetails: action.payload, error: null, status: action.payload.status, userDetails:null };
    case FETCH_STUDENT_DETAILS_ERROR:
      return { ...state, error: action.payload, status: action.payload.status };
    case FETCH_USER_DETAILS_SUCCESS:
      return { ...state, userDetails: action.payload, error: null, status: action.payload.status, studentDetails: null };
    case FETCH_USER_DETAILS_ERROR:
      return { ...state, error: action.payload, status: action.payload.status };
    case USER_LOGOUT:
      return {
        ...initialState, // Reset the state to the initial state
      };
    case STUDENT_CREATE_SUCCESS:
      return {
        ...state,
        minimalStudents: [...state.minimalStudents, action.payload.student],
        loading: false,
        error: null,
        status: action.payload.status,
      };
    case STUDENT_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.payload.status,
      };

    case USER_CREATE_SUCCESS:
      return {
        ...state,
        minimalUsers: [...state.minimalUsers, action.payload],
        loading: false,
        error: null,
        status: action.payload.status,
      };
    case USER_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.payload.status,
      };
      // return { ...state, loading: false };
      case COURSE_FETCH_SUCCESS:
        return { ...state, course: action.payload, error: null };
      case COURSE_FETCH_ERROR:
        return { ...state, error: action.payload };
      // case COURSE_DELETE_SUCCESS:
      //   return { ...state, course: null, status: 204, error: null }; // After deletion, clear the course from state
      // case COURSE_DELETE_ERROR:
      //   return { ...state, error: action.payload };
    // Default Case

    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, groupedUsers: action.payload };

    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case DEACTIVATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DEACTIVATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          userDetails: action.payload.user, // Update userDetails to reflect the deactivated status
          error: null,
        };
      case DEACTIVATE_USER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case FETCH_MATERIALS_SUCCESS:
          return { ...state, materials: action.payload, error: null };
    
        case FETCH_MATERIALS_ERROR:
          return { ...state, error: action.payload };
    
        case UPLOAD_MATERIAL_SUCCESS:
          return { ...state, materials: [...state.materials, action.payload], error: null };
    
        case UPLOAD_MATERIAL_ERROR:
          return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
