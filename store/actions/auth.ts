import { AsyncStorage } from 'react-native'
import { ActionCreator, Action } from 'redux'

import {
  AppThunk,
  iAuthenticate,
  iSignup,
  iLogin,
  iSaveDataToStorage,
} from './index.d'
import { apiKey } from '../../api-config'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL'

let timer: number

export const setDidTryAL: ActionCreator<Action<string>> = () => {
  return { type: SET_DID_TRY_AL }
}

export const authenticate = ({
  userId,
  token,
  expiryTime,
}: iAuthenticate): AppThunk => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId: userId, token: token })
  }
}

export const signup = ({ email, password }: iSignup): AppThunk => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    )

    if (!response.ok) {
      const errResponseData = await response.json()
      let errorMessage = 'Something went wrong!'
      if (errResponseData.error.message === 'EMAIL_EXISTS') {
        errorMessage = 'Email already been used'
      }
      throw new Error(errorMessage)
    }

    const resData = await response.json()

    dispatch(
      authenticate({
        userId: resData.localId,
        token: resData.idToken,
        expiryTime: parseInt(resData.expiresIn) * 1000,
      }),
    )
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    )
    saveDataToStorage({
      token: resData.idToken,
      userId: resData.localId,
      expirationDate: expirationDate,
    })
  }
}

export const login = ({ email, password }: iLogin): AppThunk => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    )

    if (!response.ok) {
      const errResponseData = await response.json()
      let errorMessage = 'Something went wrong!'
      if (errResponseData.error.message === 'EMAIL_NOT_FOUND') {
        errorMessage = 'Email not found'
      } else if (errResponseData.error.message === 'INVALID_PASSWORD') {
        errorMessage = 'Invalid password'
      }
      throw new Error(errorMessage)
    }

    const resData = await response.json()
    dispatch(
      authenticate({
        userId: resData.localId,
        token: resData.idToken,
        expiryTime: parseInt(resData.expiresIn) * 1000,
      }),
    )
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    )
    saveDataToStorage({
      token: resData.idToken,
      userId: resData.localId,
      expirationDate: expirationDate,
    })
  }
}

export const logout = () => {
  if (timer) {
    clearTimeout(timer)
  }
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const setLogoutTimer = (expirationTime: number): AppThunk => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

const saveDataToStorage = ({
  token,
  userId,
  expirationDate,
}: iSaveDataToStorage) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  )
}
