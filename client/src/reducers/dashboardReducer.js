import { GET_CURRENT_USER_POSTS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
      
    case GET_CURRENT_USER_POSTS:
      return action.payload;

    default:
      return state;
  }
}
