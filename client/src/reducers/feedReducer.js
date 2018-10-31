import { GET_FEED, CREATE_POST, GET_CURRENT_USER_POSTS, INCREMENT_LIKES, DECREMENT_LIKES } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.payload;

    case INCREMENT_LIKES:
      let newStateI = [...state]; // same as line 22
      if (action.payload) {
        let elementI = newStateI.find((e, i) => e._id === action.payload._id);
        let indexI = newStateI.indexOf(elementI);
        if (indexI !== -1) {
          newStateI[indexI] = action.payload;
        }
      }
      return newStateI;

    case DECREMENT_LIKES:
      let newStateD = state.slice(); // same as line 11
      if (action.payload) {
        let elementD = newStateD.find((e, i) => e._id === action.payload._id);
        let indexD = newStateD.indexOf(elementD);
        if (indexD !== -1) {
          newStateD[indexD] = action.payload;
        }
      }
      return newStateD;

    case CREATE_POST: 
      let postsArray = state.slice();
      postsArray.push(action.payload);
      return postsArray;
      
    case GET_CURRENT_USER_POSTS:
      return {
        ...state
      }

    default:
      return state;
  }
}
