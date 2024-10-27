// import {
//     USER_SIGNUP_SUCCESS,
//     USER_SIGNUP_ERROR,
//     USER_LOGIN_SUCCESS,
//     USER_LOGIN_ERROR,
//     USER_SELECT_COURSES_SUCCESS,
//     USER_SELECT_COURSES_ERROR,
//     USER_SUBMIT_TEST_SUCCESS,
//     USER_SUBMIT_TEST_ERROR,
//   } from '../actionTypes';
  
//   const initialState = {
//     user: localStorage.getItem('user') || null,
//     token: localStorage.getItem('token') || null,
//     courses: [],
//     testResult: null,
//     error: null,
//   };
  
  
//   const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case USER_LOGIN_SUCCESS:
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('user', (action.payload.user));
//         console.log(localStorage.getItem.user, 'this is');
        
//         return {
//           ...state,
//           user: action.payload.user,
//           token: action.payload.token,
//           error: null,
//       };
//       case USER_SIGNUP_ERROR:
        
//         return {
//           ...state,
//           error: action.payload,
//         };
//       // case USER_LOGIN_SUCCESS:
//       //   localStorage.setItem('token', action.payload.token);
//       //   return {
//       //     ...state,
//       //     user: action.payload.user,
//       //     token: action.payload.token,
//       //     error: null,
//       //   };
//       case USER_LOGIN_ERROR:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       case USER_SELECT_COURSES_SUCCESS:
//         return {
//           ...state,
//           courses: action.payload.courses,
//           error: null,
//         };
//       case USER_SELECT_COURSES_ERROR:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       case USER_SUBMIT_TEST_SUCCESS:
//         return {
//           ...state,
//           testResult: action.payload,
//           error: null,
//         };
//       case USER_SUBMIT_TEST_ERROR:
//         return {
//           ...state,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default userReducer;
  

// import {
//   USER_SIGNUP_SUCCESS,
//   USER_SIGNUP_ERROR,
//   USER_LOGIN_SUCCESS,
//   USER_LOGIN_ERROR,
//   USER_SELECT_COURSES_SUCCESS,
//   USER_SELECT_COURSES_ERROR,
//   USER_SUBMIT_TEST_SUCCESS,
//   USER_SUBMIT_TEST_ERROR,
//   FETCH_USER_RESULT_DATA_REQUEST,
//   FETCH_USER_RESULT_DATA_SUCCESS,
//   FETCH_USER_RESULT_DATA_FAILURE,
// } from '../actionTypes';

// // Initialize state, checking localStorage for any existing data
// const initialState = {
//   user: localStorage.getItem('user') || null, // Parse 'user' from localStorage, if present
//   token: localStorage.getItem('token') || null, // Get the token from localStorage, if present
//   courses: [], // Initialize empty courses array
//   testResult: null, // Initialize test results to null
//   error: null, // Initialize error to null
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // Signup Success
//     case USER_SIGNUP_SUCCESS:
//       const { user } = action.payload;
//       localStorage.setItem('token', user.token); 
//       localStorage.setItem('userId', user.userId); 
//       localStorage.setItem('user', JSON.stringify(user));
      
      
//       return {
//         ...state,
//         user: user,
//         token: user.token, 
//         error: null,
//         testResult: user.user.result,
//         courses: user.user.courses,
//       };

//     // Signup Error
//     case USER_SIGNUP_ERROR:
//       return {
//         ...state,
//         error: action.payload, 
//       };

//     // Login Success
//     case USER_LOGIN_SUCCESS:

//       localStorage.setItem('token', action.payload.user.token); 
//       localStorage.setItem('userId', action.payload.user.userId);
//       localStorage.setItem('user', JSON.stringify(action.payload.user));
//       console.log('USER_LOGIN_SUCCESS22', action.payload);

//       return {
//         ...state,
//         user:  action.payload.user, 
//         token:  action.payload.user.token,
//         error: null, 
//         testResult: action.payload.user.result,
//         courses: action.payload.user.courses
//       };

//     // Login Error
//     case USER_LOGIN_ERROR:
//       console.log('USER_LOGIN_ERROR', action.payload);

//       return {
//         ...state,
//         error: action.payload, // Set the login error message
//       };

//     // Select Courses Success
//     case USER_SELECT_COURSES_SUCCESS:
//       return {
//         ...state,
//         user: { ...state.user, courses: action.payload.courses }, // Update user's courses in the user object
//         error: null, // Clear any previous errors
//       };

//     // Select Courses Error
//     case USER_SELECT_COURSES_ERROR:
//       return {
//         ...state,
//         error: action.payload, // Store error related to selecting courses
//       };

//     // Test Submission Success
//     case USER_SUBMIT_TEST_SUCCESS:
//       console.log('USER_SUBMIT_TEST_SUCCESS', action.payload);

//       return {
//         ...state,
//         testResult: action.payload.result, // Store the test result in state
//         error: null, // Clear any previous errors
//       };

//     // Test Submission Error
//     case USER_SUBMIT_TEST_ERROR:
//       return {
//         ...state,
//         error: action.payload, // Store the error related to test submission
//       };
//       case FETCH_USER_RESULT_DATA_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null, // Clear any previous errors when starting a new request
//       };
    
//     case FETCH_USER_RESULT_DATA_SUCCESS:
//       console.log('FETCH_USER_RESULT_DATA_SUCCESS', action.payload);
//       return {
//         ...state,
//         loading: false,
//         testResult: action.payload.result, // Set the result data in the state
//         error: null, // Clear any error state if the request succeeds
//       };
    
//     case FETCH_USER_RESULT_DATA_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload, // Store the error message in the state
//       };

//     default:
//       return state;
//   }
// };


// console.log(initialState, 'inininin');


// export default userReducer;




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
  SET_LOADING,
  CLEAR_LOADING,
  RESET_ERROR,
} from '../actionTypes';

const initialState = {
  user: null, // Object with data from login or signup
  courses: [], // Array of objects
  classes: [], // Array of objects
  testResults: [], // Array of objects
  loading: false, // Boolean to indicate loading state
  error: null, // Error message, if any
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
    case COURSE_CREATE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        error: null,
      };
    case COURSE_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case COURSE_UPDATE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id === action.payload._id ? action.payload : course
        ),
        error: null,
      };
    case COURSE_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case COURSE_DELETE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== action.payload),
        error: null,
      };
    case COURSE_DELETE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // Class Management Cases
    case CLASS_CREATE_SUCCESS:
      return {
        ...state,
        classes: [...state.classes, action.payload],
        error: null,
      };
    case CLASS_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLASS_UPDATE_SUCCESS:
      return {
        ...state,
        classes: state.classes.map(cls =>
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
        classes: state.classes.filter(cls => cls._id !== action.payload),
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

    // Default Case
    default:
      return state;
  }
};

export default reducer;
