import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import feedReducer from './feedReducer'; 
import dashboardReducer from './dashboardReducer'; 

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  feed: feedReducer,
  dashboard: dashboardReducer
});