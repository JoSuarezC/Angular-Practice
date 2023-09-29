import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface State {
  user: User,
  authError: string,
  isLoading: boolean
};

const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch(action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        authError: null,
        isLoading: false

      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
