import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth'

// state
interface AuthState {
  token: string;
  userId: string;
  didTryAutoLogin: boolean;
}

// actions
interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  token: string;
  userId: string;
}

interface SetDidTryALAction {
  type: typeof SET_DID_TRY_AL;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | AuthenticateAction
  | SetDidTryALAction
  | LogoutAction

export { AuthState }
