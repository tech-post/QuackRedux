import { GET_FEED, CREATE_POST, GET_CURRENT_USER_POSTS, INCREMENT_LIKES, DECREMENT_LIKES } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.payload;

    case INCREMENT_LIKES:
      let newState1 = state.slice();
      let element1 = newState1.find((e, i) => e._id === action.payload._id)
      let index1 = newState1.indexOf(element1);
      if (index1 !== -1) {
        newState1[index1] = action.payload;
      }
      return newState1;
    case DECREMENT_LIKES:
      let newState2 = state.slice();
      let element2 = newState2.find((e, i) => e._id === action.payload._id)
      let index2 = newState2.indexOf(element2);
      if (index2 !== -1) {
        newState2[index2] = action.payload;
      }
      return newState2;

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
