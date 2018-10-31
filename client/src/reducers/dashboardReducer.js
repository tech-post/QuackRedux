import { GET_CURRENT_USER_POSTS, DELETE_POST } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
      
    case GET_CURRENT_USER_POSTS:
      return action.payload;

    case DELETE_POST:
      let newState = [...state]; 
      if (action.payload) {
        let element = newState.find((e, i) => e._id === action.payload._id);
        let index = newState.indexOf(element);
        if (index !== -1) {
          newState.splice(index, 1);
        }
      }
      return newState;

    default:
      return state;
  }
}
