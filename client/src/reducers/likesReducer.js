import { INCREMENT_LIKES, DECREMENT_LIKES } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case INCREMENT_LIKES:
      let newState = state.slice();
      newState.push(action.payload);
      return newState;
    case DECREMENT_LIKES:
      return { ...state }
    default:
      return state;
  }
}
