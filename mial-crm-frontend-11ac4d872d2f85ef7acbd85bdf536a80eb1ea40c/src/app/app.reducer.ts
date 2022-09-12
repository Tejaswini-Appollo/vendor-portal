import { ActionReducerMap } from '@ngrx/store';
import { AuthenticationState } from '@public/authentication/authentication.model';
import { authenticationReducer } from '@public/authentication/store/authentication.reducer';
import { UserState } from '@secure/user/user.model';
import { userReducer } from './views/secure/user/store/user.reducer';

export interface AppState {
  authenticationState: AuthenticationState;
  userState: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authenticationState: authenticationReducer,
  userState: userReducer,
};
