import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth'
import { AuthState, AuthActionTypes } from './auth.d'

const initialState: AuthState = {
  token: '',
  userId: '',
  didTryAutoLogin: false
}

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      }
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      }
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      }
    default:
      return state
  }
}