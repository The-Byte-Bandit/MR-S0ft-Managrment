import { combineReducers } from 'redux';
import userReducer from './userReducers';
// import adminReducer from './adminReducers';
// import { questionsReducer } from './questionsReducer'; // Named export


const rootReducer = combineReducers({
  user: userReducer,
  // admin: adminReducer,
  // questions: questionsReducer,
});

export default rootReducer;
