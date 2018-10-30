import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/types';
import { stat } from 'fs';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case REMOVE_CURRENT_USER:
      localStorage.removeItem('jwtToken');

      return{
        ...state,
        isAuthenticated:false,
        user: {}
      }

    default:
      return state;
  }
}