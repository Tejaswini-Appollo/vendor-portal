import { AuthenticationAction, AuthenticationActionTypes } from './authentication.action';
import { AuthenticationState } from '../authentication.model';

const initialState: AuthenticationState = {
  name: null,
  email: null,
  role: null,
  token: null,
};

export function authenticationReducer(
  state = initialState,
  action: AuthenticationAction
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case AuthenticationActionTypes.UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    case AuthenticationActionTypes.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
