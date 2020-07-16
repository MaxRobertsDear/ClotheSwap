import { AsyncStorage } from 'react-native'
import { ActionCreator, Action } from 'redux'

import { AppThunk, iAuthenticate } from './index.d'
import { apiKey } from '../../api-config'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL'

let timer: number

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL }
}

export const authenticate = (userId: string, token: string, expiryTime: number): AppThunk => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId: userId, token: token })
  }
}

export const signup = (email: string, password: string): AppThunk => {
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
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      ),
    )
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const login = (email: string, password: string): AppThunk => {
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
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000

      ),
    )
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
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

const saveDataToStorage = (token: string, userId: string, expirationDate: Date) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  )
}
