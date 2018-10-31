import axios from 'axios';

import { GET_FEED, CREATE_POST, GET_CURRENT_USER_POSTS, INCREMENT_LIKES, DECREMENT_LIKES, GET_SINGLE_POST, DELETE_POST } from './types';
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
        payload: err.res
      })
    );
};

export const incrementLikes = (id) => dispatch => {
  const params = {
    id: id
  }
  const headersConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage['jwtToken']
    }
  };
  
  axios
    .post(`/api/posts/like/${id}`, params, headersConfig)
    .then(res => dispatch({
      type: INCREMENT_LIKES,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: INCREMENT_LIKES,
        payload: err.res
      })
    );
};

export const decrementLikes = (id) => dispatch => {
  const params = {
    id: id
  }
  const headersConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage['jwtToken']
    }
  };
  
  axios
    .post(`/api/posts/unlike/${id}`, params, headersConfig)
    .then(res => dispatch({
      type: DECREMENT_LIKES,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: DECREMENT_LIKES,
        payload: err.res
      })
    );
};

export const createPost = (postData) => ({
  type: CREATE_POST,
  payload: postData
});

export const deletePost = (id) => dispatch => {
  const params = {
    id: id
  }
  const headersConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage['jwtToken']
    }
  };

  axios
    .delete(`/api/posts/${id}`, params, headersConfig)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: DELETE_POST,
        payload: err.res
      })
    );
};

export const getMyPosts = (userid) => dispatch => {
    axios
      .get(`/api/posts/user/${userid}`)
      .then(res => dispatch({
        type: GET_CURRENT_USER_POSTS,
        payload: res.data
      }))
      .catch(err => 
        dispatch({
          type: GET_CURRENT_USER_POSTS,
          payload: err.res
        })
      );
}

export const getSinglePost = (postId) => dispatch => {
  axios
    .get(`/api/posts/${postId}`)
    .then(res => dispatch({
      type: GET_SINGLE_POST,
      payload: res.data
    }))
    .catch(err => 
      dispatch({
        type: GET_SINGLE_POST,
        payload: err.res
      })
    );
}

