import { GET_FEED, CREATE_POST, GET_CURRENT_USER_POSTS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.payload;
    case CREATE_POST: 
      let postsarray = state.slice();
      postsarray.push(action.payload);
      return postsarray;
      
    case GET_CURRENT_USER_POSTS:
      return {
        ...state
      }
    default:
      return state;
  }
}
