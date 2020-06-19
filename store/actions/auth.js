import { apiKey } from '../../secure-key/keys'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
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
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()
    console.log(resData)
    dispatch({ type: SIGNUP })
  }
}

export const login = (email, password) => {
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
    console.log(resData)
    dispatch({ type: LOGIN })
  }
}
