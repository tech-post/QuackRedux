import axios from 'axios';
import { GET_FEED, INCREMENT_LIKES, DECREMENT_LIKES } from './types';


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
  console.log('token in postAction', localStorage['jwtToken'])
  // fetch(`/api/posts/like/${id}`, { method: 'post', body: JSON.stringify(), headersConfig})
  //   .then(res => res.json)
  //   .then(data => console.log(data))
  axios
    .post(`/api/posts/like/${id}`, params, headersConfig)
    .then(res => dispatch({
      type: INCREMENT_LIKES,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: INCREMENT_LIKES,
        payload: err
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
  console.log('token in postAction', localStorage['jwtToken'])
  axios
    .post(`/api/posts/unlike/${id}`, params, headersConfig)
    .then(res => dispatch({
      type: DECREMENT_LIKES,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: DECREMENT_LIKES,
        payload: err
      })
    );
};

