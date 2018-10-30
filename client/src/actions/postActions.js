import axios from 'axios';
import { GET_FEED, CREATE_POST, GET_CURRENT_USER_POSTS } from './types';
import setAuthToken from '../utils/setAuthToken';

export const getFeed = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_FEED,
      payload: res.data
    }))
    .catch(err => 
      dispatch({
        type: GET_FEED,
        payload: err.response.data
      })
    );
};

export const createPost = (postData) => ({
  type: CREATE_POST,
  payload: postData
});

export const getMyPosts = () => dispatch => 
{
    axios
      .get('/api/posts')//create a new route for find by userID?
      .then(res => dispatch({
        type: GET_CURRENT_USER_POSTS,
        payload: res.data
      }))
      .catch(err => 
        dispatch({
          type: GET_CURRENT_USER_POSTS,
          payload: err.response.data
        })
      );
    
}