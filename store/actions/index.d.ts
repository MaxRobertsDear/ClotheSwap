import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../../App'

import { iCreateProduct, iUpdateProduct } from './products.d'
import { iAuthenticate, iSignup, iLogin, iSaveDataToStorage } from './auth.d'

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>,
>

export {
  AppThunk,
  iCreateProduct,
  iUpdateProduct,
  iAuthenticate,
  iSignup,
  iLogin,
  iSaveDataToStorage,
}
