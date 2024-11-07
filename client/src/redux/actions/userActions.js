import axios from 'axios';
import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  // ADMIN_SIGNUP_SUCCESS,
  // ADMIN_SIGNUP_ERROR,
  // ADMIN_LOGIN_SUCCESS,
  // ADMIN_LOGIN_ERROR,
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
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_ERROR,
  SET_LOADING,
  CLEAR_LOADING,
  RESET_ERROR,
  RESET_STATUS,
  FETCH_MINIMAL_STUDENTS_SUCCESS,
  FETCH_MINIMAL_STUDENTS_ERROR,
  FETCH_MINIMAL_TEACHERS_SUCCESS,
  FETCH_MINIMAL_TEACHERS_ERROR,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_STUDENT_DETAILS_SUCCESS,
  FETCH_STUDENT_DETAILS_ERROR,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_ERROR,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  COURSE_FETCH_SUCCESS,
  COURSE_FETCH_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  USER_LOGOUT,
} from '../actionTypes';
import { persistor } from '../store';
import { BASE_URL } from '../../constants/constant';

// Utility function to set loading
const setLoading = (dispatch) => dispatch({ type: SET_LOADING });
const clearLoading = (dispatch) => dispatch({ type: CLEAR_LOADING });

// User Signup Action

export const userSignup = (userData, navigate) => async (dispatch) => {
  try {
    setLoading(dispatch);
    
    // Add the role field as "admin" by default
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      ...userData,
      role: 'admin', // Default role
    });

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: response.data,
    });
    navigate('/home');
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_ERROR,
      payload: error.response?.data.message || 'Signup failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// User Login Action
export const userLogin = (email, password, navigate) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });
    navigate('/home');
  } catch (error) {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: error.response?.data.message || 'Login failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Create Course Action
export const fetchCourses = (token) => async (dispatch) => {
  console.log('fetching courses');
  
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/course`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: FETCH_COURSES_SUCCESS,
      payload: response.data,
    });
    console.log(response.status);
    console.log(response.data);
    
  } catch (error) {
    dispatch({
      type: FETCH_COURSES_ERROR,
      payload: error.response?.data.message || 'Course fetching failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Create Course Action
export const createCourse = (courseData, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.post(`${BASE_URL}/course/create`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: COURSE_CREATE_SUCCESS,
      payload: { ...response.data, status: response.status },
    });
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_ERROR,
      payload: error.response?.data.message || 'Course creation failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Update Course Action
export const updateCourse = (courseId, updatedData, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.put(
      `${BASE_URL}/course/${courseId}/update`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: COURSE_UPDATE_SUCCESS,
      payload: response.data.course,
    });
  } catch (error) {
    dispatch({
      type: COURSE_UPDATE_ERROR,
      payload: error.response?.data.message || 'Course update failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Fetch Course by ID Action
export const fetchCourseById = (courseId, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: COURSE_FETCH_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: COURSE_FETCH_ERROR,
      payload: error.response?.data.message || 'Failed to fetch course',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Delete Course Action
export const deleteCourse = (courseId, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    await axios.delete(`${BASE_URL}/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: COURSE_DELETE_SUCCESS, payload: courseId });
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_ERROR,
      payload: error.response?.data.message || 'Course deletion failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};
// Create Class Action
export const createClass = (classData, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.post(`${BASE_URL}/class/create`, classData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CLASS_CREATE_SUCCESS,
      payload: { ...response.data, status: response.status },
    });
  } catch (error) {
    dispatch({
      type: CLASS_CREATE_ERROR,
      payload: error.response?.data.message || 'Class creation failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Update Class Action
export const updateClass = (classId, updatedData, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.put(
      `${BASE_URL}/classes/${classId}/update`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: CLASS_UPDATE_SUCCESS,
      payload: response.data.class,
    });
  } catch (error) {
    dispatch({
      type: CLASS_UPDATE_ERROR,
      payload: error.response?.data.message || 'Class update failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Delete Class Action
export const deleteClass = (classId, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    await axios.delete(`${BASE_URL}/classes/${classId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: CLASS_DELETE_SUCCESS, payload: classId });
  } catch (error) {
    dispatch({
      type: CLASS_DELETE_ERROR,
      payload: error.response?.data.message || 'Class deletion failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

// Fetch Classes Action
export const fetchClasses = (token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/class`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_CLASSES_SUCCESS, payload: response.data.classes });
  } catch (error) {
    dispatch({
      type: FETCH_CLASSES_ERROR,
      payload: error.response?.data.message || 'Fetching classes failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

export const fetchStudentClasses = (token, studentId) => async (dispatch) => {

  
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/student/${studentId}/classes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_CLASSES_SUCCESS, payload: response.data.classes });
  } catch (error) {
    dispatch({
      type: FETCH_CLASSES_ERROR,
      payload: error.response?.data.message || 'Fetching classes failed',
    });
    console.log(error.response?.data);
    
  } finally {
    clearLoading(dispatch);
  }
};

export const fetchMinimalStudents = (token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/user/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: FETCH_MINIMAL_STUDENTS_SUCCESS,
      payload: response.data.students,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MINIMAL_STUDENTS_ERROR,
      payload: error.response?.data.message || 'Fetching students failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

export const fetchMinimalTeachers = (token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/user/teachers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: FETCH_MINIMAL_TEACHERS_SUCCESS,
      payload: response.data.teachers,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MINIMAL_TEACHERS_ERROR,
      payload: error.response?.data.message || 'Fetching teachers failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};

export const fetchUserDetails = (userId, token) => async (dispatch) => {
  console.log(userId, token);
  
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`, {  // Ensure userId is part of the URL
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: FETCH_USER_DETAILS_SUCCESS,
      payload: response.data,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data.message);
    dispatch({
      type: FETCH_USER_DETAILS_ERROR,
      payload: error.response?.data.message || 'Fetching user details failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};



export const fetchStudentDetails = (studentId, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const response = await axios.get(`${BASE_URL}/students/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: FETCH_STUDENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENT_DETAILS_ERROR,
      payload: error.response?.data.message || 'Fetching student details failed',
    });
  } finally {
    clearLoading(dispatch);
  }
};


// Action to fetch users
export const fetchUsers = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  const token = getState().user.user.token;

  try {
    const response = await axios.get(`${BASE_URL}/user/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data // Ensure this is the grouped object
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.response?.data.message || 'Failed to fetch users'
    });
  }
};

export const createStudent = (studentData, token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    
    const response = await axios.post(`${BASE_URL}/user/create-student`, studentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    dispatch({
      type: STUDENT_CREATE_SUCCESS,
      payload: { ...response.data, status: response.status },
    });
    console.log(response);
    

  } catch (error) {
    dispatch({
      type: STUDENT_CREATE_ERROR,
      payload: error.response?.data.message || 'Student creation failed',
    });
    console.log(error);
    
  } finally {
    clearLoading(dispatch);
  }
};

export const createTeacher = (userData, token) => async (dispatch) => {
  console.log(userData);
  
  try {
    setLoading(dispatch);
    
    const response = await axios.post(`${BASE_URL}/user/create-user`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: { ...response.data, status: response.status },
    });
    console.log(response.status);
  } catch (error) {
    dispatch({
      type: USER_CREATE_ERROR,
      payload: error.response?.data.message || 'Teacher creation failed',
    });
    console.log(error);
  } finally {
    clearLoading(dispatch);
  }
};

export const userLogout = (navigate) => async (dispatch) => {
  // Clear localStorage and persist storage
  localStorage.clear();
  await persistor.purge();

  // Dispatch the logout action
  dispatch({
    type: USER_LOGOUT,
  });

  // Optionally redirect to the login or home page
  navigate('/');
};
//Reset error

export const resetError = () => ({
  type: RESET_ERROR,
});

export const resetStatus = () => ({
  type: RESET_STATUS,
});